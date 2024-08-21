import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import "bulma/css/bulma.min.css"; // Import Bulma CSS
import "./Dashboard.css";

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1 has-text-centered">
          Welcome, {user.username}
        </h1>
        <div className="box">
          <p className="content">
            This is the dashboard page where you, and only you, can see a
            dashboard of all of your things.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
