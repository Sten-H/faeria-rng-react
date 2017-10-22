import {
    calculate, combinationCount, fillAllCombinations, targetCardCombinations,
    cardValidDraws, allValidDraws } from './draw-calculation';

describe('Draw calculation', () => {
    describe('Valid draws', () => {
        it('Valid draws of single card is returned as object list', () => {
            const card = {needed: 1, total: 2};
            const validDraws = cardValidDraws(card);
            expect(validDraws).toHaveLength(2);
            expect(validDraws).toContainEqual({drawn: 2, total: 2});
            expect(validDraws).toContainEqual({drawn: 1, total: 2});
            expect(validDraws).not.toContainEqual({drawn: 3, total: 2});
            expect(validDraws).not.toContainEqual({drawn: 3, total: 3});
        });
        it('Valid draws of all cards is returned as list containing list for each card', () => {
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 1}];
            const result = allValidDraws(cards);
            expect(result).toHaveLength(2);
            expect(result[0]).toHaveLength(3);
            expect(result[1]).toHaveLength(1);
        })
    });
    describe('Card combinations', () => {
        it('Single card combinations', () => {
            const cards = [{needed: 1, total: 2}];
            // const combinations = targetCardCombinations(cards);
            const combinations = targetCardCombinations(cards);
            expect(combinations).toHaveLength(2);
            expect(combinations).toContainEqual([{drawn: 2, total: 2}]);
            expect(combinations).toContainEqual([{drawn: 1, total: 2}]);
            expect(combinations).not.toContainEqual([{drawn: 3, total: 2}]);
            expect(combinations).not.toContainEqual([{drawn: 3, total: 3}]);
        });
        it('Two card combinations', () => {
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 1}];
            const combinations = targetCardCombinations (cards);
            const expectedCombination = [{drawn: 2, total: 3}, {drawn: 1, total: 1}];
            expect(combinations).toHaveLength(3);
            expect(combinations).toContainEqual(expectedCombination);
        });
        it('Multiple card combinations', () => {
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 2}, {needed: 1, total: 1}];
            const combinations = targetCardCombinations (cards);
            const expectedCombination = [{drawn: 2, total: 3}, {drawn: 1, total: 2}, {drawn: 1, total: 1}];
            expect(combinations).toContainEqual(expectedCombination);
        });
        it('Fill combinations with non-target card combination', () => {
            const cards = [{needed: 1, total: 2}];
            const combinations = targetCardCombinations(cards);
            const draws = 10;
            const filledCombinations = fillAllCombinations(draws, combinations);
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
            const combinations = targetCardCombinations([{needed: 1, total: 3}]);
            const allCombinations = fillAllCombinations(draws, combinations);
            expect(combinationCount(combinations)).toEqual(expected);
            expect(combinationCount(allCombinations)).toEqual(expectedAll);
        });
        it('Count complex combinations', () => {
            // Regression tests
            const draws = 20;
            const expected = 19271472;
            const cards = [{needed: 1, total: 3}, {needed: 1, total: 2}, {needed: 2, total: 3}];
            const combinations = targetCardCombinations(cards);
            const filledCombinations = fillAllCombinations(draws, combinations);
            expect(combinationCount(filledCombinations)).toEqual(expected);
        });
    });
    describe('Probability', () => {
        it('Calculates correctly', () => {
            // Regression test, I know this value to be true
            const expectedResult = 0.9704;
            const drawAmount = 20;
            const cards = [{needed: 1, total: 3}];
            const result = calculate(cards, drawAmount);
            const expectedResult2 = 0.0002;
            const result2 = calculate([{needed: 3, total: 3}], 3);
            expect(result).toEqual(expectedResult);
            expect(result2).toEqual(expectedResult2);
        })
    });
});