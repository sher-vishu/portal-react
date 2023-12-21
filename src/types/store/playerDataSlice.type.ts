import { IPlayerRank } from "../player.type";

export type COLLECTED_DATA_TYPE = {type: "click", playerId: number}

export interface IPlayersInitialState {
    players: ReadonlyArray<IPlayerRank>;
    isLoading: boolean;
    collectedData: COLLECTED_DATA_TYPE[];
}