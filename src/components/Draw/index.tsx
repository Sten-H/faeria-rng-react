import * as React from 'react';
import * as constants from '../../constants';
import { DrawCardState } from '../../types';
import Calculate from '../../containers/Calculate';
import DrawCard from '../../containers/DrawCard';

import './Draw.css';
import { InputArea } from '../common/InputArea/index';

export interface DrawProps {
    cards: Array<DrawCardState>;
    onAdd: () => void;
}

export const Draw = ({cards, onAdd}: DrawProps) => {
    return (
        <div className="col-12">
            <InputArea context={'draw'} onAdd={onAdd}>
                {cards.map((card) =>
                    <DrawCard
                        key={card.id}
                        id={card.id}
                        needed={card.needed}
                        total={card.total}
                    />)}
            </InputArea>
            <Calculate type={constants.CALCULATE_DRAW}/>
        </div>
    );
};

export default Draw;