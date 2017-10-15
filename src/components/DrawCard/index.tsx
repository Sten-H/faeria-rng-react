import * as React from 'react';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import TiTrash from 'react-icons/lib/ti/trash';

export interface DrawCardProps {
    id: number,
    needed: number;
    total: number;
    onRemove: (evt: any) => void;
    onChange: (id: number, evt: any) => void;
}
//
// export interface CreatureCardProps {
//     id: number;
//     hp: number;
//     toDie: boolean;
// }
// export type CardProps = DrawCardProps | CreatureCardProps;
export const InputCard = ({ id, needed, total, onRemove, onChange}: DrawCardProps) => {
    return (
        <Card color="primary">
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
                {/*<label>*/}
                    {/*Needed:*/}
                    {/*<input type="number" name="needed" value={needed} onChange={(evt) => onChange(id, evt)} />*/}
                {/*</label>*/}
                {/*<label>*/}
                    {/*In deck:*/}
                    {/*<input type="number" name="total" value={total} onChange={(evt) => onChange(id, evt)} />*/}
                {/*</label>*/}
                    <Button block color="danger" onClick={() => onRemove(id)}>Delete <TiTrash size={"2em"} /></Button>
            </CardBody>
        </Card>
    );
};