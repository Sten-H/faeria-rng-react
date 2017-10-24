export interface DrawCardState {
    id: number;
    needed: number;
    total: number;
}
export interface CreatureCardState {
    id: number;
    hp: number;
    toDie: boolean;
    isGod: boolean;
}
export interface SettingsState {
    drawAmount: number;
    pingAmount: number;
    mulligan: boolean;

}

export interface ResultState {
    draw: {
        desiredOutcomes: number;
        timeTaken: number;
    }
    ping: {
        desiredOutcomes: number;
        timeTaken: number;
    }
}
export interface StoreState {
    settings: SettingsState;
    drawCards: DrawCardState[];
    creatureCards: CreatureCardState[];
    results: ResultState;
}