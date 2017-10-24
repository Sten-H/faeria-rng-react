//
// /**
//  * Simulation namespace calculates draw probability by simulating many hands drawn and looking at the number of desired hands
//  * found in relation to all hands drawn. It also simulates intelligent mulligans which is its only advantage over
//  * Calculation namespace solution.
//  * This namespace uses side effects heavily, having pure functions affected performance in a very bad way I found.
//  */
// namespace Simulation {
//     /**
//      * In place swaps values of i and j indexes in array.
//      * @param  {Array} a [description]
//      * @param  {int} i index 1
//      * @param  {int} j index 2
//      */
//     function swap(a: Array<any>, i: number, j: number): void {
//         let temp = a[i];
//         a[i] = a[j];
//         a[j] = temp;
//     }
//     /**
//      * Shuffles array in place. https://stackoverflow.com/a/6274381
//      * @param {Array} a Array to be shuffled.
//      * @return {Array}  returns shuffled array
//      */
//     function shuffle(a: Array<any>): Array<any> {
//         for (let i = a.length - 1; i >= 0; i--) {
//             let j = Math.floor(Math.random() * i);
//             swap(a, i, j);
//         }
//         return a;
//     }
//     /**
//      * Creates an array of integers representing the deck. Cards of no interest are added as -1, target cards
//      * are added with value contained in card Object in targetCards array.
//      * @param  {Array} targetCards Array containing card Objects
//      * @return {Array}          Returns array representing the populated deck.
//      */
//     function createDeck(targetCards: Array<CardInfo>): Array<number> {
//         const targets = targetCards.map(card => Array<number>(card.total).fill(card.value)),
//             nonTargets = Array(30).fill(-1);
//         return [].concat(...targets, nonTargets).slice(0, 30);
//     }
//     /**
//      * Checks if deck contains card in the needed amount.
//      * @param  {Array} deck  Deck represented as integer array
//      * @param  {CardInfo} card Sought after card object
//      * @return {boolean}      True if deck contains card.value atleast card.needed amount of times
//      */
//     function contains(deck: Array<number>, card: CardInfo): boolean {
//         if (card.needed <= 0) {
//             return true;
//         }
//         return deck.reduce((acc, cardVal) =>
//                 (cardVal === card.value) ? acc + 1 : acc, 0) >= card.needed;
//     }
//
//     /**
//      * Used after starting hand is mulliganed to put non target cards back in deck.
//      * @param {Array<number>} deck
//      */
//     function replaceNonTarget(deck: Array<number>) {
//         deck.push(-1);
//         const newIndex = helpers.getRandomInt(0, deck.length);
//         swap(deck, deck.length - 1, newIndex);
//     }
//     /**
//      * Throws away all non target cards in starting hand.
//      * @param  {Array} deck           Deck represented as integer array
//      * @return {Array}                An array where the first object is active hand and second is active deck
//      */
//     function mulligan(deck: Array<number>): Array<Array<number>> {
//         const startingHand = deck.slice(0, 3),
//             activeDeck = deck.slice(3),
//             handAfterMulligan = startingHand.filter((val) => val >= 0),
//             mulliganCount = 3 - handAfterMulligan.length;
//         /* Put mulliganed cards back in deck. All mulliganed cards are of no interest (-1) */
//         helpers.range(0, mulliganCount).forEach((_) => replaceNonTarget(activeDeck));
//         return [handAfterMulligan, activeDeck];
//     }
//     /**
//      * Performs a mulligan, shuffles again, draws remaining cards and checks if all cards are represented
//      * at least the needed amount of times.
//      * @param  {Array} deck     Deck represented as integer array, should be shuffled beforehand
//      * @param  {Array} targetCards     Array containing desired cards with information
//      * @param  {Number} drawAmount amount of cards drawn
//      * @return {boolean}          Returns true if drawn cards contain all required cards.
//      */
//     function trial(deck: Array<number>, targetCards: Array<CardInfo>, drawAmount: number): boolean {
//         const [handAfterMulligan, deckAfterMulligan] = mulligan(deck),
//             remainingDraws = drawAmount - handAfterMulligan.length,  // 3 is starting hand size before mulligan
//             handAfterDraws = handAfterMulligan.concat( ...deckAfterMulligan.slice(0, remainingDraws));
//         // Return true if every needed card is contained in drawn cards
//         return targetCards.every((card) => contains(handAfterDraws, card));
//     }
//     /**
//      * Simulates several separate instances of decks with
//      * drawAmount of draws and checks if required cards are contained in hand.
//      * @param  {Array} targetCards     Array containing desired cards with information
//      * @param  {number} drawAmount amount of cards drawn
//      * @param  {number} tries How many times drawSimulation should be run
//      * @return {number}            ratio of successful draws to total draws
//      */
//     export function simulate(targetCards: Array<CardInfo>, drawAmount: number, tries: number=200000): number {
//         const deck = createDeck(targetCards),
//             desiredOutcomes = helpers.range(0, tries)
//                 .map( _ => trial(shuffle(deck), targetCards, drawAmount))
//                 .filter(v => v).length;
//         return desiredOutcomes / tries;
//     }
// }
// export const runSimulation = Simulation.simulate;