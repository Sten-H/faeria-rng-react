import { calculate, pingCreature, createOutcomeTree, getOutcomes,
    isDesiredOutcome, desiredOutcomes } from './ping-calculation';
import * as R from 'ramda';
describe('Ping probability calculation', () => {
    describe('Ping', () => {
        it('Decrements hp', () => {
            const creature = {hp: 2, id: 0, toDie: false};
            expect(pingCreature(creature).hp).toEqual(1);
        });
    });
    describe('Probability tree', () => {
        it('Builds correctly, pruning dead creatures', () => {
            const creatures = [{hp: 1, id: 0, toDie: false}, {hp: 1, id: 1, toDie: true}];
            const pingAmount = 1;
            const outcomeTree = createOutcomeTree(creatures, pingAmount);
            // Root node has target value -1
            expect(outcomeTree.target).toEqual(-1);
            expect(outcomeTree.children).toHaveLength(2);
            // This scenario is like a coin flip so there should be two children with
            // equal p and they in turn should have no children
            expect(outcomeTree.children[0].p).toEqual(0.5);
            expect(outcomeTree.children[0].children).toHaveLength(0);
            expect(outcomeTree.children[1].p).toEqual(0.5);
            expect(outcomeTree.children[1].children).toHaveLength(0);
        });
        it('Get outcomes from balanced probability tree', () => {
            const creatures = [{hp: 2, id: 0, toDie: false}, {hp: 2, id: 1, toDie: true}];
            const pingAmount = 2;
            const outcomeTree = createOutcomeTree(creatures, pingAmount);
            const outcomes = getOutcomes(outcomeTree);
            // There should be 4 unique ways that the 2 pings can be divided
            expect(outcomes).toHaveLength(4);
            expect(outcomes.map(out => out.p)).toEqual([0.25, 0.25, 0.25, 0.25])
        });
        it('Get outcomes from unbalanced probability tree', () => {
            const creatures = [{hp: 2, id: 0, toDie: false}, {hp: 1, id: 1, toDie: true}];
            const pingAmount = 2;
            const outcomeTree = createOutcomeTree(creatures, pingAmount);
            const outcomes = getOutcomes(outcomeTree);
            // There should be 3 unique ways that the 2 pings can be divided, because
            // creature 2 will get killed in 1 ping, so it can only receive one total
            expect(outcomes).toHaveLength(3);
        });
    });
    describe('Outcomes', () => {
        const cInfo1 = {hp: 1, id:0, toDie: true};
        const outcome1 = [{val: [0], p: 0}];
        const cInfo2 = R.assoc('toDie', false, cInfo1);
        const outcome2 = [{val: [0], p: 0}];
        it('desirability is determined correctly', () => {
            // Want creature to die and it does
            expect(isDesiredOutcome(outcome1[0], cInfo1)).toBe(true);
            // Want creature to live but it dies
            expect(isDesiredOutcome(outcome2[0], cInfo2)).toBe(false);
            // Creature with multiple hp points to die from inconsecutive pings
            const cInfo3 = {hp: 3, id:0, toDie: true};
            const outcome3 = {val: [0, 0, 1, 0], p: 0};
            expect(isDesiredOutcome(outcome3, cInfo3)).toBe(true);
            // Same creature with non killing damage
            const outcome4 = {val: [0, 1, 1, 0], p: 0};
            expect(isDesiredOutcome(outcome4, cInfo3)).toBe(false);
        });
        it('are filtered correctly according to desired status of creatures', () => {
           expect(desiredOutcomes([cInfo1], outcome1)).toHaveLength(1);
           expect(desiredOutcomes([cInfo2], outcome2)).toHaveLength(0);
        });
    });
    describe('Calculate', () => {
        it('Probability of unbalanced tree', () => {
            // Creature with 1 hp should have 75% to die in this scenario
            const creatures = [{hp: 2, id: 0, toDie: false}, {hp: 1, id: 1, toDie: true}];
            const pingAmount = 2;
            const result = calculate(creatures, pingAmount);
            // There should be 3 unique ways that the 2 pings can be divided, because
            // creature 2 will get killed in 1 ping, so it can only receive one total
            expect(result).toEqual(0.75);
            // expect(outcomes.map(out => out.p)).toEqual([0.25, 0.25, 0.25, 0.25])
        });
        it('Probability of balanced tree', () => {
            // This is a regression test, I know this value to be correct for this scenario.
            const expectedResult = 0.6875;
            const creatures = [{hp: 20, id: 0, toDie: false}, {hp: 2, id: 1, toDie: true}];
            const pingAmount = 4;
            const result = calculate(creatures, pingAmount);
            expect(result).toEqual(expectedResult);
        });
    });
});