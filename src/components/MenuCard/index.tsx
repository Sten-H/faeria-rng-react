import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import TiLeft from 'react-icons/lib/ti/chevron-left-outline';
import * as React from 'react';
import './MenuCard.css';

export const MenuCard = () => (
    <Card className="back">
        <CardBody className="pb-0 pt-2">
            <CardTitle>
                <Link to="/">
                    <TiLeft className="float-left" />Menu
                </Link>
            </CardTitle>
        </CardBody>
    </Card>
);

export default MenuCard;