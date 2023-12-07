import { IPlayerData } from "../player.type";

export type COLLECTED_DATA_TYPE = {type: "click", playerId: number}

export interface IPlayersInitialState {
    players: ReadonlyArray<IPlayerData>;
    isLoading: boolean;
    collectedData: COLLECTED_DATA_TYPE[];
}