import * as R from 'ramda';
import * as helpers from './helpers';

type CreatureInfo = {toDie: boolean, hp: number, id: number};
type Creature = {id: number, hp: number};
// Each entry in val array is 'id' of targeted creature
type Outcome =  {val: Array<number>, p: number};
// Node is a node in probability tree
type Node = {p: number, target: number, children: Array<Node>};

export const pingCreature = (creature: Creature) => ({
        id: creature.id,
        hp: creature.hp - 1
});
const _createOutcomeTree = (creatures: Array<Creature>, pings: number): Array<Node> => {
    if (pings <= 0 || creatures.length <= 0) {
        return [];
    }
    return creatures.map((targetCreature, index) => {
        const probability = 1 / creatures.length;
        const targetId: number = targetCreature.id;
        const creaturesAfterPing = creatures
                .map((creature, i) => (i === index) ? pingCreature(creature) : creature)
                .filter(creature => creature.hp !== 0);  // Filter out tree root value (-1) from outcomes
        return {
            p: probability,
            target: targetId,
            children: _createOutcomeTree(creaturesAfterPing, pings - 1)
        };
    });
};
/**
 * Creates a probability tree. Each node has a probability value, to get the probability to arrive at
 * a node you multiply all probabilities from that node up to the root node. The outcome can be found in the same
 * way by traveling to the root while collecting all target values
 * @param creatures {Array<Creature>}
 * @param pings {number}
 * @return {Node} returns the root node of the tree
 */
export const createOutcomeTree = (creatures: Array<Creature>, pings: number): Node =>
    ({target: -1, p: 1, children: _createOutcomeTree(creatures, pings)});

/**
 * Public getOutcomes, sets starting values for targets and p and use internal _getOutcome to get results.
 * @param {Node} currentNode
 * @param {number} p
 * @returns {Array<Outcome>}
 */
export const getOutcomes = (currentNode: Node): Array<Outcome> => _getOutcomes([], 1, currentNode);
/**
 * Traverses probability tree down to leaf nodes and collects all outcomes and returns them as an array of outcomes
 * @private
 * @param currentNode {Node}    current node being traversed
 * @param target {Array<number>} accumulated targets hit while traversing down tree
 * @param p {number}    accumulated probability while traversing down tree
 * @returns {Array<Outcome>}
 */
const _getOutcomes = R.curry((target: Array<number>, p: number, currentNode: Node): Array<Outcome> => {
    if (currentNode.children.length === 0) {
        // I need to return the Outcome wrapped in a list to not get type error
        return [{val: target.concat(currentNode.target)
            .filter(targetVal => targetVal !== -1), p: p * currentNode.p}];
    }
    const getCurrentOutcomes = _getOutcomes(target.concat(currentNode.target), p * currentNode.p);
    // chain is used to flatten the array wrapped results
    return R.chain(getCurrentOutcomes, currentNode.children);
});
/**
 * Returns true if creature's damage taken in this outcome is in compliance with creature.toDie
 * For example if creature.toDie = true and damage taken >= creature.hp the outcome is desired.
 * @param creature {CreatureInfo}
 * @param outcome {Outcome} outcome object containing outcome and p variable
 * @returns {boolean}
 */
export const isDesiredOutcome = (creature: CreatureInfo, outcome: Outcome): boolean => {
    const dmg = outcome.val
        .reduce((acc, val) => (val === creature.id) ? R.inc(acc) : acc, 0);
    return ((creature.toDie && dmg >= creature.hp) || (!creature.toDie && dmg < creature.hp));
};

/**
 * Filters outcomes to only outcomes that have desired results
 * @param creatureInputs {Array<CreatureInfo>} array with creature objects
 * @param outcomes {Array<Outcome>} array of outcomes
 * @returns {Array<Outcome>}
 */
export const filterDesiredOutcomes = (creatureInputs: Array<CreatureInfo>,
                                      outcomes: Array<Outcome>): Array<Outcome> => {
    return creatureInputs
        .reduce((acc, c) => acc.filter(outcome => isDesiredOutcome(c, outcome)), outcomes);
};
export const calculate = (creatureInput: Array<CreatureInfo>, pings: number): number => {
    const creatures = R.map(R.omit(['toDie']), creatureInput) as Array<Creature>;
    const outcomeTreeRootNode = createOutcomeTree(creatures, pings);
    const outcomes = getOutcomes(outcomeTreeRootNode);
    const filteredOutcomes = filterDesiredOutcomes(creatureInput, outcomes);
    const summedProbability = filteredOutcomes.reduce((acc, outcome) => acc + outcome.p, 0);
    return helpers.roundToDecimal(4, summedProbability);
};
export default calculate;