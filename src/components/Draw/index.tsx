import * as React from 'react';
import { Button, CardColumns } from 'reactstrap';
import { DrawCardState } from '../../types';
import InputCard from '../../containers/InputCard';

export interface DrawProps {
    cards: Array<DrawCardState>;
    onAdd: () => void;
}

export const Draw = ({cards, onAdd}: DrawProps) => {
    return (
        <div>
            <div className="col-12">
                <CardColumns>
                    {cards.map((card) => <InputCard key={card.id} id={card.id} needed={card.needed} total={card.total} />)}
                </CardColumns>
            </div>
            <Button block={true} color="primary" onClick={onAdd}>Add card</Button>
        </div>
    );
};