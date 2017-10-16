import * as React from 'react';
import { Button, CardColumns, Card, CardBody, CardTitle } from 'reactstrap';
import { DrawCardState } from '../../types';
import { Link } from 'react-router-dom';
import TiLeft from 'react-icons/lib/ti/chevron-left-outline';
import InputCard from '../../containers/DrawCard';
import DrawSettings from '../../containers/DrawSettings';
import Calculate from '../Calculate';
import './Draw.css';

export interface DrawProps {
    cards: Array<DrawCardState>;
    onAdd: () => void;
}

const BackCard = () => (
    <Card className="back">
        <CardBody className="pb-0 pt-2">
            <CardTitle>
                <Link to="/">
                    <TiLeft className="float-left" />Go Back
                </Link>
            </CardTitle>
        </CardBody>
    </Card>
);
export const Draw = ({cards, onAdd}: DrawProps) => {
    return (
        <div>
            <div className="col-12">
                <CardColumns>
                    <BackCard />
                    <DrawSettings />
                    {cards.map((card) =>
                        <InputCard
                            key={card.id}
                            id={card.id}
                            needed={card.needed}
                            total={card.total}
                        />)}
                </CardColumns>
            </div>
            <Button
                className="draw"
                color="info"
                onClick={onAdd}
                block
            >Add card
            </Button>
            <Calculate />
        </div>
    );
};

export default Draw;