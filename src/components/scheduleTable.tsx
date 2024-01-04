import { useState } from 'react'
import { Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text } from '@chakra-ui/react'
import { setSelectedTeam, setScheduleKey } from "../features/match/matchDataSlice";
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

 const ScheduleTable = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
  const teamList = useAppSelector((state: RootState) => state.matchData.team);
  const selectedTeam = useAppSelector((state: RootState) => state.matchData.selectedTeam);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedTeamMatch, setSelectedTeamMatch] = useState<any>([]);  
  const matchesByMonthDate: Record<string, any[]> = {};
  
  const tempMatchList:any = [];
  filteredMatch.forEach((match) => {
    if (match.left_team === selectedTeam.team_name || match.right_team === selectedTeam.team_name) {
      tempMatchList.push(match);
    }
  });
  console.log('temp match list:', tempMatchList)
  
  tempMatchList.forEach((match:any) => {
    const ymd = match.ymd;
    const monthDate = format(new Date(ymd), 'MMMM d');
    
    if (!matchesByMonthDate[monthDate]) {
      matchesByMonthDate[monthDate] = [];
    }
    matchesByMonthDate[monthDate].push(match);
  });

  const uniqueMonthDates = Array.from(
    new Set(filteredMatch.map((match) => format(new Date(match.ymd), 'MMMM d')))
  );

  console.log('team list: ', teamList)
  const handleLeftCardClick = (match: any) => {
    dispatch(setSelectedTeam(match))
    navigate('/teamsummary');
  };

  const handleRightCardClick = (match: any) => {
    dispatch(setScheduleKey(match.schedule_key))
    navigate('/gamesummary');
  };

  return (
    <div className='p-5 pl-6 pr-6'>
      <Card padding='6' variant ='outline' bgColor='#f3f5f8'>
        <TableContainer>
          <Table size='sm' bgColor='white'>
            <Thead bgColor='#dde1e6'>
            <Tr>
              <Th></Th>
              <Th colSpan={uniqueMonthDates.length + 1}>Date</Th>
            </Tr>
              <Tr>
                <Th>Team Name</Th>
                {uniqueMonthDates.map((monthDate, index) => (
                  <Th key={index}>{monthDate}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {teamList.map((match: any, index: number) => (
                <Tr key={index}>
                  <Td>
                      <Button
                        variant='link'
                        color='blue.500'
                        size='sm'
                        onClick={() => handleLeftCardClick(match)}>
                         <Text as='u'>{match.team_name}</Text>
                      </Button>
                  </Td>
                  {uniqueMonthDates.map((monthDate, idx) => (
                    <Td key={idx}>
                      {matchesByMonthDate[monthDate]?.map((m) => (
                        m.left_team === match.left_team &&
                        <Button
                          key={m.schedule_key}
                          colorScheme='telegram'
                          variant='solid'
                          color='white'
                          size='sm'
                          onClick={() => handleRightCardClick(m.schedule_key)}>
                          <Text as='u'>vs {m.right_team}</Text>
                        </Button>
                      ))}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default ScheduleTable
