import * as React from 'react';
import { Card, CardBody, CardTitle, Form, Label, Input, FormGroup, Col } from 'reactstrap';
import './DrawSettings.css';
import { SyntheticEvent } from 'react';

interface DrawSettingProps {
    draws: number;
    mulligan: boolean;
    onChangeDrawAmount: (evt: SyntheticEvent<HTMLInputElement>) => void;
    onChangeMulligan: (evt: SyntheticEvent<HTMLInputElement>) => void;
}
export const DrawSettings = ({draws, mulligan, onChangeDrawAmount, onChangeMulligan}: DrawSettingProps) => (
    <Card className="settings">
        <CardBody>
            <CardTitle>Settings</CardTitle>
            <Form>
                <FormGroup className="mb-2">
                    <Label check>
                        <Input
                            type="checkbox"
                            name="mulligan"
                            checked={mulligan}
                            onChange={onChangeMulligan}
                        />
                        <span>Include mulligan (slow)</span>
                    </Label>
                </FormGroup>
                <FormGroup row>
                    <Label sm={6}>Draws</Label>
                    <Col sm={6}>
                        <Input
                            type="number"
                            name="draws"
                            value={draws}
                            onChange={onChangeDrawAmount}
                        />
                    </Col>
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
);
export default DrawSettings;