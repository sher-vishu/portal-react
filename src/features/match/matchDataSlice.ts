import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMatchData } from "../../types/match.type";

const getLocalAllPlayer = () => {
  try {
    // Check if localStorage is available
    if ('localStorage' in window && window.localStorage !== null) {
      const localAllPlayers = localStorage.getItem('localAllPlayers');
      return localAllPlayers ? JSON.parse(localAllPlayers) : [];
    } else {
      console.error('localStorage is not available');
      return [];
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return [];
  }
};

export const initialState: {
  allMatches: IMatchData[],
  filteredMatch: IMatchData[],
  month: string,
  season: string,
  team: string,
} = {
  allMatches: [],
  filteredMatch: [],
  month: '12',
  season: '2023-24',
  team: 'All',
};


export const matchDataSlice = createSlice({
  name: "matchData",
  initialState,
  reducers: {
    setAllMatches: (state, action) => {
      state.allMatches = action.payload
    },
    filteredDepostaMatch: (state, action) => {
      
      if (action.payload){
        state.filteredMatch = action.payload
        return 
      }else{
        var tempAllPlayers = getLocalAllPlayer()  
          var teamPlayers = tempAllPlayers.filter((player: any) => {
            if (state.team !== 'all' || state.team === null) {
              if (player.team_name !== state.team) {
                return false
              }
            }
            return true
          });
          console.log('Team player:', teamPlayers)
          state.filteredMatch = teamPlayers;
      }
    },
    setFilteredMatch: (state, action) => {
      state.filteredMatch = action.payload;
    },  
    setSeason: (state, action) => {
      state.season = action.payload;
    },    
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const {
setSeason, 
setMonth, 
setTeam,
setAllMatches, 
setFilteredMatch,
filteredDepostaMatch } = matchDataSlice.actions;

export default matchDataSlice.reducer;