import { useState, useEffect } from 'react';
import Layout from '../Layout/index'
import {
    Text,
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
    Button
} from '@chakra-ui/react'
import { setSelectedPlayer } from "../../features/match/matchDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import { useNavigate } from 'react-router-dom';
import { IPlayerRank } from "../../types/player.type";


const GameSummary = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token, callApi } = useApi();
    const [matchInfo, setMatchInfo] = useState<any>({});
    const [homeTeamAdvanced, setHomeTeamAdvanced] = useState<any>([]);
    const [awayTeamAdvanced, setAwayTeamAdvanced] = useState<any>([]);
    const [homeTeamBasic, setHomeTeamBasic] = useState([]);
    const [awayTeamBasic, setAwayTeamBasic] = useState([]);
    const [homePlayerBasic, setHomePlayerBasic] = useState([]);
    const [awayPlayerBasic, setAwayPlayerBasic] = useState([]);
    const schedule_key = useAppSelector((state: RootState) => state.matchData.schedule_key);

    useEffect(() => {
        async function fetchData(schedule_key: string) {
            const params = {
                schedule_key: schedule_key,
            };
            try {
                const response = await callApi('/game_summary', params)
                setMatchInfo(response['match_info']);
                setHomeTeamAdvanced(response['home_team_advanced']);
                setAwayTeamAdvanced(response['away_team_advanced']);
                setHomeTeamBasic(response['home_team_basic']);
                setAwayTeamBasic(response['away_team_basic']);
                setHomePlayerBasic(response['home_player_basic']);
                setAwayPlayerBasic(response['away_player_basic']);
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        } fetchData(schedule_key)
    }, [schedule_key, token]);

    const handlePlayerLinkClick = (player: IPlayerRank) => {
        dispatch(setSelectedPlayer(player.player_id))
        navigate('/playersummary');
      };

    return (
        <div>
            <Layout />
            <div className='p-4'>
                        <div className='mt-5 p-4'>
                            <Heading as='h3' size='lg' pb='2'>{matchInfo.match_name}</Heading>
                            <Text color='#747c83' fontSize='md'>{matchInfo.match_date}</Text>
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
                                    <HStack spacing='54px'>
                                            <div>
                                                <Heading as='h5' size='sm' pb='3'>Game Summary</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>Team</Th>
                                                                <Th>PTS</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>{matchInfo.team1_name}</Td>
                                                                <Td isNumeric>{matchInfo.team1_score}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>{matchInfo.team2_name}</Td>
                                                                <Td isNumeric>{matchInfo.team2_score}</Td>
                                                            </Tr> 
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>

                                        <div>
                                        <Heading as='h5' size='sm' pb='3'>Team Advanced</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>H/A</Th>
                                                            <Th>TEAM</Th>
                                                            <Th>PACE</Th>
                                                            <Th>POSS</Th>
                                                            <Th>sTOV</Th>
                                                            <Th>eFG%</Th>
                                                            <Th>TOV%</Th>
                                                            <Th>ORB%</Th>
                                                            <Th>FTR</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {homeTeamAdvanced &&
                                                            homeTeamAdvanced.map((hta: any) => ((
                                                                <Tr>
                                                                    <Td>{hta.home_or_away}</Td>
                                                                    <Td>{hta.team_self}</Td>
                                                                    <Td isNumeric>{hta.pace}</Td>
                                                                    <Td isNumeric>{hta.poss}</Td>
                                                                    <Td isNumeric>{hta.s_tov}</Td>
                                                                    <Td isNumeric>{hta.efg}</Td>
                                                                    <Td isNumeric>{hta.tovp}</Td>
                                                                    <Td isNumeric>{hta.orbp}</Td>
                                                                    <Td isNumeric>{hta.ftr}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
                                                        {awayTeamAdvanced &&
                                                            awayTeamAdvanced.map((ata: any) => ((
                                                                <Tr>
                                                                    <Td>{ata.home_or_away}</Td>
                                                                    <Td>{ata.team_self}</Td>
                                                                    <Td isNumeric>{ata.pace}</Td>
                                                                    <Td isNumeric>{ata.poss}</Td>
                                                                    <Td isNumeric>{ata.s_tov}</Td>
                                                                    <Td isNumeric>{ata.efg}</Td>
                                                                    <Td isNumeric>{ata.tovp}</Td>
                                                                    <Td isNumeric>{ata.orbp}</Td>
                                                                    <Td isNumeric>{ata.ftr}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                      </HStack>

                                        <div className='pt-5 pb-5'>
                                        <Heading as='h5' size='sm' pb='3'>Team Comparison</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>H/A</Th>
                                                            <Th>TEAM</Th>
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
                                                        {homeTeamBasic &&
                                                            homeTeamBasic.map((htb: any) => ((
                                                                <Tr>
                                                                    <Td>{htb.home_or_away}</Td>
                                                                    <Td>{htb.team}</Td>
                                                                    <Td isNumeric>{htb.fgm}</Td>
                                                                    <Td isNumeric>{htb.fga}</Td>
                                                                    <Td isNumeric>{htb.fgp}</Td>
                                                                    <Td isNumeric>{htb.f2gm}</Td>
                                                                    <Td isNumeric>{htb.f2ga}</Td>
                                                                    <Td isNumeric>{htb.f2gp}</Td>
                                                                    <Td isNumeric>{htb.paint_f2gm}</Td>
                                                                    <Td isNumeric>{htb.paint_f2ga}</Td>
                                                                    <Td isNumeric>{htb.paint_f2gp}</Td>
                                                                    <Td isNumeric>{htb.f3gm}</Td>
                                                                    <Td isNumeric>{htb.f3ga}</Td>
                                                                    <Td isNumeric>{htb.f3gp}</Td>
                                                                    <Td isNumeric>{htb.ftm}</Td>
                                                                    <Td isNumeric>{htb.fta}</Td>
                                                                    <Td isNumeric>{htb.ftp}</Td>
                                                                    <Td isNumeric>{htb.orb}</Td>
                                                                    <Td isNumeric>{htb.treb}</Td>
                                                                    <Td isNumeric>{htb.ast}</Td>
                                                                    <Td isNumeric>{htb.tov}</Td>
                                                                    <Td isNumeric>{htb.stl}</Td>
                                                                    <Td isNumeric>{htb.blk}</Td>
                                                                    <Td isNumeric>{htb.f}</Td>
                                                                    <Td isNumeric>{htb.fb}</Td>
                                                                    <Td isNumeric>{htb.pot}</Td>
                                                                </Tr>
                                                            ))
                                                            )}


                                                        {awayTeamBasic && awayTeamBasic.map((atb: any) => ((

                                                            <Tr>
                                                                <Td>{atb.home_or_away}</Td>
                                                                <Td>{atb.team}</Td>
                                                                <Td isNumeric>{atb.fgm}</Td>
                                                                <Td isNumeric>{atb.fga}</Td>
                                                                <Td isNumeric>{atb.fgp}</Td>
                                                                <Td isNumeric>{atb.f2gm}</Td>
                                                                <Td isNumeric>{atb.f2ga}</Td>
                                                                <Td isNumeric>{atb.f2gp}</Td>
                                                                <Td isNumeric>{atb.paint_f2gm}</Td>
                                                                <Td isNumeric>{atb.paint_f2ga}</Td>
                                                                <Td isNumeric>{atb.paint_f2gp}</Td>
                                                                <Td isNumeric>{atb.f3gm}</Td>
                                                                <Td isNumeric>{atb.f3ga}</Td>
                                                                <Td isNumeric>{atb.f3gp}</Td>
                                                                <Td isNumeric>{atb.ftm}</Td>
                                                                <Td isNumeric>{atb.fta}</Td>
                                                                <Td isNumeric>{atb.ftp}</Td>
                                                                <Td isNumeric>{atb.orb}</Td>
                                                                <Td isNumeric>{atb.treb}</Td>
                                                                <Td isNumeric>{atb.ast}</Td>
                                                                <Td isNumeric>{atb.tov}</Td>
                                                                <Td isNumeric>{atb.stl}</Td>
                                                                <Td isNumeric >{atb.blk}</Td>
                                                                <Td isNumeric>{atb.f}</Td>
                                                                <Td isNumeric>{atb.fb}</Td>
                                                                <Td isNumeric>{atb.pot}</Td>
                                                            </Tr>
                                                        ))
                                                        )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>

            
               <div className='pt-5 pb-5'>
               <Heading as='h5' size='sm' pb='3'>{matchInfo.team1_name} Boxscore</Heading>
               <TableContainer>
               <Table size='sm' variant='simple' bgColor='white'>
               <Thead bgColor='#b6bbc4'>
               <Tr>
               <Th>#</Th>
               <Th>PLAYER NAME</Th>
               <Th>STARTER</Th>
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
               <Th>FB</Th>
               <Th>POT</Th>
               </Tr>
               </Thead>
               <Tbody>
               {homePlayerBasic && 
             homePlayerBasic.map((player:any, index: number)=>(
               <Tr key={index}>
                  <Td>{player.no}</Td>  
                  <Td>
                  <Button 
                    variant='link' 
                    color='blue.500' 
                    onClick={() => handlePlayerLinkClick(player)}>
                    {player.player}
                  </Button>
                  </Td>
                  <Td isNumeric>{player.starter}</Td>
                  <Td isNumeric>{player.min}</Td>
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
                  <Td isNumeric>{player.fb}</Td>
                  <Td isNumeric>{player.pot}</Td>
               </Tr>
                ))}
               </Tbody>
               </Table>
               </TableContainer>
               </div>
              
              <div className='pt-5 pb-5'>
                <Heading as='h5' size='sm' pb='3'>{matchInfo.team2_name} Boxscore</Heading>
               <TableContainer>
               <Table size='sm' variant='simple' bgColor='white'>
               <Thead bgColor='#b6bbc4'>
               <Tr>
               <Th>#</Th>
               <Th>PLAYER NAME</Th>
               <Th>STARTER</Th>
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
               <Th>FB</Th>
               <Th>POT</Th>
               </Tr>
               </Thead>
               <Tbody>
               {awayPlayerBasic && 
              awayPlayerBasic.map((match: any, index: number) => (
               <Tr key={index}>
                  <Td>{match.no}</Td>  
                  <Td>
                  <Button 
                    variant='link' 
                    color='blue.500' 
                    onClick={() => handlePlayerLinkClick(match)}>
                   {match.player}
                  </Button>
                  </Td>
                  <Td isNumeric>{match.starter}</Td>
                  <Td isNumeric>{match.min}</Td>
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

export default GameSummary