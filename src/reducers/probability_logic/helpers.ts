import * as R from "ramda";

export function range(start: number, end: number): ReadonlyArray<number> {
    return R.range(start, end);
}
export function rangeInclusive(start: number, end: number): ReadonlyArray<number> {
    return range(start, end + 1);
}
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}
export function getRandomIntInclusive(min: number, max: number): number {
    return getRandomInt(min, max + 1);
}