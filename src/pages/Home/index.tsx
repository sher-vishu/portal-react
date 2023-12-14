import FilterComponent from '../../components/calendar';
import Layout from '../Layout/index'
import MatchByYmd from '../../components/matchYmd';
import { Divider} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { isLoading, error: authError } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
    return <div>Error: {authError.message}</div>;
  }
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