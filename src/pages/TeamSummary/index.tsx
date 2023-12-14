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
    HStack
} from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";

const TeamSummary = () => {
    
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
                                    <HStack>
                                        <div>
                                        <Heading as='h5' size='sm' pb='3'>Boxscore</Heading>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead>
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
                                                            <Th isNumeric>Paint FGM</Th>
                                                            <Th isNumeric>Paint FGA</Th>
                                                            <Th isNumeric>Paint FG%</Th>
                                                            <Th isNumeric>3FGM</Th>
                                                            <Th isNumeric>3FGA</Th>
                                                            <Th isNumeric>3FG%</Th>
                                                            <Th isNumeric>FT</Th>
                                                            <Th isNumeric>OR</Th>
                                                            <Th isNumeric>DR</Th>
                                                            <Th isNumeric>TR</Th>
                                                            <Th isNumeric>AST</Th>
                                                            <Th isNumeric>TO</Th>
                                                            <Th isNumeric>STL</Th>
                                                            <Th isNumeric>BLK</Th>
                                                            <Th isNumeric>PF</Th>
                                                            <Th isNumeric>eFG%</Th>
                                                            <Th isNumeric>TO%</Th>
                                                            <Th isNumeric>FTR</Th>
                                                            <Th isNumeric>ORB%</Th>
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
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                        <div className='pt-5 pb-5'>
                                            <TableContainer>
                                                <Table size='sm' variant='simple' bgColor='white'>
                                                    <Thead>
                                                        <Tr>
                                                        <Th>Season</Th>
                                                            <Th>Game</Th>
                                                            <Th isNumeric>PTS</Th>
                                                            <Th isNumeric >FGA</Th>
                                                            <Th isNumeric >FGM</Th>
                                                            <Th isNumeric >FG%</Th>
                                                            <Th isNumeric >2FGM</Th>
                                                            <Th isNumeric >2FGA</Th>
                                                            <Th isNumeric >2FG%</Th>
                                                            <Th isNumeric >Paint FGM</Th>
                                                            <Th isNumeric >Paint FGA</Th>
                                                            <Th isNumeric >Paint FG%</Th>
                                                            <Th isNumeric >3FGM</Th>
                                                            <Th isNumeric >3FGA</Th>
                                                            <Th isNumeric >3FG%</Th>
                                                            <Th isNumeric >FT</Th>
                                                            <Th isNumeric >OR</Th>
                                                            <Th isNumeric >DR</Th>
                                                            <Th isNumeric >TR</Th>
                                                            <Th isNumeric >AST</Th>
                                                            <Th isNumeric >TO</Th>
                                                            <Th isNumeric >STL</Th>
                                                            <Th isNumeric >BLK</Th>
                                                            <Th isNumeric >PF</Th>
                                                            <Th isNumeric >eFG%</Th>
                                                            <Th isNumeric >TO%</Th>
                                                            <Th isNumeric >FTR</Th>
                                                            <Th isNumeric >ORB%</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {homeTeamBasic &&
                                                            homeTeamBasic.map((htb: any) => ((
                                                                <Tr>
                                                                    <Td>{htb.home_or_away}</Td>
                                                                    <Td>{htb.team}</Td>
                                                                    <Td isNumeric >{htb.fga}</Td>
                                                                    <Td isNumeric >{htb.fgm}</Td>
                                                                    <Td isNumeric >{htb.fgp}</Td>
                                                                    {/* <Td isNumeric>{htb}</Td>
                                                                    <Td isNumeric >{htb}</Td>
                                                                    <Td isNumeric >{htb}</Td> */}
                                                                    <Td isNumeric >{htb.paint_f2gm}</Td>
                                                                    <Td isNumeric >{htb.paint_f2ga}</Td>
                                                                    <Td isNumeric >{htb.paint_f2gp}</Td>
                                                                    {/* <Td isNumeric >{homeTeamBasic}</Td>
                                                                    <Td isNumeric >{homeTeamBasic}</Td>
                                                                    <Td isNumeric >{homeTeamBasic}</Td> */}
                                                                    <Td isNumeric >{htb.fga}</Td>
                                                                    <Td isNumeric >{htb.fta}</Td>
                                                                    <Td isNumeric >{htb.ftm}</Td>
                                                                    <Td isNumeric >{htb.ftp}</Td>
                                                                    <Td isNumeric >{htb.orb}</Td>
                                                                    <Td isNumeric >{htb.treb}</Td>
                                                                    <Td isNumeric >{htb.ast}</Td>
                                                                    <Td isNumeric >{htb.tov}</Td>
                                                                    <Td isNumeric >{htb.stl}</Td>
                                                                    <Td isNumeric >{htb.blk}</Td>
                                                                    {/* <Td isNumeric >{htb}</Td>
                                                                    <Td isNumeric >{htb}</Td> */}
                                                                    <Td isNumeric >{htb.fb}</Td>
                                                                </Tr>
                                                            ))
                                                            )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                       </HStack>
            
               <div className='pt-5 pb-5'>
               <Heading as='h5' size='sm' pb='3'>Player Average Stats</Heading>
               <TableContainer>
               <Table size='sm' variant='simple' bgColor='white'>
               <Thead>
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
                <Heading as='h5' size='sm' pb='3'>Match List</Heading>
               <TableContainer>
               <Table size='sm' variant='simple' bgColor='white'>
               <Thead>
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

export default TeamSummary