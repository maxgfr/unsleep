import robot from 'robotjs';
import { program } from 'commander';
import packageJson from '../package.json';

type ProgramOptions = {
  mouse: boolean | undefined;
  autoclick: boolean | undefined;
  autoclickDelay: number | undefined;
  mouseDelay: number | undefined;
};

program
  .name('unsleep')
  .description('Prevent your computer from sleeping')
  .version(packageJson.version)
  .option('-a,--autoclick', 'Enable auto clicker')
  .option('-ad,--autoclick-delay', 'Delay between auto clicks')
  .option('-m --mouse', 'Enable mouse movement')
  .option(
    '-md, --mouse-delay',
    'Delay between mouse movements in ms (default: 5000)',
  );

program.parse();

const options = program.opts<ProgramOptions>();

const hasMouseOption = options.mouse;
const hasAutoClickOption = options.autoclick;
const autoClickDelay = options.autoclickDelay;
const mouseDelay = options.mouseDelay;

const generateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const screenSize = robot.getScreenSize();

const MOUSE_DELAY_MS = mouseDelay ?? 5000;
const AUTOCLICK_DELAY_MS = autoClickDelay ?? 5000;

(async function () {
  while (true) {
    if (hasMouseOption) {
      await generateDelay(MOUSE_DELAY_MS);
      robot.moveMouse(
        randomIntFromInterval(0, screenSize.height),
        randomIntFromInterval(0, screenSize.width),
      );
    }
    if (hasAutoClickOption) {
      await generateDelay(AUTOCLICK_DELAY_MS);
      robot.mouseClick();
    }
  }
})();
