export type ProgramOptions = {
  mouse: boolean | undefined;
  autoclick: boolean | undefined;
  autoclickDelay: string | undefined;
  mouseDelay: string | undefined;
};

export type ResolvedOptions = {
  mouse: boolean;
  autoclick: boolean;
  mouseDelayMs: number;
  autoclickDelayMs: number;
};

const DEFAULT_DELAY_MS = 5000;

export const randomIntFromInterval = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const generateDelay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseDelay = (
  value: string | undefined,
  defaultValue: number = DEFAULT_DELAY_MS,
): number => {
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed <= 0) {
    throw new Error(
      `Invalid delay value: "${value}". Must be a positive number.`,
    );
  }
  return parsed;
};

export const resolveOptions = (options: ProgramOptions): ResolvedOptions => {
  const autoclick = options.autoclick ?? false;
  const mouse = options.mouse || !autoclick;
  const mouseDelayMs = parseDelay(options.mouseDelay);
  const autoclickDelayMs = parseDelay(options.autoclickDelay);

  return { mouse, autoclick, mouseDelayMs, autoclickDelayMs };
};
