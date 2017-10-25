import * as React from 'react';
import { StoreState, DrawCardState } from '../types';
import { connect, Dispatch } from 'react-redux';
import * as constants from '../constants';
import { InputAction } from '../actions/commonActions';
import { addDrawCard } from '../actions/draw';
import { InputArea } from '../components/InputArea';
import Calculate from './Calculate';
import DrawCard from './DrawCard';

/**
 * Draw container houses all cards to be drawn, add card button, and calculate button.
 * It renders each card state as a DrawCard.
 */
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
                    />)}
            </InputArea>
            <Calculate type={constants.CALCULATE_DRAW}/>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.drawCards
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onAdd: () => dispatch(addDrawCard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);