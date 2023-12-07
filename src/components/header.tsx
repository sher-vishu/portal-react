import { useState, useEffect } from 'react';
import { Card, Select } from '@chakra-ui/react'
import { setSeason, setMonth, setTeam, setFilteredMatch, setAllMatches } from "../features/match/matchDataSlice";
import MatchList from './matchList';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';
import useApi from "../services/api.services";

const HeaderComponent = () => {

  const dispatch = useAppDispatch();
  const season = useAppSelector((state: RootState) => state.matchData.season);
  const month = useAppSelector((state: RootState) => state.matchData.month);
  const team = useAppSelector((state: RootState) => state.matchData.team);
  let [depostaMatches, setDepostaMatches] = useState([])

  const { token, callApi } = useApi();

  useEffect(() => {
      async function fetchData(season: string) {
        const params = {
          season: season,
        };
        try {
          const response = await callApi('/match_list', params)
            console.log(response['match_data'].length);
            dispatch(setAllMatches(response['match_data']));
          } catch (error) {
          console.error('Error fetching player data:', error);
        }
      } fetchData(season)
    }, [season, token]);

  const handleSeasonChange = (event: any) => {
    dispatch(setSeason(event.target.value));
    dispatch(setMonth('12'));
    dispatch(setTeam('all'));
    };

  const handleMonthChange = (event: any) => {
    dispatch(setMonth(event.target.value));
    dispatch(setTeam('all'));
  };

  const handleTeamChange = (event: any) => {
    dispatch(setTeam(event.target.value));
  };


  useEffect(() => {
    filteredMatchList();
  }, [team, month]);

  function filteredMatchList() {
    var teamMatch = depostaMatches.filter((match: any) => {

      if (month !== 'All') {
        if (match.month !== month) {
          return false
        }
      }
      if (team !== 'All' || team === null) {
        if (match.team_name !== team) {
          return false
        }
      }

      return true
    });
    console.log('Match:', teamMatch)
    dispatch(setFilteredMatch(teamMatch))
  }


  return (
    <div>
      <div>
        <Card>
          <div className=' pl-5 pr-5 p-4 grid md:grid-cols-9 grid-cols-1 gap-4'>

            {/* Season */}
            <Select
              value={season}
              onChange={handleSeasonChange}
              placeholder='Select Season'>
              <option value='2022-23'>2023-24</option>
              <option value='2021-22'>2022-23</option>
              <option value='2020-21'>2021-22</option>
              <option value='2019-20'>2020-21</option>
              <option value='2018-19'>2019-20</option>
              <option value='2017-18'>2018-19</option>
            </Select>

             {/* Month */}
            <Select
              value={month}
              onChange={handleMonthChange}
              placeholder='Select Month'>
              <option value="12">December</option>
              <option value="11">November</option>
              <option value="10">October</option>
              <option value="09">September</option>
              <option value="08">August</option>
              <option value="07">July</option>
              <option value="06">June</option>
              <option value="05">May</option>
              <option value="04">April</option>
              <option value="03">March</option>
              <option value="02">February</option>
              <option value="01">January</option>
            </Select>

             {/* Team render */}
            <Select
              value={team}
              onChange={handleTeamChange}
              placeholder='All'>
              <option value="9361">Akita Northern Happinets</option>
              <option value="10887">Alvark Tokyo</option>
              <option value="9010">Chiba Jets</option>
              <option value="10886">Fighting Eagles Nagoya</option>
              <option value="9769">Gunma Crane Thunders</option>
              <option value="9808">Hiroshima Dragonflies</option>
              <option value="16684">Ibaraki Robots</option>
              <option value="10881">Kawasaki Brave Thunders</option>
              <option value="10109">Kyoto Hannaryz</option>
              <option value="11608">Levanga Hokkaido</option>
              <option value="152977">Nagasaki Velca</option>
              <option value="11609">Nagoya Diamond Dolphins</option>
              <option value="10411">Osaka Evessa</option>
              <option value="11832">Ryukyu Golden Kings</option>
              <option value="136842">SAN-EN NeoPhoenix</option>
              <option value="12176">Saga Ballooners</option>
              <option value="11606">SeaHorses Mikawa</option>
              <option value="10641">Sendai 89ers</option>
              <option value="66231">Shimane Susanoo Magic</option>
              <option value="16683">Shinshu Brave Warriors</option>
              <option value="9810">SunRockers Shibuya</option>
              <option value="10885">Toyama Grouses</option>
              <option value="11607">Utsunomiya Brex</option>
              <option value="11831">Yokohama BC</option>
            </Select>
          </div>
        </Card>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
           <MatchList /> 
        </div>
    </div>
  );
};

export default HeaderComponent;