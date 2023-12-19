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
  setTeam, 
  setSelectedTeam, 
  setAllMatches, 
  defaultDepostaMatch,
  filteredDepostaMatch } from "../../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import Layout from '../Layout';
import { Link } from 'react-router-dom';

const Teams = () => {

  const dispatch = useAppDispatch();
  const season = useAppSelector((state: RootState) => state.matchData.season);
  const team = useAppSelector((state: RootState) => state.matchData.team);
  const [allMatchData, setAllMatchData] = useState([]);
  const [activeSeason, setActiveSeason] = useState('');
  const [activeTeam, setActiveTeam] = useState('');
  const { token, callApi } = useApi();

  useEffect(() => {
      async function fetchData(season: string) {
        const params = {
          season: season,
        };
        try {
          const response = await callApi('/match_list', params)
            dispatch(setAllMatches(response['match_data']));
            getTeamsData(season)
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

  const handleTeamClick = (selectedTeam: any) => {
    dispatch(setSelectedTeam(selectedTeam));
    setActiveTeam(selectedTeam);
    dispatch(filteredDepostaMatch());
  };

  async function getTeamsData(season:string){
    const params = {
      season: season,
    };
    try {
      const response = await callApi('/team_list', params)
      console.log(response['team_list'].length)
      dispatch(setTeam(response['team_list']));
      } catch (error) {
      console.error('Error fetching player data:', error);
    } 
  }

  return (
    <div>
      <Layout />
      <div className='p-5 pl-6 pr-6'>
        <Card bgColor='#f3f5f8' variant='outline'>
          <div className='p-5'>
          <Heading as='h4' size='lg' paddingBottom='5'>B-League Teams</Heading>
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
            
            {/* Team */}
            <HStack spacing='24px' paddingBottom='5'>
            <Text>Team</Text>
            <Wrap spacing='8px' flexWrap='wrap'>
            {team.map((tm: any) => (
              <WrapItem key={tm.id}>
              <Link to='/teamsummary'>
              <Button  
              variant='outline' 
              bgColor={activeTeam === tm ? '#334d80' : 'white'}
              color={activeTeam === tm ? 'white' : '#747c83'}
              onClick={() => handleTeamClick(tm)}>
                {tm.team_name}
              </Button>
              </Link>
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

export default Teams;