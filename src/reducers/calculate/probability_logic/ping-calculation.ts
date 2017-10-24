import * as R from 'ramda';
import * as helpers from './helpers';

type Creature = {id: number, hp: number, toDie: boolean};
// Each entry in val array is 'id' of targeted creature
type Outcome =  {val: Array<number>, p: number};
// Node is a node in probability tree
type Node = {p: number, target: number, children: Array<Node>};
const hpLens = R.lensProp('hp');

// creature -> boolean
const isAlive = R.compose(
    R.not,
    R.equals(0),
    R.view(hpLens));

// c -> c
export const pingCreature = (creature: Creature) => R.over(hpLens, R.dec, creature) as Creature;

// id -> Creature -> Creature
const pingIfTarget = (id: number) =>
    R.ifElse(
        R.propEq('id', id),
        pingCreature,
        R.identity);

// id -> [c] -> [c]
export const ping = (id: number) =>
            R.map(pingIfTarget(id));

// Internal recursive function to build outcome tree
const _createOutcomeTree = (creatures: Array<Creature>, pings: number): Array<Node> => {
    if (pings <= 0 || creatures.length <= 0) {
        return [];
    }
    return creatures.map(({id}) => {
        const creaturesAfterPing = ping(id)(creatures);
        const cleaned = R.filter(isAlive, creaturesAfterPing);
        return {
            p: 1 / creatures.length,
            target: id,
            children: _createOutcomeTree(cleaned, R.dec(pings))
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

const isNotRoot = R.compose(R.not, R.equals(-1));

const createNode = (target: Array<Number>, p: number, currentNode: Node) =>
    ({
        val: R.filter(isNotRoot, R.append(currentNode.target, target)),
        p: p * currentNode.p
    });

// [n] -> p -> Node -> [Outcome]
const _getOutcomes = R.curry((target: Array<number>, p: number, currentNode: Node): Array<Outcome> => {
    if (currentNode.children.length === 0) {
        // I need to return the Outcome wrapped in a list to not get type error
        return [createNode(target, p, currentNode)];
    }
    const getCurrentOutcomesFunc = _getOutcomes(target.concat(currentNode.target), p * currentNode.p);
    return R.chain(getCurrentOutcomesFunc, currentNode.children);
});
/**
 * Public getOutcomes, sets starting values for targets and p and use internal _getOutcome to get results.
 * It will collect the leaf nodes of the probability tree and return them as an array of outcomes
 * @param {Node} rootNode   Root node of where it should start traversing tree to collect leaf nodes
 * @returns {Array<Outcome>}
 */
export const getOutcomes = (rootNode: Node): Array<Outcome> => _getOutcomes([], 1, rootNode);

// creature -> outcome -> number, Sums pings to creature in specific outcome
export const sumCreatureDamageInOutcome = R.curry(({id}: Creature, {val}: Outcome): number =>
    R.compose(
        R.prop(R.toString(id)),
        R.countBy(R.identity as any)
    )(val) as number);

// creature -> dmg -> boolean
const isLethalDamage = R.curry(({hp}: Creature, dmg: number) => R.gte(dmg, hp));

/**
 * Returns true if creature's damage taken in this outcome is in compliance with creature.toDie
 * For example if creature.toDie = true and damage taken >= creature.hp the outcome is desired.
 * @param creature {Creature}   Creature to check if it matches outcome life status
 * @param outcome {Outcome} outcome object containing outcome and p variable
 * @returns {boolean}
 */
export const isDesiredOutcome = R.curry((outcome: Outcome, creature: Creature): boolean =>
    R.compose(
        R.equals(creature.toDie),
        isLethalDamage(creature),
        sumCreatureDamageInOutcome(creature)
    )(outcome));

// (creature, [outcome]) -> boolean, returns true if all creatures toDie status matches outcome life status
const allMatchDesiredOutcome = R.curry((creatures: Creature[], outcome: Outcome): boolean =>
        R.all(isDesiredOutcome(outcome), creatures));
/**
 * Filters outcomes to only outcomes that match all creatures toDie status
 * @param creatureInputs {Array<Creature>} array with creature objects
 * @param outcomes {Array<Outcome>} array of outcomes
 * @returns {Array<Outcome>}
 */
export const desiredOutcomes = (creatureInputs: Array<Creature>, outcomes: Array<Outcome>): Array<Outcome> =>
    R.filter(allMatchDesiredOutcome(creatureInputs), outcomes);

const addProbability = (accP: number, {p}: Outcome) => R.add(p, accP);
// [o] -> numb
const sumProbabilityOfOutcomes  = (outcomes: Outcome[]) => R.reduce(addProbability, 0, outcomes);

export const calculate = (creatures: Array<Creature>, pings: number): number => {
    const outcomeTreeRootNode = createOutcomeTree(creatures, pings);
    const outcomes = getOutcomes(outcomeTreeRootNode);
    const filteredOutcomes = desiredOutcomes(creatures, outcomes);
    const summedProbability = sumProbabilityOfOutcomes(filteredOutcomes);
    return helpers.roundToDecimal(4, summedProbability);
};
export default calculate;