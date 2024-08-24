import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "bulma/css/bulma.min.css"; // Import Bulma CSS

const DriverSignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    driverlicence: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.driverSignup(formData);
      props.setUser(newUserResponse.user);
      navigate("/DriverDashboard");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, driverlicence, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(
      username &&
      driverlicence &&
      password &&
      password === passwordConf
    );
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  <span className="icon is-small">
                    <i className="fas fa-truck"></i>{" "}
                    {/* Use a truck icon for drivers */}
                  </span>
                  <span>Driver Sign Up</span>
                </p>
              </header>
              <div className="card-content">
                <p className="message has-text-centered">{message}</p>
                <form onSubmit={handleSubmit} className="form">
                  <div className="field">
                    <label className="label" htmlFor="username">
                      Username:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        id="username"
                        value={username}
                        name="username"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="driverlicence">
                      Driver Licence #:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        id="driverlicence"
                        value={driverlicence}
                        name="driverlicence"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="password">
                      Password:
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="confirm">
                      Confirm Password:
                    </label>
                    <div className="control">
                      <input
                        type="password"
                        id="confirm"
                        value={passwordConf}
                        name="passwordConf"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-primary"
                        disabled={isFormInvalid()}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="control">
                      <Link to="/DriverDashboard">
                        <button type="button" className="button is-light">
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverSignupForm;
