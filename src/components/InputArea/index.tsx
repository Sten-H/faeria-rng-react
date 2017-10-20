import * as React from 'react';
import { CardColumns } from 'reactstrap/';
import MenuCard  from '../MenuCard';
import { Button } from 'reactstrap';
import DrawSettings from '../../containers/DrawSettings';
import PingSettings from '../../containers/PingSettings';
import * as constants from '../../constants';

interface InputArea {
    context: string;
    onAdd: () => void;
    children: {};
}
const getContextComponents = (context: string) => {
    const isDraw = context === 'draw';
    return {
        buttonText: (isDraw) ? 'Add card' : 'Add creature',
        settings: (isDraw) ? <DrawSettings /> : <PingSettings />,
        calcType: (isDraw) ? constants.CALCULATE_DRAW : constants.CALCULATE_PING
    };
};
export const InputArea = ({onAdd, context, children}: InputArea) => {
    const {buttonText, settings} = getContextComponents(context);
    return (
        <div>
            <CardColumns>
                <MenuCard />
                {settings}
                {children}
            </CardColumns>
            <Button
                className="add"
                color="info"
                onClick={onAdd}
                block
            >
                {buttonText}
            </Button>
        </div>
    );
};
export default InputArea;