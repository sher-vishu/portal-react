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
  Button,
  chakra 
} from '@chakra-ui/react'
import { 
  setSeason, 
  setPosition,
  setSelectedPlayer,
  filteredDepostaMatch } from "../../features/match/matchDataSlice";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
      useReactTable,
      flexRender,
      getCoreRowModel,
      getSortedRowModel,
      ColumnDef,
      SortingState } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store';
import useApi from "../../services/api.services";
import { useNavigate } from 'react-router-dom';
import { IPlayerRank } from "../../types/player.type";

const columnHelper = createColumnHelper<PlayerRank>();

  type PlayerRank = {
    index: number;
    team_name: string;
    player_name: string;
    game_count: string;
    game_start: string;
    minute_play: string;
    pts: string;
    fgm: string;
    fga: string;
    fgp: string;
    f2gm: string;
    f2ga: string;
    f2gp: string;
    paint_f2gm: string;
    paint_f2ga: string;
    paint_f2gp: string;
    f3gm: string;
    f3ga: string;
    f3gp: string;
    ftm: string;
    fta: string;
    ftp: string;
    orb: string;
    drb: string;
    trb: string;
    ast: string;
    tov: string;
    stl: string;
    blk: string;
    pf: string;
    fb: string;
    pot: string;
};
  
  const columns=[
    columnHelper.accessor("index",{ 
    cell: (info) => (parseInt(info.row.id) + 1).toString(),
    header: "#",
    }),
    columnHelper.accessor("team_name",{ 
    cell: (info) => info.getValue(),
    header: "Team Name",
    }),
    columnHelper.accessor("player_name",{
    cell: (info) => info.getValue(),
    header: "Player Name",
    }),
    columnHelper.accessor("game_count",{
    cell: (info) => info.getValue(),
    header: "Games",
    }),
    columnHelper.accessor("game_start",{
    cell: (info) => info.getValue(),
    header: "GS",
    }),
    columnHelper.accessor("minute_play",{
     cell: (info) => info.getValue(),
     header: "MP",
    }),
    columnHelper.accessor("pts",{
    cell: (info) => info.getValue(),
    header: "PTS",
    }),
    columnHelper.accessor("fgm",{
    cell: (info) => info.getValue(),
    header: "FGM",
    }),
    columnHelper.accessor("fga",{
    cell: (info) => info.getValue(),
    header: "FGA",
    }),
    columnHelper.accessor("fgp",{
    cell: (info) => info.getValue(),
    header: "FG%",
    }),
    columnHelper.accessor("fgp",{
    cell: (info) => info.getValue(),
    header: "FG%",
    }),
    columnHelper.accessor("f2gm",{
    cell: (info) => info.getValue(),
    header: "2PM",
    }),
    columnHelper.accessor("f2ga",{
    cell: (info) => info.getValue(),
    header: "2PA",
    }),
    columnHelper.accessor("f2gp",{
    cell: (info) => info.getValue(),
    header: "2P%",
   }),
   columnHelper.accessor("paint_f2gm",{
    cell: (info) => info.getValue(),
    header: "Paint FGM",
    }),
    columnHelper.accessor("paint_f2ga",{
    cell: (info) => info.getValue(),
    header: "Paint FGA",
    }),
    columnHelper.accessor("paint_f2gp",{
    cell: (info) => info.getValue(),
    header: "Paint FG%",
    }),
    columnHelper.accessor("f3gm",{
    cell: (info) => info.getValue(),
    header: "3PM",
    }),
    columnHelper.accessor("f3ga",{
    cell: (info) => info.getValue(),
    header: "3PA",
    }),
    columnHelper.accessor("f3gp",{
    cell: (info) => info.getValue(),
    header: "3P%",
    }),
    columnHelper.accessor("ftm",{
    cell: (info) => info.getValue(),
    header: "FTM",
    }),
    columnHelper.accessor("fta",{
    cell: (info) => info.getValue(),
    header: "FTA",
    }),
    columnHelper.accessor("ftp",{
    cell: (info) => info.getValue(),
    header: "FTP",
    }),
    columnHelper.accessor("orb",{
    cell: (info) => info.getValue(),
    header: "ORB",
    }),
    columnHelper.accessor("drb",{
    cell: (info) => info.getValue(),
    header: "DRB",
    }),
    columnHelper.accessor("trb",{
    cell: (info) => info.getValue(),
    header: "TRB",
    }),
    columnHelper.accessor("ast",{
    cell: (info) => info.getValue(),
    header: "AST",
    }),
    columnHelper.accessor("tov",{
    cell: (info) => info.getValue(),
    header: "TOV",
    }),
    columnHelper.accessor("stl",{
    cell: (info) => info.getValue(),
    header: "STL",
    }),
    columnHelper.accessor("blk",{
    cell: (info) => info.getValue(),
    header: "BLK",
    }),
    columnHelper.accessor("pf",{
    cell: (info) => info.getValue(),
    header: "PF",
    }),
    columnHelper.accessor("fb",{
    cell: (info) => info.getValue(),
    header: "FB",
    }),
    columnHelper.accessor("pot",{
    cell: (info) => info.getValue(),
    header: "POT",
    }),
  ];


export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>
({ data, 
   columns
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <TableContainer>
    <Table size='sm' variant='simple' bgColor='white'>
      <Thead bgColor='#b6bbc4'>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: any = header.column.columnDef.meta;
              return (
                      <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}>
                      {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                      <chakra.span pl="4">
                          {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                  <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                  <TriangleUpIcon aria-label="sorted ascending" />
                              )
                          ) : null}
                      </chakra.span>
                  </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
    </TableContainer>
  );
}

const PlayerRanking = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const season = useAppSelector((state: RootState) => state.matchData.season);
  const position = useAppSelector((state: RootState) => state.matchData.position);
  const player_id = useAppSelector((state: RootState) => state.matchData.player_id);
  const [playerRank, setPlayerRank] = useState<any>([]);
  const [playerInfo, setPlayerInfo] = useState<any>({});
  const [activeSeason, setActiveSeason] = useState('');
  const [activePosition, setActivePosition] = useState(''); 
  const { token, callApi } = useApi();

  useEffect(() => {
    async function fetchPosition() {
        const params = {
            player_id: player_id,
        };
        try {
            const response = await callApi('/player_season_basic', params);
            setPlayerInfo(response['player_info']);
        } catch (error) {
            console.log('api error')
        }

    }
    fetchPosition();
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
    setActivePosition(selectedPosition);
    dispatch(filteredDepostaMatch());
  };

  const handleLinkClick = (player: IPlayerRank) => {
    dispatch(setSelectedPlayer(player.player_id))
    navigate('/playersummary');
  };


  return (
    <div>
       <Layout />
       <div className='mt-5 p-4 pl-12'>
       <Heading as='h3' size='lg' pb='2'>B League Player Ranking</Heading>
       </div>
       <div className='p-4 pl-12'>
       <HStack spacing='24px' paddingBottom='5'>
            <Text fontSize='md'>Season</Text>
            <Stack direction='row' spacing={2} align='center'>
            <Button 
            bgColor={activeSeason === season ? '#334d80' : 'white'}
            color={activeSeason === season ? 'white' : '#747c83'}
            variant='outline'
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
            
            <HStack spacing='24px'>
            <Text>Position</Text>
            <Stack direction='row' spacing={2} align='center'>
            <Button 
            bgColor={activePosition === position ? '#334d80' : 'white'}
            color={activePosition === position ? 'white' : '#747c83'}
            variant='outline'
            onClick={() => handlePositionClick('PG')}>
              PG
              </Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handlePositionClick('SG')}>SG</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handlePositionClick('SF')}>SF</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handlePositionClick('PF')}>PF</Button>
            <Button color='#747c83' variant='outline' bgColor='white' onClick={() => handlePositionClick('C')}>C</Button>
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
                                            <DataTable data={playerRank} columns={columns} />
                                                {/* <TableContainer>
                                                    <Table size='sm' variant='simple' bgColor='white'>
                                                        <Thead bgColor='#b6bbc4'>
                                                            <Tr>
                                                                <Th>#</Th>
                                                                <Th>TEAM NAME</Th>
                                                                <Th>PLAYER NAME</Th>
                                                                <Th>GAMES</Th>
                                                                <Th>GS</Th>
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
                                                            {playerRank &&
                                                                playerRank.map((rank: any, index: number) => (
                                                                    <Tr key={index}>
                                                                        <Td>{index + 1}</Td>
                                                                        <Td>{rank.team_name}</Td>
                                                                        <Td>
                                                                        <Button 
                                                                        variant='link' 
                                                                        color='blue.500' 
                                                                        size='sm'
                                                                        onClick={() => handleLinkClick(rank)}>
                                                                            {rank.player_name}
                                                                        </Button>
                                                                        </Td>
                                                                        <Td isNumeric>{rank.game_count}</Td>
                                                                        <Td isNumeric>{rank.game_start}</Td>
                                                                        <Td isNumeric>{rank.minute_play}</Td>
                                                                        <Td isNumeric>{rank.pts}</Td>
                                                                        <Td isNumeric>{rank.fgm}</Td>
                                                                        <Td isNumeric>{rank.fga}</Td>
                                                                        <Td isNumeric>{rank.fgp}</Td>
                                                                        <Td isNumeric>{rank.f2gm}</Td>
                                                                        <Td isNumeric>{rank.f2ga}</Td>
                                                                        <Td isNumeric>{rank.f2gp}</Td>
                                                                        <Td isNumeric>{rank.paint_f2gm}</Td>
                                                                        <Td isNumeric>{rank.paint_f2ga}</Td>
                                                                        <Td isNumeric>{rank.paint_f2gp}</Td>
                                                                        <Td isNumeric>{rank.f3gm}</Td>
                                                                        <Td isNumeric>{rank.f3ga}</Td>
                                                                        <Td isNumeric>{rank.f3gp}</Td>
                                                                        <Td isNumeric>{rank.ftm}</Td>
                                                                        <Td isNumeric>{rank.fta}</Td>
                                                                        <Td isNumeric>{rank.ftp}</Td>
                                                                        <Td isNumeric>{rank.orb}</Td>
                                                                        <Td isNumeric>{rank.drb}</Td>
                                                                        <Td isNumeric>{rank.trb}</Td>
                                                                        <Td isNumeric>{rank.ast}</Td>
                                                                        <Td isNumeric>{rank.tov}</Td>
                                                                        <Td isNumeric>{rank.stl}</Td>
                                                                        <Td isNumeric>{rank.blk}</Td>
                                                                        <Td isNumeric>{rank.pf}</Td>
                                                                        <Td isNumeric>{rank.fb}</Td>
                                                                        <Td isNumeric>{rank.pot}</Td>
                                                                    </Tr>
                                                                ))
                                                                }
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer> */}
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
