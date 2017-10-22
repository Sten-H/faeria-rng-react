import * as React from 'react';
import { CardColumns, Button } from 'reactstrap';
import MenuCard  from '../MenuCard';
import DrawSettings from '../../containers/DrawSettings';
import PingSettings from '../../containers/PingSettings';
import * as constants from '../../constants';

interface InputArea {
    context: string;
    onAdd: () => void;
    children?: {};
}

/**
 * Gets specific components and strings depending context string
 * @param {string} context  should be either 'draw' or 'creature'
 * @returns {{buttonText: (string | string); settings: any; calcType: (string | CALCULATE_DRAW | CALCULATE_PING)}}
 */
const getContextComponents = (context: string) => {
    const isDraw = context === 'draw';
    return {
        buttonText: (isDraw) ? 'Add card' : 'Add creature',
        settings: (isDraw) ? <DrawSettings /> : <PingSettings />,
        calcType: (isDraw) ? constants.CALCULATE_DRAW : constants.CALCULATE_PING
    };
};
/**
 * Input area is a general component used to house cards in a card column.
 * @param {string} context  is either 'draw' or 'creature', will render different components.
 * @param {() => void} onAdd   function to call when add creature/card button is pressed
 * @param {{}} children     components to be housed in card column.
 * @returns {any}
 * @constructor
 */
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