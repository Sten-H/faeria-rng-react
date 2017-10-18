import * as React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import './InputCard.css';

interface CardProps {
    className: string;
    title: string;
    children: React.ReactElement<HTMLElement>[] | React.ReactElement<HTMLElement>;
}
export const InputCard = (props: CardProps) => {
    return (
        <Card className={props.className}>
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                    {props.children}
            </CardBody>
        </Card>
    );
};

export default InputCard;