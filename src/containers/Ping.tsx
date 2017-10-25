import * as React from 'react';
import { CreatureCardState, StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import * as constants from '../constants';
import { addCreatureCard } from '../actions/ping';
import { InputAction } from '../actions/commonActions';
import { InputArea } from '../components/InputArea';
import CreatureCard from './CreatureCard';
import Calculate from './Calculate';

/**
 * Ping container houses all cards to be pinged, add creature button, and calculate button.
 * It renders each creature state as a CreatureCard.
 */

interface PingProps {
    cards: Array<CreatureCardState>;
    onAdd: () => void;
}

export const Ping = ({cards, onAdd}: PingProps) => {
    return (
        <div className="col-12">
            <InputArea context="creature" onAdd={onAdd}>
                {cards.map((card) =>
                    <CreatureCard
                        key={card.id}
                        id={card.id}
                    />)}
            </InputArea>
            <Calculate type={constants.CALCULATE_PING}/>
        </div>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.creatureCards
    };
};

function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onAdd: () => dispatch(addCreatureCard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ping);