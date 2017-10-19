import * as R from 'ramda';

export const roundToDecimal = (r: number, decimalPoint: number) => parseFloat(r.toFixed(decimalPoint));
export const range = (start: number, end: number): ReadonlyArray<number> => R.range(start, end);
export const rangeInclusive = (start: number, end: number): ReadonlyArray<number> => range(start, end + 1);
export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;
export const getRandomIntInclusive = (min: number, max: number): number => getRandomInt(min, max + 1);