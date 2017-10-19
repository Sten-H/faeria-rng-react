import { calculate, combinationCount, fillCombinations, targetCombinations } from './draw-calculation';

describe('Draw calculation', () => {
    describe('Card combinations', () => {
        it('Single card combinations', () => {
            const cards = [{needed: 1, total: 2}];
            const combinations = targetCombinations(cards);
            expect(combinations).toHaveLength(2);
            expect(combinations).toContainEqual([{drawn: 2, total: 2}]);
            expect(combinations).toContainEqual([{drawn: 1, total: 2}]);
            expect(combinations).not.toContainEqual([{drawn: 3, total: 2}]);
            expect(combinations).not.toContainEqual([{drawn: 3, total: 3}]);
        });
        it('Multiple card combinations', () => {
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 1}];
            const combinations = targetCombinations(cards);
            const expectedCombination = [{drawn: 2, total: 3}, {drawn: 1, total: 1}];
            expect(combinations).toHaveLength(3);
            expect(combinations).toContainEqual(expectedCombination);
        });
        it('Fill combinations with non-target card combination', () => {
            const cards = [{needed: 1, total: 2}];
            const combinations = targetCombinations(cards);
            const draws = 10;
            const filledCombinations = fillCombinations(combinations, draws);
            const expectedCombinations = [
                [{drawn: 2, total: 2}, {drawn: 8, total: 28}],
                [{drawn: 1, total: 2}, {drawn: 9, total: 28}]
            ];
            expectedCombinations
                .map(expected => expect(filledCombinations).toContainEqual(expected));
        });
        it('Count simple combinations', () => {
            // Regression tests
            const draws = 20;
            const expected = 7;
            const expectedAll = 29156985;
            const combinations = targetCombinations([{needed: 1, total: 3}]);
            const allCombinations = fillCombinations(combinations, draws);
            expect(combinationCount(combinations)).toEqual(expected);
            expect(combinationCount(allCombinations)).toEqual(expectedAll);
        });
        it('Count complex combinations', () => {
            // Regression tests
            const draws = 20;
            const expected = 19271472;
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 2}, {needed: 2, total: 3}];
            const combinations = fillCombinations(targetCombinations(cards), draws);
            expect(combinationCount(combinations)).toEqual(expected);
        });
    });
    describe('Probability', () => {
        it('Calculates correctly', () => {
            // Regression test, I know this value to be true
            const expectedResult = 0.9704;
            const drawAmount = 20;
            const cards = [{needed: 1, total: 3}];
            const result = calculate(cards, drawAmount);
            expect(result).toEqual(expectedResult);
        })
    });
});