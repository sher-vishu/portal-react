import { useState, useEffect } from 'react';
import { Card, 
  Heading, 
  Stack, 
  Button, 
  Text, 
  HStack, 
  Wrap, 
  WrapItem} from '@chakra-ui/react'
import { setSeason, 
  setMonth, 
  setSelectedMonth, 
  setTeam, 
  setSelectedTeam, 
  setAllMatches, 
  defaultDepostaMatch, 
  filteredDepostaMatch } from "../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';
import useApi from "../services/api.services";
import button from './button'
import { all } from 'axios';


const FilterComponent = () => {

  const dispatch = useAppDispatch();
  const season = useAppSelector((state: RootState) => state.matchData.season);
  const month = useAppSelector((state: RootState) => state.matchData.month);
  const team = useAppSelector((state: RootState) => state.matchData.team);
  const filteredMatch = useAppSelector((state: RootState) => state.matchData.filteredMatch);
  const selectedMonth = useAppSelector((state: RootState) => state.matchData.month);
  let [depostaMatches, setDepostaMatches] = useState([])
  const [allMatchData, setAllMatchData] = useState([]);
  const [activeSeason, setActiveSeason] = useState('');
  const [activeMonth, setActiveMonth] = useState(''); 
  const [activeTeam, setActiveTeam] = useState('');

  const { token, callApi } = useApi();

  useEffect(() => {
      async function fetchData(season: string) {
        const params = {
          season: season,
        };
        try {
          const response = await callApi('/match_list', params)
            console.log(response['match_data'].length);
            dispatch(setAllMatches(response['match_data']));
            dispatch(setMonth(response['month_list']));
            dispatch(setSelectedMonth(response['month_list'][0]))
            dispatch(setTeam(response['team_list']));
            dispatch(defaultDepostaMatch(response['match_data']));
            setAllMatchData(response['match_data'])
          } catch (error) {
          console.error('Error fetching player data:', error);
        }
      } fetchData(season)
    }, [season, token]);


  const handleSeasonClick = (selectedSeason: string) => {
    dispatch(setSeason(selectedSeason));
    setActiveSeason(selectedSeason);
    };

  const handleMonthClick = (selectedMonth: string) => {
    dispatch(setSelectedMonth(selectedMonth));
    setActiveMonth(selectedMonth);
    dispatch(filteredDepostaMatch());
  };

  const handleTeamClick = (selectedTeam: string) => {
    dispatch(setSelectedTeam(selectedTeam));
    setActiveTeam(selectedTeam);
    dispatch(filteredDepostaMatch());
  };

  return (
    <div>
      <div className='p-5 pl-6 pr-6'>
        <Card bgColor='#f3f5f8' variant='outline'>
          <div className='p-5'>
          <Heading as='h4' size='lg' paddingBottom='5'>B-League Match Schedule</Heading>
            {/* Season */}
            <HStack spacing='24px' paddingBottom='5'>
            <Text fontSize='md'>Season</Text>
            <Stack direction='row' spacing={2} align='center'>
            <Button 
            bgColor={activeSeason === season ? '#334d80' : 'white'}
            color={activeSeason === season ? 'white' : '#747c83'}
            onClick={() => handleSeasonClick('2023-24')}>
              2023-24
              </Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handleSeasonClick('2022-23')}>2022-23</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handleSeasonClick('2021-22')}>2021-22</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handleSeasonClick('2020-21')}>2020-21</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handleSeasonClick('2019-20')}>2019-20</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handleSeasonClick('2018-19')}>2018-19</Button>
            </Stack>
            </HStack>
            
            {/* Month */}
            
            <HStack spacing='24px' paddingBottom='5'>
            <Text>Month</Text>
            <Stack direction='row' spacing={2} align='center'>
            { month.map ((month: any) => (
            <Button 
            key={month}
            bgColor={activeMonth === month ? '#334d80' : 'white'}
            color={activeMonth === month ? 'white' : '#747c83'}
            variant='outline'
            onClick={() => handleMonthClick(month)}>
              {month}
            </Button>
            ))}
            </Stack>
            </HStack>
            
            {/* Team */}
            <HStack spacing='24px' paddingBottom='5'>
            <Text>Team</Text>
            <Wrap spacing='8px' flexWrap='wrap'>
            {team.map((team: any) => (
              <WrapItem key={team}>
              <Button  
              variant='outline' 
              bgColor={activeTeam === team ? '#334d80' : 'white'}
              color={activeTeam === team ? 'white' : '#747c83'}
              onClick={() => handleTeamClick(team)}>
                {team}
              </Button>
              </WrapItem>
            ))}
          </Wrap>
          </HStack>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default FilterComponent;