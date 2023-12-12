import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMatchData } from "../../types/match.type";
import { stat } from "fs";

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
  season: string,
  month: string[],
  selectedMonth: string,
  team: string[],
  selectedTeam: string,
  
} = {
  allMatches: [],
  filteredMatch: [],
  season: '2023-24',
  month: [],
  selectedMonth: '',
  team: [],
  selectedTeam: '',
};

export const matchDataSlice = createSlice({
  name: "matchData",
  initialState,
  reducers: {
    setAllMatches: (state, action) => {
      state.allMatches = action.payload
    },
    defaultDepostaMatch: (state, action) => {
      state.filteredMatch = action.payload;
    },
    filteredDepostaMatch: (state) => {
        console.log(state.selectedTeam, state.selectedMonth)
        const teamMatch = state.allMatches.filter((match: any) => {
          if ((state.selectedMonth !== '')) {
            if (extractYearMonth(match.ymd) !== state.selectedMonth) {
              return false;
            }
          }

          if (state.selectedTeam !== '') {
            if (match.left_team !== state.selectedTeam && match.right_team !== state.selectedTeam) {
              return false;
            }
          }
          return true;
        });
        console.log('Team player:', teamMatch);
        state.filteredMatch = teamMatch;
    },
    
    setFilteredMatch: (state, action) => {
      state.filteredMatch = action.payload;
    },  
    setSeason: (state, action) => {
      state.season = action.payload;
    },    
    setMonth: (state, action) => {
      state.month = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    
  },
});

function extractYearMonth(dateString: string){
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 

  return `${year}-${month}`;
};

export const {
setSeason, 
setMonth, 
setSelectedMonth,
setTeam,
setSelectedTeam,
setAllMatches, 
setFilteredMatch,
filteredDepostaMatch,
defaultDepostaMatch
 } = matchDataSlice.actions;

export default matchDataSlice.reducer;