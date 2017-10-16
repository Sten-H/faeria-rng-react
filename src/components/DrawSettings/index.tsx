import * as React from 'react';
import { Card, CardBody, CardTitle, Form, Label, Input, FormGroup, Col } from 'reactstrap';
import './DrawSettings.css';

interface DrawSettingProps {
    draws: number;
    mulligan: boolean;
    onChange: () => void;
}
const DrawSettings = ({draws, mulligan}: DrawSettingProps) => (
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
                            value={draws}/>
                    </Col>
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
);
export default DrawSettings;