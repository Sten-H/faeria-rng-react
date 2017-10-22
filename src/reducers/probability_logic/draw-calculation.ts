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
export const combinationCount = R.reduce(
    (sum, combo: Combination) => sum + combinationProduct(combo),
    0);

// Combination[] -> a: number
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

// n -> n -> Combination -> Combination, fills single combination of target cards with remaining draws from non target
const fillCombination = R.curry((nonTargetAmount: number, draws: number, combo: Combination) =>
    R.append({total: nonTargetAmount, drawn: combinationNonTargetDraws(combo, draws)}, combo));

// Returns a new combination with remaining draws from non target cards
export const fillAllCombinations =
    R.curry((draws: number, targetCombinations: Array<Combination>): Array<Combination> => {
    const nonTargetAmount = nonTargetCardsInDeck(targetCombinations);
    const fillComboFunc = fillCombination(nonTargetAmount, draws);
    // Fill each combo with remaining draws from non target cards
    return R.map(fillComboFunc, targetCombinations);
});

// c -> [n], returns a range of valid draw amounts
const validDrawAmounts = ({needed, total}: CardInfo) => R.range(needed, R.inc(total));
const createCard = R.curry((total, drawn) => ({total, drawn} as Card));
export const cardValidDraws = (cardInfo: CardInfo) =>
    R.map(createCard(cardInfo.total), validDrawAmounts(cardInfo));
export const allValidDraws = R.map(cardValidDraws);

// ([c], c) -> [c]
const comboCrossProduct = (combo: Combination, c: Card[]) => {
    if (R.isEmpty(combo)) {
        return c;
    }
    return R.xprod(combo, c);
};
// [a] -> string
const allTypes = R.compose(
    R.join(' '),
    R.map(R.type));

// [a] -> boolean
const isFlat = R.compose(
    R.not,
    R.contains('Array'),
    allTypes);

// [a] -> [b]
export const deepUnnest = R.compose(
    R.until(
        isFlat,
        R.unnest));

// a -> [a]
const wrapObject = R.ifElse(
    R.has('length'),
    R.identity,
    Array);

// CardInfo[] -> Combination[], gets all possible combinations of valid draws from each target card
export const targetCardCombinations = (cards: CardInfo[]): Combination[] => {
    return R.compose(
        R.map(deepUnnest),
        R.map(wrapObject),
        R.reduce(comboCrossProduct, []),
        allValidDraws
    )(cards) as Combination[];
};

// n -> n
const allCombinationCount = (draws: number) => choose(DECK_SIZE, draws);

// n -> n-> n, validCombinations / possibleCombinations
const calculateProbability = (draws: number) => R.flip(R.divide)(allCombinationCount(draws));
/**
 * Divides all possible combinations of cards with all desired combinations to get probability
 * @param cards {Array<CardInfo>}     Array containing Objects with information about target cards (amount, needed)
 * @param draws {number}    Amount of draws
 * @returns {number}        Probability to draw hand rounded to 4 decimal points
 */
export const calculate = (cards: Array<CardInfo>, draws: number): number =>
    R.compose(
        helpers.roundToDecimal(4),
        calculateProbability(draws),
        combinationCount,
        fillAllCombinations(draws),
        targetCardCombinations
    )(cards);
export default calculate;