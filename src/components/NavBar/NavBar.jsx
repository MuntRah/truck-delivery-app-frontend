import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import 'bulma/css/bulma.min.css'; // Import Bulma CSS

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
          <a className="navbar-item" href="/">
            {/* Your logo or title here */}
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {user ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Welcome, {user.username}</a>
                <div className="navbar-dropdown">
                  <Link to="/" className="navbar-item">Dashboard</Link>

                  {user.driver ? (
                    <>
                      <Link to="/loads" className="navbar-item">Loads</Link>
                      <Link to="/my-loads" className="navbar-item">My Loads</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/orders" className="navbar-item">Orders</Link>
                      <Link to="/orders/new" className="navbar-item">NEW Order</Link>
                    </>
                  )}

                  <hr className="navbar-divider" />
                  <Link to="" onClick={handleSignout} className="navbar-item">
                    Sign Out
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link to="/signin" className="navbar-item">Sign In</Link>
                <Link to="/signup" className="navbar-item">Sign Up</Link>
                <Link to="/driver-signin" className="navbar-item">Driver Sign In</Link>
                <Link to="/driver-signup" className="navbar-item">Driver Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
