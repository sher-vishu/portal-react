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
    HStack
} from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";


const GameSummary = () => {

    const { token, callApi } = useApi();
    const [matchInfo, setMatchInfo] = useState<any>([]);
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

    return (
        <div>
            <Layout />
            <div className='p-4'>
                    {matchInfo && (
                        <div className='mt-5 p-4'>
                            <Heading as='h3' size='lg' pb='2'>{matchInfo.match_name}</Heading>
                            <Text color='#747c83' fontSize='md'>{matchInfo.match_date}</Text>
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
                                        {matchInfo && (
                                            <div>
                                                <Heading as='h5' size='sm' pb='3'>Game Summary</Heading>
                                                <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>Team</Th>
                                                                <Th isNumeric>PTS</Th>
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
                                        )}

                                        <div>
                                        <Heading as='h5' size='sm' pb='3'>Team Advanced</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th>H/A</Th>
                                                            <Th>Team</Th>
                                                            <Th isNumeric>Pace</Th>
                                                            <Th isNumeric>Poss</Th>
                                                            <Th isNumeric>sTOV</Th>
                                                            <Th isNumeric>eFG%</Th>
                                                            <Th isNumeric>TOV%</Th>
                                                            <Th isNumeric>ORB%</Th>
                                                            <Th isNumeric>FT/FGA</Th>
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
                                                                    <Td isNumeric>{hta.tov}</Td>
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
                                                                    <Td isNumeric>{ata.tov}</Td>
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
                                                            <Th>Team</Th>
                                                            <Th isNumeric>FGA</Th>
                                                            <Th isNumeric>FGM</Th>
                                                            <Th isNumeric>FG%</Th>
                                                            <Th isNumeric>2PA</Th>
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
                                                        {homeTeamBasic &&
                                                            homeTeamBasic.map((htb: any) => ((
                                                                <Tr>
                                                                    <Td>{htb.home_or_away}</Td>
                                                                    <Td>{htb.team}</Td>
                                                                    <Td isNumeric>{htb.fga}</Td>
                                                                    <Td isNumeric>{htb.fgm}</Td>
                                                                    <Td isNumeric>{htb.fgp}</Td>
                                                                    {/* <Td isNumeric>{htb}</Td>
                                                                    <Td isNumeric>{htb}</Td>
                                                                    <Td isNumeric>{htb}</Td> */}
                                                                    <Td isNumeric>{htb.paint_f2gm}</Td>
                                                                    <Td isNumeric>{htb.paint_f2ga}</Td>
                                                                    <Td isNumeric>{htb.paint_f2gp}</Td>
                                                                    {/* <Td isNumeric>{homeTeamBasic}</Td>
                                                                    <Td isNumeric>{homeTeamBasic}</Td>
                                                                    <Td isNumeric>{homeTeamBasic}</Td> */}
                                                                    <Td isNumeric>{htb.fga}</Td>
                                                                    <Td isNumeric>{htb.fta}</Td>
                                                                    <Td isNumeric>{htb.ftm}</Td>
                                                                    <Td isNumeric>{htb.ftp}</Td>
                                                                    <Td isNumeric>{htb.orb}</Td>
                                                                    <Td isNumeric>{htb.treb}</Td>
                                                                    <Td isNumeric>{htb.ast}</Td>
                                                                    <Td isNumeric>{htb.tov}</Td>
                                                                    <Td isNumeric>{htb.stl}</Td>
                                                                    <Td isNumeric>{htb.blk}</Td>
                                                                    {/* <Td isNumeric>{htb}</Td>
                                                                    <Td isNumeric>{htb}</Td> */}
                                                                    <Td isNumeric>{htb.fb}</Td>
                                                                </Tr>
                                                            ))
                                                            )}


                                                        {awayTeamBasic && awayTeamBasic.map((atb: any) => ((

                                                            <Tr>
                                                                <Td>{atb.home_or_away}</Td>
                                                                <Td>{atb.team}</Td>
                                                                <Td isNumeric>{atb.fga}</Td>
                                                                <Td isNumeric>{atb.fgm}</Td>
                                                                <Td isNumeric>{atb.fgp}</Td>
                                                                {/* <Td isNumeric>{atb}</Td>
                                                                <Td isNumeric>{atb}</Td>
                                                                <Td isNumeric>{atb}</Td> */}
                                                                <Td isNumeric>{atb.paint_f2gm}</Td>
                                                                <Td isNumeric>{atb.paint_f2ga}</Td>
                                                                <Td isNumeric>{atb.paint_f2gp}</Td>
                                                                {/* <Td isNumeric>{atb}</Td>
                                                                <Td isNumeric>{atb}</Td>
                                                                <Td isNumeric>{atb}</Td> */}
                                                                <Td isNumeric>{atb.fga}</Td>
                                                                <Td isNumeric>{atb.fta}</Td>
                                                                <Td isNumeric>{atb.ftm}</Td>
                                                                <Td isNumeric>{atb.ftp}</Td>
                                                                <Td isNumeric>{atb.orb}</Td>
                                                                <Td isNumeric>{atb.treb}</Td>
                                                                <Td isNumeric>{atb.ast}</Td>
                                                                <Td isNumeric>{atb.tov}</Td>
                                                                <Td isNumeric>{atb.stl}</Td>
                                                                <Td isNumeric >{atb.blk}</Td>
                                                                {/* <Td isNumeric>{atb}</Td>
                                                                <Td isNumeric>{atb}</Td> */}
                                                                <Td isNumeric>{atb.fb}</Td>
                                                            </Tr>
                                                        ))
                                                        )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>

            
               <div className='pt-5 pb-5'>
               <Heading as='h5' size='sm' pb='3'>{matchInfo.team1_name}</Heading>
               <TableContainer>
               <Table size='sm' variant='simple' bgColor='white'>
               <Thead bgColor='#b6bbc4'>
               <Tr>
               <Th>#</Th>
               <Th>Name</Th>
               <Th isNumeric>Starter</Th>
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
               <Th isNumeric>PF</Th>
               </Tr>
               </Thead>
               <Tbody>
               {homePlayerBasic && 
             homePlayerBasic.map((match:any, index: number)=>(
               <Tr key={index}>
                  <Td>{match.no}</Td>  
                  <Td>{match.player}</Td>
                  <Td isNumeric>{match.starter}</Td>
                  <Td isNumeric>{match.min}</Td>
                  <Td isNumeric>{match.pts}</Td>
                  <Td isNumeric>{match.fga}</Td>
                  <Td isNumeric>{match.fgm}</Td>
                  <Td isNumeric>{match.fgp}</Td> 
                  {/* <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>  */}
                  <Td isNumeric>{match.fta}</Td>
                  <Td isNumeric>{match.ftm}</Td>
                  <Td isNumeric>{match.ftp}</Td>
                  <Td isNumeric>{match.orb}</Td>
                  <Td isNumeric>{match.drb}</Td>
                  <Td isNumeric>{match.ast}</Td>
                  <Td isNumeric>{match.tov}</Td>
                  <Td isNumeric>{match.stl}</Td>
                  <Td isNumeric>{match.blk}</Td>
                  <Td isNumeric>{match.pf}</Td>
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
               <Th>Name</Th>
               <Th isNumeric>Starter</Th>
               <Th isNumeric>MIN</Th>
               <Th isNumeric>PTS</Th>
               <Th isNumeric>FGA</Th>
               <Th isNumeric>FGM</Th>
               <Th isNumeric>FG%</Th>
               <Th isNumeric>2PA</Th>
               <Th isNumeric>2PM</Th>
               <Th isNumeric>2P%</Th>
               <Th isNumeric>PaintFGM</Th>
               <Th isNumeric>PaintFGA</Th>
               <Th isNumeric>PaintFG%</Th>
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
               <Th isNumeric>BPts of TO</Th>
               <Th isNumeric>FB Pts</Th>
               <Th isNumeric>PF</Th>
               </Tr>
               </Thead>
               <Tbody>
               {awayPlayerBasic && 
              awayPlayerBasic.map((match: any, index: number) => (
               <Tr key={index}>
                  <Td>{match.no}</Td>  
                  <Td>{match.player}</Td>
                  <Td isNumeric>{match.starter}</Td>
                  <Td isNumeric>{match.min}</Td>
                  <Td isNumeric>{match.pts}</Td>
                  <Td isNumeric>{match.fga}</Td>
                  <Td isNumeric>{match.fgm}</Td>
                  <Td isNumeric>{match.fgp}</Td>
                  {/* <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td>
                  <Td isNumeric>{match}</Td> */}
                  <Td isNumeric>{match.fta}</Td>
                  <Td isNumeric>{match.ftm}</Td>
                  <Td isNumeric>{match.ftp}</Td>
                  <Td isNumeric>{match.orb}</Td>
                  <Td isNumeric>{match.drb}</Td>
                  <Td isNumeric>{match.ast}</Td>
                  <Td isNumeric>{match.tov}</Td>
                  <Td isNumeric>{match.stl}</Td>
                  <Td isNumeric>{match.blk}</Td>
                  <Td isNumeric>{match.pf}</Td>
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