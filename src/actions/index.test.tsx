import * as constants from '../constants';
import * as drawActions from './draw';
import * as pingActions from './ping';
import * as settingsActions from './settings';
import * as calcActions from './calculate';

describe('Actions', () => {
    describe('Calculate actions', () => {
        it('should create action to calculate ping', () => {
            const expectedAction = {
                type: constants.CALCULATE_PING,
            };
            expect(calcActions.calculatePing()).toEqual(expectedAction);
        });
        it('should create action to calculate draw', () => {
            const expectedAction = {
                type: constants.CALCULATE_DRAW
            };
            expect(calcActions.calculateDraw()).toEqual(expectedAction);
        });
    });
    describe('Draw actions', () => {
        describe('Add card action', () => {
            beforeEach(() => drawActions.resetDrawId());
            it('should create action to add draw card', () => {
                const expectedAction = {
                    id: 1,
                    cardType: constants.DRAW_CARD,
                    type: constants.ADD_INPUT_CARD
                };
                expect(drawActions.addDrawCard()).toEqual(expectedAction);
            });
            it('should increment id as cards are added', () => {
                drawActions.addDrawCard();
                drawActions.addDrawCard();
                const expectedAction = {
                    id: 3,
                    cardType: constants.DRAW_CARD,
                    type: constants.ADD_INPUT_CARD
                };
                expect(drawActions.addDrawCard()).toEqual(expectedAction);
            });
        });
        describe('Remove card action', () => {
            it('should create action to remove card', () => {
                const expectedAction = {
                    id: 2,
                    cardType: constants.DRAW_CARD,
                    type: constants.REMOVE_INPUT_CARD,
                };
                expect(drawActions.removeDrawCard(2)).toEqual(expectedAction);
            });
        });
        describe('Update card action', () => {
            it('should create action to update card', () => {
                const idToUpdate = 5;
                const expectedAction = {
                    id: idToUpdate,
                    value: 3,
                    cardType: constants.DRAW_CARD,
                    targetName: 'needed',
                    type: constants.UPDATE_INPUT_CARD
                };
                const mockEvent = {
                    currentTarget: {
                        value: '3',
                        name: 'needed'
                    }
                };
                expect(drawActions.updateDrawCard(idToUpdate, mockEvent)).toEqual(expectedAction);
            });
        });
    });
    describe('Ping actions', () => {
        describe('Add card action', () => {
            beforeEach(() => pingActions.resetCreatureId());
            it('should create action to add creature card', () => {
                const expectedAction = {
                    id: 2,
                    cardType: constants.CREATURE_CARD,
                    type: constants.ADD_INPUT_CARD
                };
                expect(pingActions.addCreatureCard()).toEqual(expectedAction);
            });
            it('should increment id as creatures are added', () => {
                pingActions.addCreatureCard();
                pingActions.addCreatureCard();
                const expectedAction = {
                    id: 4,
                    cardType: constants.CREATURE_CARD,
                    type: constants.ADD_INPUT_CARD
                };
                expect(pingActions.addCreatureCard()).toEqual(expectedAction);
            });
        });
        describe('Remove card action', () => {
            it('should create action to remove card', () => {
                const expectedAction = {
                    id: 2,
                    cardType: constants.CREATURE_CARD,
                    type: constants.REMOVE_INPUT_CARD,
                };
                expect(pingActions.removeCreatureCard(2)).toEqual(expectedAction);
            });
        });
        describe('Update card action', () => {
            it('should create action to update card', () => {
                const idToUpdate = 5;
                const expectedAction = {
                    id: idToUpdate,
                    value: 3,
                    cardType: constants.CREATURE_CARD,
                    targetName: 'hp',
                    type: constants.UPDATE_INPUT_CARD
                };
                const mockEvent = {
                    currentTarget: {
                        value: '3',
                        name: 'hp'
                    }
                };
                expect(pingActions.updateCreatureCard(idToUpdate, mockEvent)).toEqual(expectedAction);
            });
        });
    });
    describe('Settings actions', () => {
        it('Should create action to update mulligan', () => {
            const expectedVAction = {
                value: true,
                targetName: 'mulligan',
                type: constants.UPDATE_DRAW_MULLIGAN
            };
            const checkEvt = {
                currentTarget: {
                    name: 'mulligan',
                    checked: true,
                    value: "not of interest"
                }
            };
            expect(settingsActions.updateMulligan(checkEvt)).toEqual(expectedVAction);
        });
        it('Should create action to update drawAmount/pingAmount', () => {
            const expectedAction1 = {
                value: 15,
                targetName: 'drawAmount',
                type: constants.UPDATE_NUMERIC_SETTING,
            };
            const changeEvt1 = {
                currentTarget: {
                    name: 'drawAmount',
                    value: '15'
                }
            };
            expect(settingsActions.updateAmount(changeEvt1)).toEqual(expectedAction1);
            const expectedAction2 = {
                value: 5,
                targetName: 'pingAmount',
                type: constants.UPDATE_NUMERIC_SETTING,
            };
            const changeEvt2 = {
                currentTarget: {
                    name: 'pingAmount',
                    value: '5'
                }
            };
            expect(settingsActions.updateAmount(changeEvt2)).toEqual(expectedAction2);
        });
    });
});