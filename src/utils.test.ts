import {
  randomIntFromInterval,
  parseDelay,
  resolveOptions,
  generateDelay,
} from './utils';

describe('randomIntFromInterval', () => {
  it('should return a value within the range [min, max]', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomIntFromInterval(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it('should return min when min equals max', () => {
    expect(randomIntFromInterval(7, 7)).toBe(7);
  });

  it('should return an integer', () => {
    const result = randomIntFromInterval(0, 1000);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe('parseDelay', () => {
  it('should return default value when input is undefined', () => {
    expect(parseDelay(undefined)).toBe(5000);
  });

  it('should return custom default value when provided', () => {
    expect(parseDelay(undefined, 3000)).toBe(3000);
  });

  it('should parse a valid numeric string', () => {
    expect(parseDelay('1000')).toBe(1000);
  });

  it('should throw on non-numeric string', () => {
    expect(() => parseDelay('abc')).toThrow('Invalid delay value: "abc"');
  });

  it('should throw on zero', () => {
    expect(() => parseDelay('0')).toThrow('Invalid delay value: "0"');
  });

  it('should throw on negative value', () => {
    expect(() => parseDelay('-100')).toThrow('Invalid delay value: "-100"');
  });

  it('should handle string with leading number then text', () => {
    expect(() => parseDelay('12abc')).not.toThrow();
    expect(parseDelay('12abc')).toBe(12);
  });
});

describe('resolveOptions', () => {
  it('should enable mouse by default when no options are set', () => {
    const result = resolveOptions({
      mouse: undefined,
      autoclick: undefined,
      autoclickDelay: undefined,
      mouseDelay: undefined,
    });
    expect(result.mouse).toBe(true);
    expect(result.autoclick).toBe(false);
    expect(result.mouseDelayMs).toBe(5000);
    expect(result.autoclickDelayMs).toBe(5000);
  });

  it('should enable only autoclick when -a is passed without -m', () => {
    const result = resolveOptions({
      mouse: undefined,
      autoclick: true,
      autoclickDelay: undefined,
      mouseDelay: undefined,
    });
    expect(result.mouse).toBe(false);
    expect(result.autoclick).toBe(true);
  });

  it('should enable both when -m and -a are passed', () => {
    const result = resolveOptions({
      mouse: true,
      autoclick: true,
      autoclickDelay: undefined,
      mouseDelay: undefined,
    });
    expect(result.mouse).toBe(true);
    expect(result.autoclick).toBe(true);
  });

  it('should use custom delays when provided', () => {
    const result = resolveOptions({
      mouse: true,
      autoclick: true,
      autoclickDelay: '2000',
      mouseDelay: '3000',
    });
    expect(result.mouseDelayMs).toBe(3000);
    expect(result.autoclickDelayMs).toBe(2000);
  });

  it('should throw on invalid mouse delay', () => {
    expect(() =>
      resolveOptions({
        mouse: true,
        autoclick: undefined,
        autoclickDelay: undefined,
        mouseDelay: 'bad',
      }),
    ).toThrow('Invalid delay value');
  });

  it('should throw on invalid autoclick delay', () => {
    expect(() =>
      resolveOptions({
        mouse: undefined,
        autoclick: true,
        autoclickDelay: '-5',
        mouseDelay: undefined,
      }),
    ).toThrow('Invalid delay value');
  });
});

describe('generateDelay', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await generateDelay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
  });
});
