import { Button } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import './home.scss';

const HomePage = (props) => {

    return (
        <main className="login_main_div pt-30 pb-30">
            <div className="rounded p-30">
                <h1 className="text-center text-white">NTRCA Portal</h1>
                <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aspernatur
                    ea eaque eligendi enim exercitationem facilis iure laborum magnam molestias nemo neque quam ratione
                    reprehenderit sapiente totam, vero voluptate!</p>
                <div className="text-center">
                    <Link to="/login">
                        <Button>Login / Sign UP</Button>
                    </Link>
                </div>
            </div>
        </main>
    )

};

export default HomePage;
