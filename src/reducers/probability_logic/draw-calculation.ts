import * as helpers from './helpers';
import * as R from 'ramda';
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
// Card -> a: number
const combinationProduct = R.compose(
    R.product,
    R.map((c: Card) => choose(c.total, c.drawn)));

// Combination -> a: number, sums the product of all combinations
export const allCombinationCount = R.reduce((sum, combo: Combination) => sum + combinationProduct(combo), 0);

// Looks at one combination to see all cards total amount and sums it to find out non target cards in deck
// Array<Combination> _> a: number
const nonTargetCardsInDeck = R.compose(
    R.subtract(DECK_SIZE),
    R.reduce((sum, card: Card) => sum + card.total, 0),
    R.flatten,
    R.take(1));

// Combination -> a: number
const combinationTargetDraws = R.reduce((sum, card: Card) => sum + card.drawn, 0);
// Combination -> a: number
const combinationNonTargetDraws = (combo: Combination, draws: number) =>
    R.subtract(draws, combinationTargetDraws(combo));
// Combination -> Combination, fills single combination of target cards with remaining draws from non target
const fillCombination = R.curry((nonTargetAmount: number, draws: number, combo: Combination) =>
    R.append({total: nonTargetAmount, drawn: combinationNonTargetDraws(combo, draws)}, combo));
/**
 * Fills a combinations of target cards with remaining draws from non target cards and returns that updated
 * array of combinations.
 * @param targetCombinations
 * @param draws
 * @returns {Array}
 */
export const fillAllCombinations = (targetCombinations: Array<Combination>, draws: number): Array<Combination> => {
    const nonTargetAmount = nonTargetCardsInDeck(targetCombinations);
    const fillComboFunc = fillCombination(nonTargetAmount, draws);
    // Fill each combo with remaining draws from non target cards
    return targetCombinations.map((combo) => fillComboFunc(combo));
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
export const targetCombinations = (targetCards: Array<CardInfo>,
                                   activeCombo: Combination = []): any => {
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
    const allValidCombinations = fillAllCombinations(validTargetCombinations, draws);
    const result = allCombinationCount(allValidCombinations) / choose(DECK_SIZE, draws);
    return helpers.roundToDecimal(result, 4);
}
export default calculate;