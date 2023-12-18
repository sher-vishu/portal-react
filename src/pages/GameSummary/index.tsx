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
    Spinner
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData(schedule_key: string) {
            const params = {
                schedule_key: schedule_key,
            };
            await new Promise(resolve => setTimeout(resolve, 2000));
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
            }finally {
                setLoading(false);
              }
        } fetchData(schedule_key)
    }, [schedule_key, token]);

    return (
        <div>
            <Layout />
            <div className='p-4'>
            {loading ? (
       <Spinner />
      ) : (
                <>
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
                                                    <Table size='sm' variant='simple' bgColor='white' p='4'>
                                                        <Thead p='4'>
                                                            <Tr>
                                                                <Th p='4'>Team</Th>
                                                                <Th isNumeric p='4'>PTS</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            <Tr>
                                                                <Td p='4'>{matchInfo.team1_name}</Td>
                                                                <Td isNumeric p='4'>{matchInfo.team1_score}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td p='4'>{matchInfo.team2_name}</Td>
                                                                <Td isNumeric p='4'>{matchInfo.team2_score}</Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        )}

                                        <div>
                                        <Heading as='h5' size='sm' pb='3'>Team Advanced</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white' p='4'>
                                                    <Thead p='4' bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th p='4'>H/A</Th>
                                                            <Th p='4'>Team</Th>
                                                            <Th isNumeric p='4'>Pace</Th>
                                                            <Th isNumeric p='4'>Poss</Th>
                                                            <Th isNumeric p='4'>sTOV</Th>
                                                            <Th isNumeric p='4'>eFG%</Th>
                                                            <Th isNumeric p='4'>TOV%</Th>
                                                            <Th isNumeric p='4'>ORB%</Th>
                                                            <Th isNumeric p='4'>FT/FGA</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {homeTeamAdvanced &&
                                                            homeTeamAdvanced.map((hta: any) => ((
                                                                <Tr>
                                                                    <Td p='4'>{hta.home_or_away}</Td>
                                                                    <Td p='4'>{hta.team_self}</Td>
                                                                    <Td isNumeric p='4'>{hta.pace}</Td>
                                                                    <Td isNumeric p='4'>{hta.poss}</Td>
                                                                    <Td isNumeric p='4'>{hta.s_tov}</Td>
                                                                    <Td isNumeric p='4'>{hta.efg}</Td>
                                                                    <Td isNumeric p='4'>{hta.tov}</Td>
                                                                    <Td isNumeric p='4'>{hta.orbp}</Td>
                                                                    <Td isNumeric p='4'>{hta.ftr}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
                                                        {awayTeamAdvanced &&
                                                            awayTeamAdvanced.map((ata: any) => ((
                                                                <Tr>
                                                                    <Td p='4'>{ata.home_or_away}</Td>
                                                                    <Td p='4'>{ata.team_self}</Td>
                                                                    <Td isNumeric p='4'>{ata.pace}</Td>
                                                                    <Td isNumeric p='4'>{ata.poss}</Td>
                                                                    <Td isNumeric p='4'>{ata.s_tov}</Td>
                                                                    <Td isNumeric p='4'>{ata.efg}</Td>
                                                                    <Td isNumeric p='4'>{ata.tov}</Td>
                                                                    <Td isNumeric p='4'>{ata.orbp}</Td>
                                                                    <Td isNumeric p='4'>{ata.ftr}</Td>
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
                                                <Table size='sm' variant='simple' bgColor='white' p='4'>
                                                    <Thead p='4' bgColor='#b6bbc4'>
                                                        <Tr>
                                                            <Th p='4'>H/A</Th>
                                                            <Th p='4'>Team</Th>
                                                            <Th isNumeric p='4'>FGA</Th>
                                                            <Th isNumeric p='4'>FGM</Th>
                                                            <Th isNumeric p='4'>FG%</Th>
                                                            <Th isNumeric p='4'>2PA</Th>
                                                            <Th isNumeric p='4'>2PM</Th>
                                                            <Th isNumeric p='4'>PaintFGM</Th>
                                                            <Th isNumeric p='4'>PaintFGA</Th>
                                                            <Th isNumeric p='4'>PaintFG%</Th>
                                                            <Th isNumeric p='4'>3PA</Th>
                                                            <Th isNumeric p='4'>3PM</Th>
                                                            <Th isNumeric p='4'>3P%</Th>
                                                            <Th isNumeric p='4'>FGA</Th>
                                                            <Th isNumeric p='4'>FTA</Th>
                                                            <Th isNumeric p='4'>FTM</Th>
                                                            <Th isNumeric p='4'>FT%</Th>
                                                            <Th isNumeric p='4'>ORB</Th>
                                                            <Th isNumeric p='4'>TRB</Th>
                                                            <Th isNumeric p='4'>AST</Th>
                                                            <Th isNumeric p='4'>TOV</Th>
                                                            <Th isNumeric p='4'>STL</Th>
                                                            <Th isNumeric p='4'>BLK</Th>
                                                            <Th isNumeric p='4'>PF</Th>
                                                            <Th isNumeric p='4'>Pts of TO</Th>
                                                            <Th isNumeric p='4'>FB Pts</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {homeTeamBasic &&
                                                            homeTeamBasic.map((htb: any) => ((
                                                                <Tr>
                                                                    <Td p='4'>{htb.home_or_away}</Td>
                                                                    <Td p='4'>{htb.team}</Td>
                                                                    <Td isNumeric p='4'>{htb.fga}</Td>
                                                                    <Td isNumeric p='4'>{htb.fgm}</Td>
                                                                    <Td isNumeric p='4'>{htb.fgp}</Td>
                                                                    {/* <Td isNumeric p='4'>{htb}</Td>
                                                                    <Td isNumeric p='4'>{htb}</Td>
                                                                    <Td isNumeric p='4'>{htb}</Td> */}
                                                                    <Td isNumeric p='4'>{htb.paint_f2gm}</Td>
                                                                    <Td isNumeric p='4'>{htb.paint_f2ga}</Td>
                                                                    <Td isNumeric p='4'>{htb.paint_f2gp}</Td>
                                                                    {/* <Td isNumeric p='4'>{homeTeamBasic}</Td>
                                                                    <Td isNumeric p='4'>{homeTeamBasic}</Td>
                                                                    <Td isNumeric p='4'>{homeTeamBasic}</Td> */}
                                                                    <Td isNumeric p='4'>{htb.fga}</Td>
                                                                    <Td isNumeric p='4'>{htb.fta}</Td>
                                                                    <Td isNumeric p='4'>{htb.ftm}</Td>
                                                                    <Td isNumeric p='4'>{htb.ftp}</Td>
                                                                    <Td isNumeric p='4'>{htb.orb}</Td>
                                                                    <Td isNumeric p='4'>{htb.treb}</Td>
                                                                    <Td isNumeric p='4'>{htb.ast}</Td>
                                                                    <Td isNumeric p='4'>{htb.tov}</Td>
                                                                    <Td isNumeric p='4'>{htb.stl}</Td>
                                                                    <Td isNumeric p='4'>{htb.blk}</Td>
                                                                    {/* <Td isNumeric p='4'>{htb}</Td>
                                                                    <Td isNumeric p='4'>{htb}</Td> */}
                                                                    <Td isNumeric p='4'>{htb.fb}</Td>
                                                                </Tr>
                                                            ))
                                                            )}


                                                        {awayTeamBasic && awayTeamBasic.map((atb: any) => ((

                                                            <Tr>
                                                                <Td p='4'>{atb.home_or_away}</Td>
                                                                <Td p='4'>{atb.team}</Td>
                                                                <Td isNumeric p='4'>{atb.fga}</Td>
                                                                <Td isNumeric p='4'>{atb.fgm}</Td>
                                                                <Td isNumeric p='4'>{atb.fgp}</Td>
                                                                {/* <Td isNumeric p='4'>{atb}</Td>
                                                                <Td isNumeric p='4'>{atb}</Td>
                                                                <Td isNumeric p='4'>{atb}</Td> */}
                                                                <Td isNumeric p='4'>{atb.paint_f2gm}</Td>
                                                                <Td isNumeric p='4'>{atb.paint_f2ga}</Td>
                                                                <Td isNumeric p='4'>{atb.paint_f2gp}</Td>
                                                                {/* <Td isNumeric p='4'>{atb}</Td>
                                                                <Td isNumeric p='4'>{atb}</Td>
                                                                <Td isNumeric p='4'>{atb}</Td> */}
                                                                <Td isNumeric p='4'>{atb.fga}</Td>
                                                                <Td isNumeric p='4'>{atb.fta}</Td>
                                                                <Td isNumeric p='4'>{atb.ftm}</Td>
                                                                <Td isNumeric p='4'>{atb.ftp}</Td>
                                                                <Td isNumeric p='4'>{atb.orb}</Td>
                                                                <Td isNumeric p='4'>{atb.treb}</Td>
                                                                <Td isNumeric p='4'>{atb.ast}</Td>
                                                                <Td isNumeric p='4'>{atb.tov}</Td>
                                                                <Td isNumeric p='4'>{atb.stl}</Td>
                                                                <Td isNumeric p='4'>{atb.blk}</Td>
                                                                {/* <Td isNumeric p='4'>{atb}</Td>
                                                                <Td isNumeric p='4'>{atb}</Td> */}
                                                                <Td isNumeric p='4'>{atb.fb}</Td>
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
                </>
      )}
            </div>
        </div>
    )
}

export default GameSummary