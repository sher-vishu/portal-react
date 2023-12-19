import React, { useEffect, useState } from 'react'
import Layout from '../Layout/index'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  HStack,
  Text,
  Stack,
  Button
} from '@chakra-ui/react'
import { setSeason, 
  setPosition,
  filteredDepostaMatch } from "../../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";

const PlayerRanking = () => {

  const dispatch = useAppDispatch();
  const season = useAppSelector((state: RootState) => state.matchData.season);
  const position = useAppSelector((state: RootState) => state.matchData.position);
  const player_id = useAppSelector((state: RootState) => state.matchData.player_id);
  const [playerInfo, setPlayerInfo] = useState<any>([]);
  const [playerRank, setPlayerRank] = useState<any>([]);
  const [activeSeason, setActiveSeason] = useState('');
  const [activePosition, setActivePosition] = useState(''); 
  const { token, callApi } = useApi();

  useEffect(() => {
    async function fetchSeasonPos() {
      const params = {
        player_id: player_id,
      };
      try {
        const response = await callApi('/player_season_basic', params)
          setPlayerInfo(response['player_info']);
        } catch (error) {
        console.error('Error fetching player data:', error);
      }
    } fetchSeasonPos()
  }, [player_id, token]);

  useEffect(() => {
    async function fetchPlayerRank() {
        const params = {
            season: season,
        };
        try {
            const response = await callApi('/player_ranking', params);
            setPlayerRank(response['player_ranking']);
        } catch (error) {
            console.log('api error')
        }

    }
    fetchPlayerRank();
}, [season, token]);

const handleSeasonClick = (selectedSeason: string) => {
  dispatch(setSeason(selectedSeason));
  setActiveSeason(selectedSeason);
  };

  const handlePositionClick = (selectedPosition: string) => {
   // dispatch(setSelectedPosition(selectedPosition));
    setActivePosition(selectedPosition);
    dispatch(filteredDepostaMatch());
  };

  return (
    <div>
       <Layout />
       <div className='mt-5 p-4 pl-5'>
       <Heading as='h3' size='lg' pb='2'>B League Player Ranking</Heading>
       </div>
       <div className='p-4'>
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
            
            {/* Position */}
            
            <HStack spacing='24px' paddingBottom='5'>
            <Text>Position</Text>
            <Stack direction='row' spacing={2} align='center'>
            { position.map((position: any) => (
            <Button 
            key={position}
            bgColor={activePosition === position ? '#334d80' : 'white'}
            color={activePosition === position ? 'white' : '#747c83'}
            variant='outline'
            onClick={() => handlePositionClick(position)}>
              {position}
            </Button>
            ))}
            </Stack>
            </HStack>
       </div>
       <div className='p-4'>
                        <div>
                            <Tabs variant='enclosed' padding='5'>
                                <TabList>
                                    <Tab>Basic</Tab>
                                    <Tab>Synergy</Tab>
                                    <Tab>Line up</Tab>
                                    <Tab>Original</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel padding='0'>
                                        <Card bgColor='#f3f5f8' padding='5'>
                                            <div>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>#</Th>
                                                                <Th>Team Name</Th>
                                                                <Th isNumeric>Player Name</Th>
                                                                <Th isNumeric>Games</Th>
                                                                <Th isNumeric>GS</Th>
                                                                <Th isNumeric>GC</Th>
                                                                <Th isNumeric>MP</Th>
                                                                <Th isNumeric>PTS</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2FGA</Th>
                                                                <Th isNumeric>2FGM</Th>
                                                                <Th isNumeric>2FG%</Th>
                                                                <Th isNumeric>3FGA</Th>
                                                                <Th isNumeric>3FGM</Th>
                                                                <Th isNumeric>3FG%</Th>
                                                                <Th isNumeric>FTA</Th>
                                                                <Th isNumeric>FTM</Th>
                                                                <Th isNumeric>FT%</Th>
                                                                <Th isNumeric>ORB</Th>
                                                                <Th isNumeric>DRB</Th>
                                                                <Th isNumeric>TRB</Th>
                                                                <Th isNumeric>AST</Th>
                                                                <Th isNumeric>TOV</Th>
                                                                <Th isNumeric>STL</Th>
                                                                <Th isNumeric>BLK</Th>
                                                                <Th isNumeric>BSR</Th>
                                                                <Th isNumeric>TOV</Th>
                                                                <Th isNumeric>PF</Th>
                                                                <Th isNumeric>FD</Th>
                                                                <Th isNumeric>ORTG</Th>
                                                                <Th isNumeric>DRTG</Th>
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TO%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORG%</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {playerRank &&
                                                                playerRank.map((rank: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{rank.team_name}</Td>
                                                                        <Td>{rank.player_name}</Td>
                                                                        <Td isNumeric>{rank.game_count}</Td>
                                                                        <Td isNumeric>{rank.game_start}</Td>
                                                                        <Td isNumeric>{rank.minute_play}</Td>
                                                                        <Td isNumeric>{rank.pts}</Td>
                                                                        <Td isNumeric>{rank.fga}</Td>
                                                                        <Td isNumeric>{rank.fgm}</Td>
                                                                        <Td isNumeric>{rank.fgp}</Td>
                                                                        <Td isNumeric>{rank.f2ga}</Td>
                                                                        <Td isNumeric>{rank.f2gm}</Td>
                                                                        <Td isNumeric>{rank.f2gp}</Td>
                                                                        <Td isNumeric>{rank.f3ga}</Td>
                                                                        <Td isNumeric>{rank.f3gm}</Td>
                                                                        <Td isNumeric>{rank.f3gp}</Td>
                                                                        <Td isNumeric>{rank.fta}</Td>
                                                                        <Td isNumeric>{rank.ftm}</Td>
                                                                        <Td isNumeric>{rank.ftp}</Td>
                                                                        <Td isNumeric>{rank.orb}</Td>
                                                                        <Td isNumeric>{rank.drb}</Td>
                                                                        <Td isNumeric>{rank.trb}</Td>
                                                                        <Td isNumeric>{rank.ast}</Td>
                                                                        <Td isNumeric>{rank.tov}</Td>
                                                                        <Td isNumeric>{rank.stl}</Td>
                                                                        <Td isNumeric>{rank.blk}</Td>
                                                                        <Td isNumeric>{rank.bsr}</Td>
                                                                        <Td isNumeric>{rank.to}</Td>
                                                                        <Td isNumeric>{rank.pf}</Td>
                                                                        <Td isNumeric>{rank.fd}</Td>
                                                                        <Td isNumeric>{rank.ortg}</Td>
                                                                        <Td isNumeric>{rank.drtg}</Td>
                                                                        <Td isNumeric>{rank.efgp}</Td>
                                                                        <Td isNumeric>{rank.tovp}</Td>
                                                                        <Td isNumeric>{rank.ftr}</Td>
                                                                        <Td isNumeric>{rank.orgp}</Td>
                                                                    </Tr>
                                                                ))
                                                                }
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>  
                                        </Card>
                                    </TabPanel>
                                    <TabPanel>
                                        <Card>

                                        </Card>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
            </div>
    </div>
  )
}

export default PlayerRanking