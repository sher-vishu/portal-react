import FilterComponent from '../../components/calendar';
import Layout from '../Layout/index'
import ScheduleTable from '../../components/scheduleTable';
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
      <div>
        <ScheduleTable />
        </div>
    </div>
  );
}

export default Home;