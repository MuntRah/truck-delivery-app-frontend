import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const DriverDashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the Driver dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default DriverDashboard;
