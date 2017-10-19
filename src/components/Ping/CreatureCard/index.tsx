import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { InputCard } from '../../common/InputCard/index';
import TiTrash from 'react-icons/lib/ti/trash';
import { SyntheticEvent } from 'react';

interface CreatureCardProps {
    id: number;
    hp: number;
    toDie: number;
    isGod: boolean;
    onRemove: (id: number ) => void;
    onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => void;
}
const deleteButton = (onRemove: () => void) => (
    <Button
        block
        color="danger"
        onClick={onRemove}
    >Delete<TiTrash size={'2em'}/>
    </Button>);

const getCardClassNames = (toDie: number, isGod: boolean) => {
    let classes = 'input creature';
    classes += (isGod) ? ' god' : '';
    classes += (Boolean(toDie)) ? ' toDie' : '';
    return classes;
};

export const CreatureCard = ({isGod, id, hp, toDie, onRemove, onChange}: CreatureCardProps) => {
    const activeDeleteButton = (isGod) ? <div /> : deleteButton(() => onRemove(id));
    return (
        <InputCard
            className={getCardClassNames(toDie, isGod)}
            title={(isGod) ? 'God' : 'Creature'}
        >
            <Form>
                <FormGroup row>
                    <Label sm={5}>HP:</Label>
                    <Col sm={7}>
                        <Input
                            type="number"
                            name="hp"
                            value={hp}
                            min={1}
                            max={100}
                            onChange={(evt) => onChange(id, evt)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={5}>Status</Label>
                    <Col sm={7}>
                        <Input
                            type="select"
                            name="toDie"
                            onChange={(evt) => onChange(id, evt)}
                            value={toDie}
                        >
                            <option value={0}>{'Lives'}</option>
                            <option value={1}>{'Dies'}</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
            {activeDeleteButton}
        </InputCard>
    );
};

export default CreatureCard;