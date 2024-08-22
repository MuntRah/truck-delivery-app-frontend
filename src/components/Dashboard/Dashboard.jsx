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
          <p id="para" className="content">
            This truck delivery website allows you to easily get a rate before placing an order and track the status of all your orders in real-time. Your personalized dashboard is being designed to give you full control over your orders, ensuring a seamless experience every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
