import * as React from 'react';
import * as constants from '../../constants';
import { Button, CardColumns } from 'reactstrap';
import Calculate from '../../containers/Calculate';
import PingSettings from '../../containers/PingSettings';
import BackCard from '../common/BackCard/BackCard';
import { CreatureCardState } from '../../types/index';
import CreatureCard from '../../containers/CreatureCard';

interface PingProps {
    cards: Array<CreatureCardState>;
    onAdd: () => void;
}

export const Ping = ({cards, onAdd}: PingProps) => {
    return (
        <div className="col-12">
            <CardColumns>
                <BackCard />
                <PingSettings />
                {cards.map((card) =>
                    <CreatureCard
                        key={card.id}
                        id={card.id}
                        hp={card.hp}
                        toDie={card.toDie}
                        isGod={card.isGod}
                    />)}
            </CardColumns>
            <Button
                className="add"
                color="info"
                onClick={onAdd}
                block
            >Add creature
            </Button>
            <Calculate type={constants.CALCULATE_PING}/>
        </div>
    );
};
export default Ping;