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
    Button
} from '@chakra-ui/react'
import { setSelectedPlayer, setSelectedTeam, setScheduleKey } from "../../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import { useNavigate } from 'react-router-dom';
import { IPlayerRank } from "../../types/player.type";
import { ITeamData } from '../../types/team.type';

const TeamSummary = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token, callApi } = useApi();
    const [ownBoxscore, setOwnBoxscore] = useState<any>([]);
    const [teamSeasonBasicName, setTeamSeasonBasicName] = useState<string>('');
    const [oppBoxscore, setOppBoxscore] = useState<any>([]);
    const [playerAvgStats, setPlayerAvgStats] = useState<any>([]);
    const [matchList, setMatchList] = useState<any>([]);
    const team_id = useAppSelector((state: RootState) => state.matchData.selectedTeam.team_id);
    const season = useAppSelector((state: RootState) => state.matchData.season);

    useEffect(() => {
        async function fetchOwnBoxscore() {
            const params = {
                team_id: team_id,
            };
            try {
                const response = await callApi('/team_season_basic', params);
                setOwnBoxscore(response['team_season_basic']);
                setTeamSeasonBasicName(response['team_name']);
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

    const handlePlayerLinkClick = (player: IPlayerRank) => {
        dispatch(setSelectedPlayer(player.player_id))
        navigate('/playersummary');
      };

    const handleTeamLinkClick = (team: any) => {
        dispatch(setSelectedTeam(team))
        navigate('/teamsummary');
      };

    const handleBoxscoreClick = (team: any) => {
        dispatch(setScheduleKey(team.schedule_key))
        navigate('/gamesummary');
      };

      const headers = ['PTS', 'FGM', 'FGA', 'FG%', '2PM', '2PA', '2P%', 'Paint FGM', 'Paint FGA', 
      'Paint FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FTP', 'ORB', 'DRB', 'TRB', 'AST', 'TOV', 'STL', 'BLK', 'PF',
      'FB', 'POT', 'eFG%', 'TOV%', 'FTR', 'ORB%']; 

      const matchList_headers = ['PACE', 'ORTG', 'DRTG', 'FGM', 'FGA', 'FG%', '2FGM', '2FGA', '2FG%', 'Paint FGM',
      'Paint FGA', 'Paint FG%', '3FGM', '3FGA', '3FG%', 'FTM', 'FTA', 'FT%', 'ORB', 'DRB','TRB', 'AST', 'TOV', 'STL', 
      'BLK', 'PF', 'FB', 'POT', 'eFG%', 'TOV%', 'FTR', 'ORB%'];

    return (
        <div>
            <Layout />
            <div className='p-4'>
                            <div className='mt-5 p-4'>
                                <Heading as='h3' size='lg' pb='2'>{teamSeasonBasicName}</Heading>
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
                                                <Heading as='h5' size='sm' pb='3'>Boxscore</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th></Th>
                                                                <Th colSpan={headers.length + 1}>OWN</Th>
                                                                <Th colSpan={headers.length + 1}>OPP</Th>
                                                            </Tr>
                                                            <Tr>
                                                                <Th>SEASON</Th>
                                                                <Th>GAME</Th>
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
                                                                <Th>FTP</Th>
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
                                                                <Th>eFG%</Th>
                                                                <Th>TOV%</Th>
                                                                <Th>FTR</Th>
                                                                <Th>ORB%</Th>
                                                                {headers.map((header, index) => (
                                                                <Th key={index}>{header}</Th>
                                                                 ))}
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {ownBoxscore && oppBoxscore &&
                                                                ownBoxscore.map((ownscore: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{ownscore.season}</Td>
                                                                        <Td>{ownscore.game}</Td>
                                                                        <Td isNumeric>{ownscore.pts}</Td>
                                                                        <Td isNumeric>{ownscore.fgm}</Td>
                                                                        <Td isNumeric>{ownscore.fga}</Td>
                                                                        <Td isNumeric>{ownscore.fgp}</Td>
                                                                        <Td isNumeric>{ownscore.f2gm}</Td>
                                                                        <Td isNumeric>{ownscore.f2ga}</Td>
                                                                        <Td isNumeric>{ownscore.f2gp}</Td>
                                                                        <Td isNumeric>{ownscore.paint_f2gm}</Td>
                                                                        <Td isNumeric>{ownscore.paint_f2ga}</Td>
                                                                        <Td isNumeric>{ownscore.paint_f2gp}</Td>
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
                                                                        <Td isNumeric>{ownscore.fb}</Td>
                                                                        <Td isNumeric>{ownscore.pot}</Td>
                                                                        <Td isNumeric>{ownscore.efg}</Td>
                                                                        <Td isNumeric>{ownscore.tovp}</Td>
                                                                        <Td isNumeric>{ownscore.ftr}</Td>
                                                                        <Td isNumeric>{ownscore.orbp}</Td>
            
                                                            {oppBoxscore[index] && (
                                                                <>
                                                                        <Td isNumeric>{oppBoxscore[index].pts_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fgm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].fgp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2gm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2ga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].f2gp_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].paint_f2gm_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].paint_f2ga_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].paint_f2gp_opp}</Td>
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
                                                                        <Td isNumeric>{oppBoxscore[index].fb_opp}</Td>
                                                                        <Td isNumeric>{oppBoxscore[index].pot_opp}</Td>
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
                                                                <Th>NAME</Th>
                                                                <Th>POSITION</Th>
                                                                <Th>HT</Th>
                                                                <Th>WT</Th>
                                                                <Th>BIRTH DATE</Th>
                                                                <Th>COUNTRY</Th>
                                                                <Th>TYPE</Th>
                                                                <Th>G</Th>
                                                                <Th>MIN</Th>
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
                                                                <Th>eFG%</Th>
                                                                <Th>TOV%</Th>
                                                                <Th>FTR</Th>
                                                                <Th>ORB%</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {playerAvgStats &&
                                                                playerAvgStats.map((player: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{player.number}</Td>
                                                                        <Td>
                                                                        <Button 
                                                                        variant='link' 
                                                                        color='blue.500' 
                                                                        onClick={() => handlePlayerLinkClick(player)}>
                                                                            {player.player}
                                                                        </Button>
                                                                        </Td>
                                                                        <Td>{player.position}</Td>
                                                                        <Td>{player.height}</Td>
                                                                        <Td>{player.weight}</Td>
                                                                        <Td isNumeric>{player.birth_day}</Td>
                                                                        <Td>{player.country}</Td>
                                                                        <Td>{player.nationality_type}</Td>
                                                                        <Td isNumeric>{player.g}</Td>
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
                                                                <Th></Th>
                                                                <Th colSpan={matchList_headers.length + 6}>OWN</Th>
                                                                <Th colSpan={matchList_headers.length + 5}>OPP</Th>
                                                            </Tr>
                                                            <Tr>
                                                                <Th>MATCH DATE</Th>
                                                                <Th>H/A</Th>
                                                                <Th>OPPONENT</Th>
                                                                <Th>SCORE</Th>
                                                                <Th>DIFF</Th>
                                                                <Th>W/L</Th>
                                                                <Th>BOX SCORE</Th>
                                                                <Th>PACE</Th>
                                                                <Th>ORTG</Th>
                                                                <Th>DRTG</Th>
                                                                <Th>FGM</Th>
                                                                <Th>FGA</Th>
                                                                <Th>FG%</Th>
                                                                <Th>2FGM</Th>
                                                                <Th>2FGA</Th>
                                                                <Th>2FG%</Th>
                                                                <Th>Paint FGM</Th>
                                                                <Th>Paint FGA</Th>
                                                                <Th>Paint FG%</Th>
                                                                <Th>3FGM</Th>
                                                                <Th>3FGA</Th>
                                                                <Th>3FG%</Th>
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
                                                                <Th>eFG%</Th>
                                                                <Th>TOV%</Th>
                                                                <Th>FTR</Th>
                                                                <Th>ORB%</Th>
                                                                {matchList_headers.map((header, index) => (
                                                                <Th key={index}>{header}</Th>
                                                                 ))}
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {matchList &&
                                                                matchList.map((team: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{team.match_date}</Td>
                                                                        <Td>{team.home_or_away}</Td>
                                                                        <Td>
                                                                        <Button 
                                                                        variant='link' 
                                                                        color='blue.500' 
                                                                        onClick={() => handleTeamLinkClick(team)}>
                                                                            {team.team_opp}
                                                                        </Button>
                                                                        </Td>
                                                                        <Td isNumeric>{team.score}</Td>
                                                                        <Td isNumeric>{team.diff}</Td>
                                                                        <Td>{team.win_or_lose}</Td>
                                                                        <Td>
                                                                        <Button 
                                                                        variant='link' 
                                                                        color='blue.500' 
                                                                        onClick={() => handleBoxscoreClick(team)}>
                                                                            Box Score
                                                                        </Button>
                                                                        </Td>
                                                                        <Td isNumeric>{team.pace}</Td>
                                                                        <Td isNumeric>{team.ortg}</Td>
                                                                        <Td isNumeric>{team.drtg}</Td>
                                                                        <Td isNumeric>{team.fgm}</Td>
                                                                        <Td isNumeric>{team.fga}</Td>
                                                                        <Td isNumeric>{team.fgp}</Td>
                                                                        <Td isNumeric>{team.f2gm}</Td>
                                                                        <Td isNumeric>{team.f2ga}</Td>
                                                                        <Td isNumeric>{team.f2gp}</Td>
                                                                        <Td isNumeric>{team.paint_f2gm}</Td>
                                                                        <Td isNumeric>{team.paint_f2ga}</Td>
                                                                        <Td isNumeric>{team.paint_f2gp}</Td>
                                                                        <Td isNumeric>{team.f3gm}</Td>
                                                                        <Td isNumeric>{team.f3ga}</Td>
                                                                        <Td isNumeric>{team.f3gp}</Td>
                                                                        <Td isNumeric>{team.ftm}</Td>
                                                                        <Td isNumeric>{team.fta}</Td>
                                                                        <Td isNumeric>{team.ftp}</Td>
                                                                        <Td isNumeric>{team.orb}</Td>
                                                                        <Td isNumeric>{team.drb}</Td>
                                                                        <Td isNumeric>{team.trb}</Td>
                                                                        <Td isNumeric>{team.ast}</Td>
                                                                        <Td isNumeric>{team.tov}</Td>
                                                                        <Td isNumeric>{team.stl}</Td>
                                                                        <Td isNumeric>{team.blk}</Td>
                                                                        <Td isNumeric>{team.f}</Td>
                                                                        <Td isNumeric>{team.fb}</Td>
                                                                        <Td isNumeric>{team.pot}</Td>
                                                                        <Td isNumeric>{team.efg}</Td>
                                                                        <Td isNumeric>{team.tovp}</Td>
                                                                        <Td isNumeric>{team.ftr}</Td>
                                                                        <Td isNumeric>{team.orbp}</Td>
                                                                        <Td isNumeric>{team.pace_opp}</Td>
                                                                        <Td isNumeric>{team.ortg_opp}</Td>
                                                                        <Td isNumeric>{team.drtg_opp}</Td>
                                                                        <Td isNumeric>{team.fgm_opp}</Td>
                                                                        <Td isNumeric>{team.fga_opp}</Td>
                                                                        <Td isNumeric>{team.fgp_opp}</Td>
                                                                        <Td isNumeric>{team.f2gm_opp}</Td>
                                                                        <Td isNumeric>{team.f2ga_opp}</Td>
                                                                        <Td isNumeric>{team.f2gp_opp}</Td>
                                                                        <Td isNumeric>{team.paint_f2ga_opp}</Td>
                                                                        <Td isNumeric>{team.paint_f2gm_opp}</Td>
                                                                        <Td isNumeric>{team.paint_f2gp_opp}</Td>
                                                                        <Td isNumeric>{team.f3gm_opp}</Td>
                                                                        <Td isNumeric>{team.f3ga_opp}</Td>
                                                                        <Td isNumeric>{team.f3gp_opp}</Td>
                                                                        <Td isNumeric>{team.ftm_opp}</Td>
                                                                        <Td isNumeric>{team.fta_opp}</Td>
                                                                        <Td isNumeric>{team.ftp_opp}</Td>
                                                                        <Td isNumeric>{team.orb_opp}</Td>
                                                                        <Td isNumeric>{team.drb_opp}</Td>
                                                                        <Td isNumeric>{team.trb_opp}</Td>
                                                                        <Td isNumeric>{team.ast_opp}</Td>
                                                                        <Td isNumeric>{team.tov_opp}</Td>
                                                                        <Td isNumeric>{team.stl_opp}</Td>
                                                                        <Td isNumeric>{team.blk_opp}</Td>
                                                                        <Td isNumeric>{team.f_opp}</Td>
                                                                        <Td isNumeric>{team.fb_opp}</Td>
                                                                        <Td isNumeric>{team.pot_opp}</Td>
                                                                        <Td isNumeric>{team.efg_opp}</Td>
                                                                        <Td isNumeric>{team.tovp_opp}</Td>
                                                                        <Td isNumeric>{team.ftr_opp}</Td>
                                                                        <Td isNumeric>{team.orbp_opp}</Td>
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