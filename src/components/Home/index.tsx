import * as React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import FAQ from '../FAQ';
import { getFullUrl } from '../App';
import './Home.css';

const drawText = 'This is for you who have drawn 20 creatureCards without drawing your infamous two card combo.' +
    ' \"What are the odds?\" you mumble to yourself. Do you really want to know?';
const pingText = 'You played hellfire, didn\'t you? Nine separate random damage instances and every single one hit ' +
    'the same target with three available targets on the board. Is it even possible? Ask no more!';

export const Home = () => (
    <div>
        <div className="card-deck">
            <Card className="home-card">
                <CardBody>
                    <CardTitle>Draw Probability</CardTitle>
                    <hr />
                    <CardText>{drawText}</CardText>
                    <Link to={getFullUrl('/draw')} className="btn btn-danger">Get Angry</Link>
                </CardBody>
            </Card>
            <Card className="home-card">
                <CardBody>
                    <CardTitle>Ping Probability</CardTitle>
                    <hr />
                    <CardText>{pingText}</CardText>
                    <Link to={getFullUrl('/ping')} className="btn btn-danger">
                        Get Angry
                    </Link>
                </CardBody>
            </Card>
        </div>
        <FAQ/>
    </div>
);
export default Home;