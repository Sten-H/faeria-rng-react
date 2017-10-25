import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { DrawCardState, StoreState } from '../types/index';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { InputAction } from '../actions/commonActions';
import { removeDrawCard, updateDrawCard } from '../actions/draw';
import InputCard from '../components/InputCard';
import * as R from 'ramda';

/**
 * DrawCard container manages and presents the state of a single card to be drawn in Draw calculation.
 * All card state is kept in list in state.drawCards
 */
interface DrawCardProps {
    id: number;
    needed: number;
    total: number;
    onRemove: (id: number ) => void;
    onChange: (id: number, evt: React.SyntheticEvent<HTMLInputElement>) => void;
}
export const DrawCard = ({ id, needed, total, onRemove, onChange}: DrawCardProps) => {
    return (
        <InputCard className="input draw" title="Card" onRemove={() => onRemove(id)}>
            <Form>
                <FormGroup row>
                    <Label sm={6}>Need:</Label>
                    <Col sm={6}>
                        <Input type="select" name="needed" value={needed} onChange={(evt) => onChange(id, evt)} >
                            <option>{1}</option>
                            <option>{2}</option>
                            <option>{3}</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={6}>Deck:</Label>
                    <Col sm={6}>
                        <Input type="select" name="total" value={total} onChange={(evt) => onChange(id, evt)} >
                            <option>{1}</option>
                            <option>{2}</option>
                            <option>{3}</option>
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
const mapStateToProps = ({drawCards}: StoreState,   {id}: OwnProps) => {
    const card = R.find(R.propEq('id', id), drawCards) as DrawCardState;
    return {
        ...card
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onChange: (id: number, evt: React.SyntheticEvent<HTMLInputElement>) => dispatch(updateDrawCard(id, evt)),
        onRemove: (id: number) => dispatch(removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCard);