import robot from 'robotjs';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
  
const screenSize = robot.getScreenSize();

const DELAY_MS = 5000;

(async function () {
  while (true) {
    await delay(DELAY_MS);
    robot.moveMouse(
      randomIntFromInterval(0, screenSize.height),
      randomIntFromInterval(0, screenSize.width),
    );
  }
})();
