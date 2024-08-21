import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "bulma/css/bulma.min.css"; // Import Bulma CSS

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
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
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Log In</span>
                </p>
              </header>
              <div className="card-content">
                <p className="message has-text-centered">{message}</p>
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="form"
                >
                  <div className="field">
                    <label className="label" htmlFor="username">
                      Username:
                    </label>
                    <div className="control">
                      <input
                        type="text"
                        autoComplete="off"
                        id="username"
                        value={formData.username}
                        name="username"
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
                        autoComplete="off"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button type="submit" className="button is-primary">
                        Log In
                      </button>
                    </div>
                    <div className="control">
                      <Link to="/">
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

export default SigninForm;
