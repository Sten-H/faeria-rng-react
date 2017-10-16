import * as React from 'react';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { SyntheticEvent } from 'react';
import TiTrash from 'react-icons/lib/ti/trash';

import './DrawCard.css';

export interface DrawCardProps {
    id: number;
    needed: number;
    total: number;
    onRemove: (id: number ) => void;
    onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => void;
}
export const DrawCard = ({ id, needed, total, onRemove, onChange}: DrawCardProps) => {
    return (
        <Card className="draw">
            <CardBody>
                <CardTitle>Card</CardTitle>
                <Form>
                    <FormGroup row>
                        <Label sm={6}>Need</Label>
                        <Col sm={6}>
                            <Input type="select" name="needed" value={needed} onChange={(evt) => onChange(id, evt)} >
                                <option>{1}</option>
                                <option>{2}</option>
                                <option>{3}</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={6}>Deck</Label>
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
            </CardBody>
        </Card>
    );
};
export default DrawCard;