#!/usr/bin/env node

import robot from 'robotjs';
import { program } from 'commander';
import packageJson from '../package.json';
import {
  generateDelay,
  randomIntFromInterval,
  resolveOptions,
  ProgramOptions,
} from './utils';

program
  .name('unsleep')
  .description('Prevent your computer from sleeping')
  .version(packageJson.version)
  .option('-a, --autoclick', 'Enable auto clicker')
  .option('-ad, --autoclick-delay <value>', 'Delay between auto clicks in ms')
  .option('-m, --mouse', 'Enable mouse movement')
  .option('-md, --mouse-delay <value>', 'Delay between mouse movements in ms')
  .parse(process.argv);

let resolved;
try {
  resolved = resolveOptions(program.opts<ProgramOptions>());
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

const { mouse, autoclick, mouseDelayMs, autoclickDelayMs } = resolved;
const screenSize = robot.getScreenSize();

const features = [
  mouse && `mouse movement every ${mouseDelayMs}ms`,
  autoclick && `auto click every ${autoclickDelayMs}ms`,
]
  .filter(Boolean)
  .join(', ');

console.log(`unsleep is running (${features}). Press Ctrl+C to stop.`);

let running = true;

process.on('SIGINT', () => {
  console.log('\nunsleep stopped.');
  running = false;
  process.exit(0);
});

(async function () {
  while (running) {
    if (mouse) {
      await generateDelay(mouseDelayMs);
      robot.moveMouse(
        randomIntFromInterval(0, screenSize.width),
        randomIntFromInterval(0, screenSize.height),
      );
    }
    if (autoclick) {
      await generateDelay(autoclickDelayMs);
      robot.mouseClick();
    }
  }
})();
