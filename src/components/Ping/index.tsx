import * as React from 'react';
import * as constants from '../../constants';
import { Button, CardColumns } from 'reactstrap';
import Calculate from '../../containers/Calculate';
import PingSettings from '../../containers/PingSettings';
import BackCard from '../common/BackCard/BackCard';
import { CreatureCardState } from '../../types/index';
import { CreatureCard } from './CreatureCard/index';

export interface DrawProps {
    cards: Array<CreatureCardState>;
    onAdd: () => void;
}

export const Ping = ({cards, onAdd}: DrawProps) => {
    return (
        <div className="col-12">
            <CardColumns>
                <BackCard />
                <PingSettings />
                {cards.map((card) =>
                    <CreatureCard
                        key={card.id}
                    />)}
            </CardColumns>
            <Button
                className="add"
                color="info"
                onClick={onAdd}
                block
            >Add card
            </Button>
            <Calculate type={constants.CALCULATE_PING}/>
        </div>
    );
};
export default Ping;