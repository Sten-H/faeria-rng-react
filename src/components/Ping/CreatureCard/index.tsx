import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { InputCard } from '../../common/InputCard/index';
import TiTrash from 'react-icons/lib/ti/trash';

export const CreatureCard = () => {
    return (
        <InputCard className="input" title="Creature">
            <Form>
                <FormGroup row>
                    <Label sm={6}>HP:</Label>
                    <Col sm={6}>
                        <Input type="number" name="needed" onChange={() => null} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={5}>Status</Label>
                    <Col sm={7}>
                        <Input type="select" name="total" onChange={() => null} >
                            <option>{'Lives'}</option>
                            <option>{'Dies'}</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
            <Button block color="danger" onClick={() => null}>Delete <TiTrash size={'2em'} /></Button>
        </InputCard>
    );
};