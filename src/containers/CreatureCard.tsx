import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { StoreState, CreatureCardState } from '../types/index';
import { InputAction } from '../actions/commonActions';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { removeCreatureCard, updateCreatureCard } from '../actions/ping';
import InputCard from '../components/InputCard';
import * as R from 'ramda';

/**
 * CreatureCard container manages and presents the state of a creature to be pingable in Ping calculation.
 * All creature state is kept in list in state.creatureCards
 */
interface CreatureCardProps {
    id: number;
    hp: number;
    toDie: boolean;
    isGod: boolean;
    onRemove: (id: number ) => void;
    onChange: (id: number, evt: React.SyntheticEvent<HTMLInputElement>) => void;
}

const getCardClassNames = (toDie: boolean, isGod: boolean) => {
    let classes = 'input creature';
    classes += (isGod) ? ' god' : '';
    classes += (toDie) ? ' toDie' : '';
    return classes;
};

export const CreatureCard = ({isGod, id, hp, toDie, onRemove, onChange}: CreatureCardProps) => {
    const removeFunc = (isGod) ? null : () => onRemove(id);
    return (
        <InputCard
            className={getCardClassNames(toDie, isGod)}
            title={(isGod) ? 'God' : 'Creature'}
            onRemove={removeFunc!}
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
                            value={Number(toDie)}
                        >
                            <option value={0}>{'Lives'}</option>
                            <option value={1}>{'Dies'}</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
        </InputCard>
    );
};

interface OwnProps {
    id: number;
}
const mapStateToProps = ({creatureCards}: StoreState, {id}: OwnProps) => {
    const creature = R.find(R.propEq('id', id), creatureCards) as CreatureCardState;
    return {
        ...creature
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onChange: (id: number, evt: React.SyntheticEvent<HTMLInputElement>) => dispatch(updateCreatureCard(id, evt)),
        onRemove: (id: number) => dispatch(removeCreatureCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatureCard);