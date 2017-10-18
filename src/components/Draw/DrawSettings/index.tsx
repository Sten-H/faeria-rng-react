import * as React from 'react';
import { Label, Input, FormGroup, Form, Col } from 'reactstrap';
import { SyntheticEvent } from 'react';
import InputCard from '../../common/InputCard';

interface DrawSettingProps {
    drawAmount: number;
    mulligan: boolean;
    onChangeDrawAmount: (evt: SyntheticEvent<HTMLInputElement>) => void;
    onChangeMulligan: (evt: SyntheticEvent<HTMLInputElement>) => void;
}
export const DrawSettings = ({drawAmount, mulligan, onChangeDrawAmount, onChangeMulligan}: DrawSettingProps) => (
    <InputCard className="settings" title="Settings">
        <Form>
            <FormGroup className="mb-2">
                <Label check>
                    <Input
                        type="checkbox"
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
                        name="drawAmount"
                        value={drawAmount}
                        min={3}
                        max={30}
                        onChange={onChangeDrawAmount}
                    />
                </Col>
            </FormGroup>
        </Form>
    </InputCard>
);
export default DrawSettings;