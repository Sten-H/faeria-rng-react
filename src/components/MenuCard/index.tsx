import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as React from 'react';
import './MenuCard.css';

export const MenuCard = () => (
    <Card className="back">
        <CardBody className="pb-0 pt-2">
            <CardTitle>
                <Link to="/">
                    <span className="typcn typcn-arrow-left"/>
                    Menu
                </Link>
            </CardTitle>
        </CardBody>
    </Card>
);
export default MenuCard;