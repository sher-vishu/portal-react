import { useState, useEffect } from 'react'
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
    Text,
    HStack,
    VStack,
    Button
} from '@chakra-ui/react'
import { setScheduleKey, setSelectedPlayer } from "../../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import { useNavigate } from 'react-router-dom';

const PlayerSummary = () => {

    const { token, callApi } = useApi();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [playerInfo, setPlayerInfo] = useState<any>({});
    const [playerSeasonBasic, setPlayerSeasonBasic] = useState<any[]>([]);
    const [teamName, setTeamName] =  useState<string>('');
    const [playerAdvStats, setPlayerAdvStats] = useState<any>([]);
    const [matchList, setMatchList] = useState<any>([]);
    const season = useAppSelector((state: RootState) => state.matchData.season);
    const player_id = useAppSelector((state: RootState) => state.matchData.selectedPlayer);

    useEffect(() => {
        async function fetchPlayerStats() {
            const params = {
                player_id: player_id,
            };
            try {
                const response = await callApi('/player_season_basic', params);
                setPlayerInfo(response['player_info']);
                setPlayerSeasonBasic(response['player_season_basic']);
                setTeamName(response['team_name']);
            } catch (error) {
                console.log('api error')
            }

        }
        fetchPlayerStats();
    }, [player_id, token]);

    useEffect(() => {
        async function fetchPlayerAdvStats() {
            const params = {
                player_id: player_id
            };
            try {
                const response = await callApi('/player_season_advanced', params);
                setPlayerAdvStats(response['player_season_advanced']);
            } catch (error) {
                console.log('api error')
            }
        }
        fetchPlayerAdvStats();
    }, [player_id, token]);

    useEffect(() => {
        async function fetchMatchList() {
            const params = {
                player_id: player_id,
                season: season
            };
            try {
                const response = await callApi('/player_match_list', params);
                setMatchList(response['player_match_list']);
            } catch (error) {
                console.log('api error')
            }
        }
        fetchMatchList();
    }, [player_id, season, token]);

    const handleGameSummaryClick = (match: any) => {
        dispatch(setScheduleKey(match.schedule_key))
        navigate('/gamesummary');
      };

  return (
    <div>
    <Layout />
    <div className='p-4'>
                        <div className='mt-5 p-4'>
                            <HStack spacing="34px">
                            <Heading as='h3' size='lg' pb='9'>#{playerInfo.number}</Heading>
                            <VStack alignItems="flex-start">
                            <Heading as='h3' size='lg' pb='2'>{playerInfo.player_name}</Heading>
                            <Text color='#747c83' fontSize='sm'>{teamName}</Text>  
                            </VStack>
                            <TableContainer>
                                    <Table size='sm' variant='simple' bgColor='white'>
                                    <Thead bgColor='#b6bbc4'>
                                            <Tr>
                                                <Th>POSITION</Th>
                                                <Th>HT</Th>
                                                <Th>WT</Th>
                                                <Th>BIRTH DATE</Th>
                                                <Th>COUNTRY</Th>
                                                <Th>TYPE</Th>
                                            </Tr>
                                    </Thead>
                                         <Tbody>
                                            <Tr>
                                                <Td>{playerInfo.position}</Td>
                                                <Td>{playerInfo.height}</Td>
                                                <Td>{playerInfo.weight}</Td>
                                                <Td>{playerInfo.birth_day}</Td>
                                                <Td>{playerInfo.country}</Td>
                                                <Td>{playerInfo.nationality_type}</Td>
                                            </Tr>
                                        </Tbody>
                                     </Table>
                            </TableContainer>
                            </HStack>
                        </div>
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
                                                <Heading as='h5' size='sm' pb='3'>Player Stats</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>SEASON</Th>
                                                                <Th>TEAM</Th>
                                                                <Th>GAME</Th>
                                                                <Th>STARTER</Th>
                                                                <Th>MP</Th>
                                                                <Th>PTS</Th>
                                                                <Th>FGM</Th>
                                                                <Th>FGA</Th>
                                                                <Th>FG%</Th>
                                                                <Th>2PM</Th>
                                                                <Th>2PA</Th>
                                                                <Th>2P%</Th>
                                                                <Th>Paint FGM</Th>
                                                                <Th>Paint FGA</Th>
                                                                <Th>Paint FG%</Th>
                                                                <Th>3PM</Th>
                                                                <Th>3PA</Th>
                                                                <Th>3P%</Th>
                                                                <Th>FTM</Th>
                                                                <Th>FTA</Th>
                                                                <Th>FT%</Th>
                                                                <Th>ORB</Th>
                                                                <Th>DRB</Th>
                                                                <Th>TRB</Th>
                                                                <Th>AST</Th>
                                                                <Th>TOV</Th>
                                                                <Th>STL</Th>
                                                                <Th>BLK</Th>
                                                                <Th>PF</Th>
                                                                <Th>FD</Th>
                                                                <Th>FB</Th>
                                                                <Th>POT</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                        {playerSeasonBasic && 
                                                        playerSeasonBasic.map((player: any, index: number) => (
                                                            <Tr key={index}>
                                                                <Td>{player.season}</Td>
                                                                <Td>{player.team}</Td>
                                                                <Td isNumeric>{player.g}</Td>
                                                                <Td isNumeric>{player.gs}</Td>
                                                                <Td isNumeric>{player.mp}</Td>
                                                                <Td isNumeric>{player.pts}</Td>
                                                                <Td isNumeric>{player.fgm}</Td>
                                                                <Td isNumeric>{player.fga}</Td>
                                                                <Td isNumeric>{player.fgp}</Td>
                                                                <Td isNumeric>{player.f2gm}</Td>
                                                                <Td isNumeric>{player.f2ga}</Td>
                                                                <Td isNumeric>{player.f2gp}</Td>
                                                                <Td isNumeric>{player.paint_f2gm}</Td>
                                                                <Td isNumeric>{player.paint_f2ga}</Td>
                                                                <Td isNumeric>{player.paint_f2gp}</Td>
                                                                <Td isNumeric>{player.f3gm}</Td>
                                                                <Td isNumeric>{player.f3ga}</Td>
                                                                <Td isNumeric>{player.f3gp}</Td>
                                                                <Td isNumeric>{player.ftm}</Td>
                                                                <Td isNumeric>{player.fta}</Td>
                                                                <Td isNumeric>{player.ftp}</Td>
                                                                <Td isNumeric>{player.orb}</Td>
                                                                <Td isNumeric>{player.drb}</Td>
                                                                <Td isNumeric>{player.trb}</Td>
                                                                <Td isNumeric>{player.ast}</Td>
                                                                <Td isNumeric>{player.tov}</Td>
                                                                <Td isNumeric>{player.stl}</Td>
                                                                <Td isNumeric>{player.blk}</Td>
                                                                <Td isNumeric>{player.pf}</Td>
                                                                <Td isNumeric>{player.fd}</Td>
                                                                <Td isNumeric>{player.fb}</Td>
                                                                <Td isNumeric>{player.pot}</Td>
                                                            </Tr>
                                                             ))}
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                      

                                        <div className='pt-5'>
                                        <Heading as='h5' size='sm' pb='3'>Player Advanced Stats</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>SEASON</Th>
                                                            <Th>TEAM</Th>
                                                            <Th>GAME</Th>
                                                            <Th>EFG</Th>
                                                            <Th>TS</Th>
                                                            <Th>USG</Th>
                                                            <Th>ORBP</Th>
                                                            <Th>DRBP</Th>
                                                            <Th>ASTP</Th>
                                                            <Th>STLP</Th>
                                                            <Th>BLKP</Th>
                                                            <Th>TOVP</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {playerAdvStats &&
                                                            playerAdvStats.map((stats: any, index: number) => (
                                                                <Tr key={index}>
                                                                    <Td>{stats.season}</Td>
                                                                    <Td>{stats.team}</Td>
                                                                    <Td>{stats.g}</Td>
                                                                    <Td>{stats.efg}</Td>
                                                                    <Td>{stats.ts}</Td>
                                                                    <Td>{stats.usg}</Td>
                                                                    <Td>{stats.orbp}</Td>
                                                                    <Td>{stats.drbp}</Td>
                                                                    <Td>{stats.astp}</Td>
                                                                    <Td>{stats.stlp}</Td>
                                                                    <Td>{stats.blkp}</Td>
                                                                    <Td>{stats.tovp}</Td>
                                                                </Tr>
                                                            ))}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                        <div className='pt-5 pb-5'>
                                        <Heading as='h5' size='sm' pb='3'>Match List</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>SEASON</Th>
                                                            <Th>MATCH DATE</Th>
                                                            <Th>OPPONENT</Th>
                                                            <Th>SCORE</Th>
                                                            <Th>STARTER</Th>
                                                            <Th>MP</Th>
                                                            <Th>PTS</Th>
                                                            <Th>FGM</Th>
                                                            <Th>FGA</Th>
                                                            <Th>FG%</Th>
                                                            <Th>2PM</Th>
                                                            <Th>2PA</Th>
                                                            <Th>2P%</Th>
                                                            <Th>Paint FGM</Th>
                                                            <Th>Paint FGA</Th>
                                                            <Th>Paint FG%</Th>
                                                            <Th>3PM</Th>
                                                            <Th>3PA</Th>
                                                            <Th>3P%</Th>
                                                            <Th>FTM</Th>
                                                            <Th>FTA</Th>
                                                            <Th>FT%</Th>
                                                            <Th>ORB</Th>
                                                            <Th>DRB</Th>
                                                            <Th>TRB</Th>
                                                            <Th>AST</Th>
                                                            <Th>TOV</Th>
                                                            <Th>STL</Th>
                                                            <Th>BLK</Th>
                                                            <Th>PF</Th>
                                                            <Th>FB</Th>
                                                            <Th>POT</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {matchList &&
                                                            matchList.map((match: any, index: number) => (
                                                                <Tr key={index}>
                                                                    <Td>{match.season}</Td>
                                                                    <Td>{match.match_date}</Td>
                                                                    <Td>
                                                                    <Button 
                                                                     variant='link' 
                                                                     color='blue.500' 
                                                                     onClick={() => handleGameSummaryClick(match)}>
                                                                           {match.team}-{match.opponent_team_name}
                                                                    </Button>
                                                                    </Td>
                                                                    <Td isNumeric>{match.score}</Td>
                                                                    <Td isNumeric>{match.starter}</Td>
                                                                    <Td isNumeric>{match.mp}</Td>
                                                                    <Td isNumeric>{match.pts}</Td>
                                                                    <Td isNumeric>{match.fgm}</Td>
                                                                    <Td isNumeric>{match.fga}</Td>
                                                                    <Td isNumeric>{match.fgp}</Td>
                                                                    <Td isNumeric>{match.f2gm}</Td>
                                                                    <Td isNumeric>{match.f2ga}</Td>
                                                                    <Td isNumeric>{match.f2gp}</Td>
                                                                    <Td isNumeric>{match.paint_f2gm}</Td>
                                                                    <Td isNumeric>{match.paint_f2ga}</Td>
                                                                    <Td isNumeric>{match.paint_f2gp}</Td>
                                                                    <Td isNumeric>{match.f3gm}</Td>
                                                                    <Td isNumeric>{match.f3ga}</Td>
                                                                    <Td isNumeric>{match.f3gp}</Td>
                                                                    <Td isNumeric>{match.ftm}</Td>
                                                                    <Td isNumeric>{match.fta}</Td>
                                                                    <Td isNumeric>{match.ftp}</Td>
                                                                    <Td isNumeric>{match.orb}</Td>
                                                                    <Td isNumeric>{match.drb}</Td>
                                                                    <Td isNumeric>{match.trb}</Td>
                                                                    <Td isNumeric>{match.ast}</Td>
                                                                    <Td isNumeric>{match.tov}</Td>
                                                                    <Td isNumeric>{match.stl}</Td>
                                                                    <Td isNumeric>{match.blk}</Td>
                                                                    <Td isNumeric>{match.pf}</Td>
                                                                    <Td isNumeric>{match.fb}</Td>
                                                                    <Td isNumeric>{match.pot}</Td>
                                                                </Tr>
                                                             ))}
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

export default PlayerSummary