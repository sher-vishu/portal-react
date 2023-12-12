import FilterComponent from '../../components/calendar';
import Nav from '../../components/nav';
import Layout from '../Layout/index'
import MatchByYmd from '../../components/matchYmd';
import { Divider} from '@chakra-ui/react'

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
      <Layout />
      </header>
      <FilterComponent />
      <Divider borderWidth="1px" orientation="horizontal" color='#c1cfda'/>
      <div className='p-4'>
        <MatchByYmd />
        </div>
    </div>
  );
}

export default Home;