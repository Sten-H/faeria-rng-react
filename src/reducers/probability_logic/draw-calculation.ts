import * as helpers from './helpers';
/**
 * Calculation namespace calculates probability to draw desired cards using combinatorics. Its disadvantage is that
 * it does not account for starting hand mulligans but is much faster that simulation.
 */
export const DECK_SIZE = 30;
export type CardInfo = { needed: number, total: number};
type Card = { drawn: number, total: number};
type Combination = Array<Card>;
/**
 * Recursive implementation of n choose k.
 * @param  {int} n Total amount to choose from
 * @param  {int} k How many to choose
 * @return {int}   Returns how many possible combinations can be drawn disregarding order drawn
 */
function choose(n: number, k: number): number {
    if (n < 0 || k < 0) {
        return -1;
    }
    if (k === 0) {
        return 1;
    } else {
        return (n * choose(n - 1, k - 1)) / k;
    }
}

/**
 * Returns the number of combinations the cards can make. FIXME explain better.
 * @param combinations
 * @returns {*}
 */
export function combinationCount(combinations: Array<Combination>): number {
    return combinations.reduce((sum, combo) => {
        const comboProduct: number = combo
            .reduce((product, card) => product * choose(card.total, card.drawn), 1);
        return comboProduct + sum;
        }, 0);
}

/**
 * Fills a combinations of target cards with remaining draws from non target cards and returns that updated
 * array of combinations.
 * @param targetCombinations
 * @param draws
 * @returns {Array}
 */
export const fillCombinations = (targetCombinations: Array<Combination>, draws: number): Array<Combination> => {
    const nonTargetAmount: number = DECK_SIZE - targetCombinations[0]
        .reduce((acc, card) => acc + card.total, 0);
    // Add the remaining draws (after combination has been drawn) from non target cards
    return targetCombinations.map((combo) => {
        const drawn: number = combo.reduce((drawAcc, card) => drawAcc + card.drawn, 0),
            drawsLeft: number = Math.max(draws - drawn, 0);
        return combo.concat({total: nonTargetAmount, drawn: drawsLeft});
    });
};

/**
 * Creates all valid combination of target card draws. Draws only from target cards, the deck is not considered.
 * Every valid card draw is represented as an array with two values [total, drawn], for a targetCard {needed: 2, amount: 3}
 * two array will be created since there are tvo valid combinations of that card (drawn = 2 and drawn = 3),
 * each separate combination of a card will then be combined with all other cards valid combinations to create
 * all valid combinations of target card draws.
 * @param targetCards {CardInfo}
 * @param activeCombo {Combination}
 * @returns {Array<Combination>}
 */
// FIXME remove any type
export const targetCombinations = (targetCards: Array<CardInfo>, activeCombo: Combination = []): any => {
    if (targetCards.length === 0) {
        return [activeCombo];  // Not entirely sure why I need to wrap this
    }
    const [card, ...cardsLeft] = targetCards;
    return helpers.rangeInclusive(card.needed, card.total).reduce((results, currentNeeded) => {
        return results.concat(targetCombinations(cardsLeft, activeCombo.concat({total: card.total, drawn: currentNeeded})));
    }, []);
};
/**
 *
 * @param cards {Array<CardInfo>}     Array containing Objects with information about target cards (amount, needed)
 * @param draws {number}    Amount of draws
 * @returns {number}        Probability to draw hand rounded to 3 decimal points
 */
export function calculate(cards: Array<CardInfo>, draws: number): number {

    const validTargetCombinations = targetCombinations(cards);
    const allValidCombinations = fillCombinations(validTargetCombinations, draws);
    const result = combinationCount(allValidCombinations) / choose(DECK_SIZE, draws);
    console.log(helpers.roundToDecimal(result, 4));
    return helpers.roundToDecimal(result, 4);
}
export default calculate;