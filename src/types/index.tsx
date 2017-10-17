export interface DrawCardState {
    id: number;
    needed: number;
    total: number;
}
export interface CreatureCardState {
    id: number;
    hp: number;
    toDie: boolean;
}
export interface DrawSettingsState {
    draws: number;
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
    drawSettings: DrawSettingsState;
    drawCards: DrawCardState[];
    results: ResultState;
}