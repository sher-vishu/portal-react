import { createSlice } from "@reduxjs/toolkit";
import { IMatchData } from "../../types/match.type";
import { ITeamData } from "../../types/team.type";
import { IPlayerRank } from "../../types/player.type";

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
  team: ITeamData[],
  selectedTeam: ITeamData,
  position: string,
  selectedPosition: string,
  schedule_key: string,
  team_id: string,
  player_id: string,
  selectedPlayer: string
} = {
  allMatches: [],
  filteredMatch: [],
  season: '2023-24',
  month: [],
  selectedMonth: '',
  team: [],
  selectedTeam: {} as ITeamData,
  position: 'PG',
  selectedPosition: '',
  schedule_key: '2024501494',
  team_id: '9361',
  player_id: '1406',
  selectedPlayer: ''
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

          if (state.selectedTeam.team_name !== '') {
            if (match.left_team !== state.selectedTeam.team_name && match.right_team !== state.selectedTeam.team_name) {
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
      console.log(action)
      state.selectedMonth = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setScheduleKey: (state, action) => {
      state.schedule_key = action.payload;
    },
    setSelectedPlayer: (state, action) => {
      state.selectedPlayer = action.payload;
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
setPosition,
setAllMatches, 
setFilteredMatch,
setScheduleKey,
setSelectedPlayer,
filteredDepostaMatch,
defaultDepostaMatch
 } = matchDataSlice.actions;

export default matchDataSlice.reducer;