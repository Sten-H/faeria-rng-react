import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { SyntheticEvent } from 'react';
import { InputCard } from '../../common/InputCard';
import TiTrash from 'react-icons/lib/ti/trash';

export interface DrawCardProps {
    id: number;
    needed: number;
    total: number;
    onRemove: (id: number ) => void;
    onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => void;
}
export const DrawCard = ({ id, needed, total, onRemove, onChange}: DrawCardProps) => {
    return (
        <InputCard className="input" title="Card">
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
            <Button block color="danger" onClick={() => onRemove(id)}>Delete <TiTrash size={'2em'} /></Button>
        </InputCard>
    );
};
export default DrawCard;