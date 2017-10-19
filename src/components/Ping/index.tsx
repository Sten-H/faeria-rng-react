import * as React from 'react';
import * as constants from '../../constants';
import Calculate from '../../containers/Calculate';
import { CreatureCardState } from '../../types/index';
import CreatureCard from '../../containers/CreatureCard';
import { InputArea } from '../common/InputArea/index';

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
                        hp={card.hp}
                        toDie={card.toDie}
                        isGod={card.isGod}
                    />)}
            </InputArea>
            <Calculate type={constants.CALCULATE_PING}/>
        </div>
    );
};
export default Ping;