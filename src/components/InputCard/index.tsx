import * as React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import TiTrash from 'react-icons/lib/ti/trash';
import { isNil } from 'ramda';
import './InputCard.css';

const getDeleteButton = (onRemove: () => void) => (
    <Button
        block
        color="danger"
        onClick={onRemove}
    >
        Delete <TiTrash size={'2em'} />
    </Button>);

interface InputCardProps {
    className: string;
    title: string;
    onRemove?: () => void;
    children: React.ReactElement<HTMLElement>[] | React.ReactElement<HTMLElement>;
}
/**
 * Wraps input in a bootstrap card. If optional property onRemove is set it the card will have a
 * delete button calling onRemove function on click.
 * @param {InputCardProps} props
 * @returns {React.Component}
 */
export const InputCard = ({className, title, onRemove, children}: InputCardProps) => {
    const deleteButton = (isNil(onRemove)) ? null : getDeleteButton(onRemove);
    return (
        <Card className={className}>
            <CardBody>
                <CardTitle>{title}</CardTitle>
                    {children}
                    {deleteButton}
            </CardBody>
        </Card>
    );
};

export default InputCard;