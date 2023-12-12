// import React, { useEffect } from 'react';
// import Layout from '../Layout/index'
// import { Text, 
//   Tabs, 
//   TabList, 
//   TabPanels, 
//   Tab, 
//   TabPanel, 
//   Card,  
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer, } from '@chakra-ui/react'
// import { useAppSelector, useAppDispatch } from '../../app/hooks'
// import { RootState } from '../../app/store';
// import useApi from "../../services/api.services";


// const GameSummary = () => {

//   const { token, callApi } = useApi();

//   useEffect(() => {
//     async function fetchData(schedule_key: string) {
//       const params = {
//         schedule_key: schedule_key,
//       };
//       try {
//         const response = await callApi('/game_summary', params)
//           console.log(response['match_info'].length);
//           dispatch(setAllMatches(response['match_info']));
//           dispatch(defaultDepostaMatch(response['match_info']));
//           setAllMatchData(response['match_info'])
//         } catch (error) {
//         console.error('Error fetching player data:', error);
//       }
//     } fetchData(schedule_key)
//   }, [schedule_key, token]);

//   return (
//     <div>
//       <Layout />
//       <div>
//       {gameSummary.map((match: any) => {
//        <>
//        <Text as="b">{match.match_name}</Text>
//        <Text color='#747c83'>{match.match_date}</Text>
//        <div>
//           <Tabs variant='enclosed'>
//             <TabList>
//               <Tab>Basic</Tab>
//               <Tab>Synergy</Tab>
//               <Tab>Line up</Tab>
//               <Tab>Original</Tab>
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                <Card>
//                <Text>Game Summary</Text>
//                <TableContainer>
//                <Table size='sm'>
//                <Thead>
//                <Tr>
//                <Th>Team</Th>
//                <Th isNumeric>PTS</Th>
//                </Tr>
//                </Thead>
//                <Tbody>
//                <Tr>
//                   <Td>{match.team1_name}</Td>
//                   <Td isNumeric>25.4</Td>
//                </Tr>
//                <Tr>
//                   <Td>{match.team2_name}</Td>
//                   <Td isNumeric>30.48</Td>
//                </Tr>
//                </Tbody>
//                </Table>
//                </TableContainer>
//                </Card>
//               </TabPanel>
//               <TabPanel>
//                 <Card>

//                 </Card>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </div>
//         </>
//       })}
//      </div>
//     </div>
//   )
// }

// export default GameSummary

import React from 'react'

 const GameSummary = () => {
  return (
    <div>index</div>
  )
}

export default GameSummary