import * as React from 'react';
import * as constants from '../../constants';
import { Button, CardColumns } from 'reactstrap';
import Calculate from '../../containers/Calculate';
import PingSettings from '../../containers/PingSettings';
import BackCard from '../common/BackCard/BackCard';

import { calculatePing } from '../../actions/calculate';

export const Ping = () => {
    return (
        <div className="col-12">
            <CardColumns>
                <BackCard />
                <PingSettings />
                {/*{cards.map((card) =>*/}
                    {/*<InputCard*/}
                        {/*key={card.id}*/}
                        {/*id={card.id}*/}
                        {/*needed={card.needed}*/}
                        {/*total={card.total}*/}
                    {/*/>)}*/}
            </CardColumns>
            <Button
                className="draw"
                color="info"
                onClick={calculatePing}
                block
            >Add card
            </Button>
            <Calculate type={constants.CALCULATE_PING}/>
        </div>
    );
};