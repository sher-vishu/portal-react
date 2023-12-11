import FilterComponent from '../components/calendar';
import Nav from '../components/nav';
import MatchByYmd from '../components/matchYmd';
import { Divider} from '@chakra-ui/react'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
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