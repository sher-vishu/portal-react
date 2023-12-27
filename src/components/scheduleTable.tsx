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
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store';
import { setScheduleKey } from "../features/match/matchDataSlice";
import { useNavigate } from 'react-router-dom';

 const ScheduleTable = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
  
  const matchesByMonthDate: Record<string, any[]> = {};
  filteredMatch.forEach((match) => {
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

  const handleLeftCardClick = (match: any) => {
    dispatch(setScheduleKey(match.schedule_key))
    navigate('/gamesummary');
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
              {filteredMatch.map((match: any, index: number) => (
                <Tr key={index}>
                  <Td>
                    <Text as='u'>
                      <Button
                        variant='link'
                        color='blue.500'
                        size='sm'
                        onClick={() => handleLeftCardClick(match.schedule_key)}>
                        {match.left_team}
                      </Button>
                    </Text>
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
                          vs {m.right_team}
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
