// core
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark  header-bg">
      <div className="container justify-content-around">
        <Link className="navbar-brand" to={"/"}>
          NTRCA PORTAL
        </Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/register'}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/login'}>Login</Link>
                        </li>
                    </ul>
                </div> */}
      </div>
    </nav>
  );
};

export default Header;
