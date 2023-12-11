import { useEffect } from 'react'
import { Card, Text } from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';

const MatchList = () => {

    const dispatch = useAppDispatch();
    const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
    const season = useAppSelector((state: RootState) => state.matchData.season);
    
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