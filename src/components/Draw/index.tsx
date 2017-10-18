import * as React from 'react';
import { Button, CardColumns } from 'reactstrap';
import * as constants from '../../constants';
import { DrawCardState } from '../../types';
import BackCard from '../common/BackCard/BackCard';
import DrawSettings from '../../containers/DrawSettings';
import Calculate from '../../containers/Calculate';
import DrawCard from '../../containers/DrawCard';

import './Draw.css';

export interface DrawProps {
    cards: Array<DrawCardState>;
    onAdd: () => void;
}

export const Draw = ({cards, onAdd}: DrawProps) => {
    return (
        <div className="col-12">
            <CardColumns>
                <BackCard />
                <DrawSettings />
                {cards.map((card) =>
                    <DrawCard
                        key={card.id}
                        id={card.id}
                        needed={card.needed}
                        total={card.total}
                    />)}
            </CardColumns>
            <Button
                className="add"
                color="info"
                onClick={onAdd}
                block
            >Add card
            </Button>
            <Calculate type={constants.CALCULATE_DRAW}/>
        </div>
    );
};

export default Draw;