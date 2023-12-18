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
    Spinner,
} from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import { Link } from 'react-router-dom';

const TeamSummary = () => {

    const { token, callApi } = useApi();
    const [ownBoxscore, setOwnBoxscore] = useState<any>([]);
    const [oppBoxscore, setOppBoxscore] = useState<any>([]);
    const [playerAvgStats, setPlayerAvgStats] = useState<any>([]);
    const [matchList, setMatchList] = useState<any>([]);
    const team_id = useAppSelector((state: RootState) => state.matchData.selectedTeam.team_id);
    const season = useAppSelector((state: RootState) => state.matchData.season);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchOwnBoxscore() {
            const params = {
                team_id: team_id,
            };
            try {
                const response = await callApi('/team_season_basic', params);
                setOwnBoxscore(response['team_season_basic']);
            } catch (error) {
                console.log('api error')
            }

        }
        fetchOwnBoxscore();
    }, [team_id, token]);

    useEffect(() => {
        async function fetchOppBoxscore() {
            const params = {
                team_id: team_id,
            };
            try {
                const response = await callApi('/opponent_season_basic', params);
                setOppBoxscore(response['opponent_season_basic']);
            } catch (error) {
                console.log('api error')
            }
        }
        fetchOppBoxscore();
    }, [team_id, token]);

    useEffect(() => {
        async function fetchTeamMatchList() {
            const params = {
                team_id: team_id,
                season: season
            };
            try {
                const response = await callApi('/team_players_basic', params);
                setPlayerAvgStats(response['team_players_basic']);
            } catch (error) {
                console.log('api error')
            }
        }
        fetchTeamMatchList();
    }, [team_id, season, token]);

    useEffect(() => {
        async function fetchTeamMatchList() {
            const params = {
                team_id: team_id,
                season: season
            };
            try {
                const response = await callApi('/team_match_list', params);
                setMatchList(response['team_match_list']);
            } catch (error) {
                console.log('api error')
            }
        }
        fetchTeamMatchList();
    }, [team_id, season, token]);

    
    return (
        <div>
            <Layout />
            <div className='p-4'>
                        {ownBoxscore && (
                            <div className='mt-5 p-4'>
                                <Heading as='h3' size='lg' pb='2'>{ownBoxscore.team_name}</Heading>
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
                                            <div>
                                                <Heading as='h5' size='sm' pb='3'>Boxscore</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>Season</Th>
                                                                <Th>Game</Th>
                                                                <Th isNumeric>PTS</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2FGM</Th>
                                                                <Th isNumeric>2FGA</Th>
                                                                <Th isNumeric>2FG%</Th>
                                                                <Th isNumeric>3FGM</Th>
                                                                <Th isNumeric>3FGA</Th>
                                                                <Th isNumeric>3FG%</Th>
                                                                <Th isNumeric>FTM</Th>
                                                                <Th isNumeric>FTA</Th>
                                                                <Th isNumeric>FTP</Th>
                                                                <Th isNumeric>ORB</Th>
                                                                <Th isNumeric>DRB</Th>
                                                                <Th isNumeric>TRB</Th>
                                                                <Th isNumeric>AST</Th>
                                                                <Th isNumeric>TOV</Th>
                                                                <Th isNumeric>STL</Th>
                                                                <Th isNumeric>BLK</Th>
                                                                <Th isNumeric>PF</Th>
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TOV%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORB%</Th>
                                                                <Th isNumeric>PTS</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2FGM</Th>
                                                                <Th isNumeric>2FGA</Th>
                                                                <Th isNumeric>2FG%</Th>
                                                                <Th isNumeric>3FGM</Th>
                                                                <Th isNumeric>3FGA</Th>
                                                                <Th isNumeric>3FG%</Th>
                                                                <Th isNumeric>FTM</Th>
                                                                <Th isNumeric>FTA</Th>
                                                                <Th isNumeric>FTP</Th>
                                                                <Th isNumeric>ORB</Th>
                                                                <Th isNumeric>DRB</Th>
                                                                <Th isNumeric>TRB</Th>
                                                                <Th isNumeric>AST</Th>
                                                                <Th isNumeric>TOV</Th>
                                                                <Th isNumeric>STL</Th>
                                                                <Th isNumeric>BLK</Th>
                                                                <Th isNumeric>PF</Th>
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TOV%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORB%</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {ownBoxscore && oppBoxscore &&
                                                                ownBoxscore.map((ownscore: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{ownscore.season}</Td>
                                                                        <Td>{ownscore.game}</Td>
                                                                        <Td isNumeric>{ownscore.pts}</Td>
                                                                        <Td isNumeric>{ownscore.fga}</Td>
                                                                        <Td isNumeric>{ownscore.fgm}</Td>
                                                                        <Td isNumeric>{ownscore.fgp}</Td>
                                                                        <Td isNumeric>{ownscore.f2gm}</Td>
                                                                        <Td isNumeric>{ownscore.f2ga}</Td>
                                                                        <Td isNumeric>{ownscore.f2gp}</Td>
                                                                        <Td isNumeric>{ownscore.f3gm}</Td>
                                                                        <Td isNumeric>{ownscore.f3ga}</Td>
                                                                        <Td isNumeric>{ownscore.f3gp}</Td>
                                                                        <Td isNumeric>{ownscore.ftm}</Td>
                                                                        <Td isNumeric>{ownscore.fta}</Td>
                                                                        <Td isNumeric>{ownscore.ftp}</Td>
                                                                        <Td isNumeric>{ownscore.orb}</Td>
                                                                        <Td isNumeric>{ownscore.drb}</Td>
                                                                        <Td isNumeric>{ownscore.trb}</Td>
                                                                        <Td isNumeric>{ownscore.ast}</Td>
                                                                        <Td isNumeric>{ownscore.tov}</Td>
                                                                        <Td isNumeric>{ownscore.stl}</Td>
                                                                        <Td isNumeric>{ownscore.blk}</Td>
                                                                        <Td isNumeric>{ownscore.pf}</Td>
                                                                        <Td isNumeric>{ownscore.efg}</Td>
                                                                        <Td isNumeric>{ownscore.tovp}</Td>
                                                                        <Td isNumeric>{ownscore.ftr}</Td>
                                                                        <Td isNumeric>{ownscore.orbp}</Td>
            
                                                            {oppBoxscore[index] && (
                                                                <>
                                                                        <Td isNumeric>{oppBoxscore[index].pts_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fgm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fgp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2gm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2ga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2gp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f3gm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f3ga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f3gp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].ftm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fta_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].ftp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].orb_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].drb_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].trb_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].ast_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].tov_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].stl_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].blk_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].pf_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].efg_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].tovp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].ftr_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].orbp_opp}</Td>
                                                                        </>
                                                                         )}
                                                                    </Tr>
                                                                ))
                                                                }
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>

                                            <div className='pt-5 pb-5'>
                                                <Heading as='h5' size='sm' pb='3'>Player Average Stats</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>#</Th>
                                                                <Th>Name</Th>
                                                                <Th isNumeric>Position</Th>
                                                                <Th isNumeric>HT</Th>
                                                                <Th isNumeric>WT</Th>
                                                                <Th isNumeric>Birth Date</Th>
                                                                <Th isNumeric>Country</Th>
                                                                <Th isNumeric>Type</Th>
                                                                <Th isNumeric>G</Th>
                                                                <Th isNumeric>MIN</Th>
                                                                <Th isNumeric>PTS</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2PA</Th>
                                                                <Th isNumeric>2PM</Th>
                                                                <Th isNumeric>2P%</Th>
                                                                <Th isNumeric>3PA</Th>
                                                                <Th isNumeric>3PM</Th>
                                                                <Th isNumeric>3P%</Th>
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
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TOV%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORB%</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {playerAvgStats &&
                                                                playerAvgStats.map((player: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{player.number}</Td>
                                                                        <Td>{player.player}</Td>
                                                                        <Td isNumeric>{player.position}</Td>
                                                                        <Td isNumeric>{player.height}</Td>
                                                                        <Td isNumeric>{player.weight}</Td>
                                                                        <Td isNumeric>{player.birth_day}</Td>
                                                                        <Td isNumeric>{player.country}</Td>
                                                                        <Td isNumeric>{player.nationality_type}</Td>
                                                                        <Td isNumeric>{player.g}</Td>
                                                                        <Td isNumeric>{player.min}</Td>
                                                                        <Td isNumeric>{player.pts}</Td>
                                                                        <Td isNumeric>{player.fgm}</Td>
                                                                        <Td isNumeric>{player.fga}</Td>
                                                                        <Td isNumeric>{player.fgp}</Td>
                                                                        <Td isNumeric>{player.f2gm}</Td>
                                                                        <Td isNumeric>{player.f2ga}</Td>
                                                                        <Td isNumeric>{player.f2gp}</Td>
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
                                                                        <Td isNumeric>{player.efg}</Td>
                                                                        <Td isNumeric>{player.tovp}</Td>
                                                                        <Td isNumeric>{player.ftr}</Td>
                                                                        <Td isNumeric>{player.orbp}</Td>
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
                                                                <Th>Match Date</Th>
                                                                <Th>H/A</Th>
                                                                <Th isNumeric>Opponent</Th>
                                                                <Th isNumeric>Score</Th>
                                                                <Th isNumeric>DIFF</Th>
                                                                <Th isNumeric>W/L</Th>
                                                                <Th isNumeric>Box Score</Th>
                                                                <Th isNumeric>PACE</Th>
                                                                <Th isNumeric>ORTG</Th>
                                                                <Th isNumeric>DRTG</Th>
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TOV%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORB%</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2FGM</Th>
                                                                <Th isNumeric>2FGA</Th>
                                                                <Th isNumeric>2FG%</Th>
                                                                <Th isNumeric>3FGM</Th>
                                                                <Th isNumeric>3FGA</Th>
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
                                                                <Th isNumeric>F</Th>
                                                                <Th isNumeric>PACE</Th>
                                                                <Th isNumeric>ORTG</Th>
                                                                <Th isNumeric>DRTG</Th>
                                                                <Th isNumeric>eFG%</Th>
                                                                <Th isNumeric>TOV%</Th>
                                                                <Th isNumeric>FTR</Th>
                                                                <Th isNumeric>ORB%</Th>
                                                                <Th isNumeric>FGM</Th>
                                                                <Th isNumeric>FGA</Th>
                                                                <Th isNumeric>FG%</Th>
                                                                <Th isNumeric>2FGM</Th>
                                                                <Th isNumeric>2FGA</Th>
                                                                <Th isNumeric>2FG%</Th>
                                                                <Th isNumeric>3FGM</Th>
                                                                <Th isNumeric>3FGA</Th>
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
                                                                <Th isNumeric>F</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {matchList &&
                                                                matchList.map((match: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{match.match_date}</Td>
                                                                        <Td>{match.home_or_away}</Td>
                                                                        <Td isNumeric>{match.team_opp}</Td>
                                                                        <Td isNumeric>{match.score}</Td>
                                                                        <Td isNumeric>{match.diff}</Td>
                                                                        <Td isNumeric>{match.win_or_lose}</Td>
                                                                        <Td>
                                                                            <Link to="#" >Box Score</Link>
                                                                        </Td>
                                                                        <Td isNumeric>{match.pace}</Td>
                                                                        <Td isNumeric>{match.ortg}</Td>
                                                                        <Td isNumeric>{match.drtg}</Td>
                                                                        <Td isNumeric>{match.efg}</Td>
                                                                        <Td isNumeric>{match.tovp}</Td>
                                                                        <Td isNumeric>{match.ftr}</Td>
                                                                        <Td isNumeric>{match.orbp}</Td>
                                                                        <Td isNumeric>{match.fgm}</Td>
                                                                        <Td isNumeric>{match.fga}</Td>
                                                                        <Td isNumeric>{match.fgp}</Td>
                                                                        <Td isNumeric>{match.f2gm}</Td>
                                                                        <Td isNumeric>{match.f2ga}</Td>
                                                                        <Td isNumeric>{match.f2gp}</Td>
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
                                                                        <Td isNumeric>{match.f}</Td>
                                                                        <Td isNumeric>{match.pace_opp}</Td>
                                                                        <Td isNumeric>{match.ortg_opp}</Td>
                                                                        <Td isNumeric>{match.drtg_opp}</Td>
                                                                        <Td isNumeric>{match.efg_opp}</Td>
                                                                        <Td isNumeric>{match.tovp_opp}</Td>
                                                                        <Td isNumeric>{match.ftr_opp}</Td>
                                                                        <Td isNumeric>{match.orbp_opp}</Td>
                                                                        <Td isNumeric>{match.fgm_opp}</Td>
                                                                        <Td isNumeric>{match.fga_opp}</Td>
                                                                        <Td isNumeric>{match.fgp_opp}</Td>
                                                                        <Td isNumeric>{match.f2gm_opp}</Td>
                                                                        <Td isNumeric>{match.f2ga_opp}</Td>
                                                                        <Td isNumeric>{match.f2gp_opp}</Td>
                                                                        <Td isNumeric>{match.f3gm_opp}</Td>
                                                                        <Td isNumeric>{match.f3ga_opp}</Td>
                                                                        <Td isNumeric>{match.f3gp_opp}</Td>
                                                                        <Td isNumeric>{match.ftm_opp}</Td>
                                                                        <Td isNumeric>{match.fta_opp}</Td>
                                                                        <Td isNumeric>{match.ftp_opp}</Td>
                                                                        <Td isNumeric>{match.orb_opp}</Td>
                                                                        <Td isNumeric>{match.drb_opp}</Td>
                                                                        <Td isNumeric>{match.trb_opp}</Td>
                                                                        <Td isNumeric>{match.ast_opp}</Td>
                                                                        <Td isNumeric>{match.tov_opp}</Td>
                                                                        <Td isNumeric>{match.stl_opp}</Td>
                                                                        <Td isNumeric>{match.blk_opp}</Td>
                                                                        <Td isNumeric>{match.f_opp}</Td>
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

export default TeamSummary