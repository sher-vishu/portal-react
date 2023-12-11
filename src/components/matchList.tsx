import { useEffect } from 'react'
import { Card, Text } from '@chakra-ui/react'
import { setAllMatches } from "../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';
import useApi from "../services/api.services";

const MatchList = () => {

    const dispatch = useAppDispatch();
    const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
    const season = useAppSelector((state: RootState) => state.matchData.season);
   const { callApi } = useApi();

    useEffect(() => {
        async function fetchData(season: string) {
          const params = {
            season: season,
          };
          console.log(season)
          try {
            const response = await callApi('/match_list', params);
            console.log(response['match_data'].length);
            dispatch(setAllMatches(response['match_data']));
          } catch (error) {
            console.error('Error fetching player data:', error);
          }
        } fetchData(season)
      }, [season]);
    
  return (
    <div>
       {filteredMatch.map((match: any) => (
        <Card 
         key={match.schedule_key} 
         variant='elevated'>
        <Text color='black'>{match.ymd}</Text>
        <Text as="b" color='black'>{match.card}</Text>
        </Card>
))}
    </div>
  )}

export default MatchList