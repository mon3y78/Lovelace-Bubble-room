import { describe, it, expect } from 'vitest';
import { getSensorEmojiAndUnit } from '../src/bubble-room.js';

describe('getSensorEmojiAndUnit', () => {
  it('returns Celsius by default', () => {
    expect(getSensorEmojiAndUnit('temperature')).toEqual({ emoji: '🌡️', unit: '°C' });
  });

  it('handles Fahrenheit', () => {
    expect(getSensorEmojiAndUnit('temperature', 'F')).toEqual({ emoji: '🌡️', unit: '°F' });
  });

  it('unknown type returns question mark', () => {
    expect(getSensorEmojiAndUnit('unknown')).toEqual({ emoji: '❓', unit: '' });
  });
});
