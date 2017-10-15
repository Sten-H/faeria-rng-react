export interface DrawCardState {
    id: number;
    needed: number;
    total: number;
}
// interface CreatureCardState {
//     hp: number;
//     toDie: boolean;
// }
export interface StoreState {
    // creatureCards: Array<CreatureCardState>;
    cards: Array<DrawCardState>;
}