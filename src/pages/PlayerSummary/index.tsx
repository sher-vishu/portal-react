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
    HStack
} from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";

const PlayerSummary = () => {

    const { token, callApi } = useApi();
    const [playerInfo, setPlayerInfo] = useState<any>([]);
    const [playerSeasonBasic, setPlayerSeasonBasic] = useState<any>([]);
    const [teamName, setTeamName] =  useState([]);
    const [playerAdvStats, setPlayerAdvStats] = useState<any>([]);
    const [matchList, setMatchList] = useState<any>([]);
    const season = useAppSelector((state: RootState) => state.matchData.season);
    const player_id = useAppSelector((state: RootState) => state.matchData.player_id);

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

  return (
    <div>
    <Layout />
    <div className='p-4'>
                    {playerInfo && (
                        <div className='mt-5 p-4'>
                            <HStack spacing="24px">
                            <Heading as='h3' size='lg' pb='2'>{playerInfo.number}</Heading>
                            <Heading as='h3' size='lg' pb='2'>{playerInfo.player_name}</Heading>
                            </HStack>
                            <Text color='#747c83' fontSize='md'>{playerInfo.number}</Text>
                            <TableContainer>
                                    <Table size='sm' variant='simple' bgColor='white'>
                                    <Thead bgColor='#b6bbc4'>
                                            <Tr>
                                                <Th isNumeric>Ht(cm)</Th>
                                                <Th isNumeric>Birth Date</Th>
                                                <Th>Country</Th>
                                            </Tr>
                                    </Thead>
                                         <Tbody>
                                            <Tr>
                                                <Td isNumeric>{playerInfo.height}</Td>
                                                <Td isNumeric>{playerInfo.birth_day}</Td>
                                                <Td>{playerInfo.country}</Td>
                                            </Tr>
                                        </Tbody>
                                     </Table>
                            </TableContainer>
                        </div>
                    )}

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
                                    <HStack spacing='54px'>
                                            <div>
                                                <Heading as='h5' size='sm' pb='3'>Player Stats</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>Season</Th>
                                                                <Th>Team</Th>
                                                                <Th>POS</Th>
                                                                <Th>GAME</Th>
                                                                <Th>STARTER</Th>
                                                                <Th>MP</Th>
                                                                <Th>PTS</Th>
                                                                <Th>FGA</Th>
                                                                <Th>FGM</Th>
                                                                <Th>FG%</Th>
                                                                <Th>2FGA</Th>
                                                                <Th>2FGM</Th>
                                                                <Th>2FG%</Th>
                                                                <Th>Paint FGA</Th>
                                                                <Th>Paint FGM</Th>
                                                                <Th>Paint FG%</Th>
                                                                <Th>3FGA</Th>
                                                                <Th>3FGM</Th>
                                                                <Th>3FG%</Th>
                                                                <Th>FTA</Th>
                                                                <Th>FTM</Th>
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
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                        {playerSeasonBasic && 
                                                        playerSeasonBasic.map((player: any, index: number) => (
                                                            <Tr key={index}>
                                                                <Td>{player.season}</Td>
                                                                <Td>{player.team}</Td>
                                                                <Td>{player.pos}</Td>
                                                                <Td isNumeric>{player.g}</Td>
                                                                <Td isNumeric>{player.gs}</Td>
                                                                <Td isNumeric>{player.mp}</Td>
                                                                <Td isNumeric>{player.pts}</Td>
                                                                <Td isNumeric>{player.fga}</Td>
                                                                <Td isNumeric>{player.fgm}</Td>
                                                                <Td isNumeric>{player.fgp}</Td>
                                                                <Td isNumeric>{player.f2ga}</Td>
                                                                <Td isNumeric>{player.f2gm}</Td>
                                                                <Td isNumeric>{player.f2gp}</Td>
                                                                <Td isNumeric>{player.paint_f2ga}</Td>
                                                                <Td isNumeric>{player.paint_f2gm}</Td>
                                                                <Td isNumeric>{player.paint_f2gp}</Td>
                                                                <Td isNumeric>{player.f3ga}</Td>
                                                                <Td isNumeric>{player.f3gm}</Td>
                                                                <Td isNumeric>{player.f3gp}</Td>
                                                                <Td isNumeric>{player.fta}</Td>
                                                                <Td isNumeric>{player.ftm}</Td>
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
                                                            </Tr>
                                                             ))}
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                      

                                        <div>
                                        <Heading as='h5' size='sm' pb='3'>Player Advanced Stats</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>Season</Th>
                                                            <Th>Team</Th>
                                                            <Th isNumeric>GAME</Th>
                                                            <Th isNumeric>EFG</Th>
                                                            <Th isNumeric>TS</Th>
                                                            <Th isNumeric>USG</Th>
                                                            <Th isNumeric>ORBP</Th>
                                                            <Th isNumeric>DRBP</Th>
                                                            <Th isNumeric>ASTP</Th>
                                                            <Th isNumeric>STLP</Th>
                                                            <Th isNumeric>BLKP</Th>
                                                            <Th isNumeric>TOVP</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {playerAdvStats &&
                                                            playerAdvStats.map((stats: any, index: number) => ((
                                                                <Tr key={index}>
                                                                    <Td>{stats.season}</Td>
                                                                    <Td>{stats.team}</Td>
                                                                    <Td isNumeric>{stats.g}</Td>
                                                                    <Td isNumeric>{stats.efg}</Td>
                                                                    <Td isNumeric>{stats.ts}</Td>
                                                                    <Td isNumeric>{stats.usg}</Td>
                                                                    <Td isNumeric>{stats.orbp}</Td>
                                                                    <Td isNumeric>{stats.astp}</Td>
                                                                    <Td isNumeric>{stats.blkp}</Td>
                                                                    <Td isNumeric>{stats.tovp}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                      </HStack>

                                        <div className='pt-5 pb-5'>
                                        <Heading as='h5' size='sm' pb='3'>Match List</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>Season</Th>
                                                            <Th>Match Date</Th>
                                                            <Th>Opponent</Th>
                                                            <Th isNumeric>Score</Th>
                                                            <Th isNumeric>STARTER</Th>
                                                            <Th isNumeric>MP</Th>
                                                            <Th isNumeric>2PM</Th>
                                                            <Th isNumeric>PaintFGM</Th>
                                                            <Th isNumeric>PaintFGA</Th>
                                                            <Th isNumeric>PaintFG%</Th>
                                                            <Th isNumeric>3PA</Th>
                                                            <Th isNumeric>3PM</Th>
                                                            <Th isNumeric>3P%</Th>
                                                            <Th isNumeric>FGA</Th>
                                                            <Th isNumeric>FTA</Th>
                                                            <Th isNumeric>FTM</Th>
                                                            <Th isNumeric>FT%</Th>
                                                            <Th isNumeric>ORB</Th>
                                                            <Th isNumeric>TRB</Th>
                                                            <Th isNumeric>AST</Th>
                                                            <Th isNumeric>TOV</Th>
                                                            <Th isNumeric>STL</Th>
                                                            <Th isNumeric>BLK</Th>
                                                            <Th isNumeric>PF</Th>
                                                            <Th isNumeric>Pts of TO</Th>
                                                            <Th isNumeric>FB Pts</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {matchList &&
                                                            matchList.map((match: any, index: number) => ((
                                                                <Tr key={index}>
                                                                    <Td>{match.home_or_away}</Td>
                                                                    <Td>{match.team}</Td>
                                                                    <Td isNumeric>{match.fga}</Td>
                                                                    <Td isNumeric>{match.fgm}</Td>
                                                                    <Td isNumeric>{match.fgp}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match.paint_f2gm}</Td>
                                                                    <Td isNumeric>{match.paint_f2ga}</Td>
                                                                    <Td isNumeric>{match.paint_f2gp}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match.fga}</Td>
                                                                    <Td isNumeric>{match.fta}</Td>
                                                                    <Td isNumeric>{match.ftm}</Td>
                                                                    <Td isNumeric>{match.ftp}</Td>
                                                                    <Td isNumeric>{match.orb}</Td>
                                                                    <Td isNumeric>{match.treb}</Td>
                                                                    <Td isNumeric>{match.ast}</Td>
                                                                    <Td isNumeric>{match.tov}</Td>
                                                                    <Td isNumeric>{match.stl}</Td>
                                                                    <Td isNumeric>{match.blk}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match}</Td>
                                                                    <Td isNumeric>{match.fb}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
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