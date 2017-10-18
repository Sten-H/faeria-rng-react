import * as React from 'react';
import { Label, Input, FormGroup, Form, Col } from 'reactstrap';
// import { SyntheticEvent } from 'react';
import InputCard from '../../common/InputCard';
import { SyntheticEvent } from 'react';

interface PingSettingProps {
    pingAmount: number;
    onChangePingAmount: (evt: SyntheticEvent<HTMLInputElement>) => void;
}
export const PingSettings = ({onChangePingAmount, pingAmount}: PingSettingProps) => (
    <InputCard className="settings" title="Settings">
        <Form>
            <FormGroup row>
                <Label sm={6}>Pings</Label>
                <Col sm={6}>
                    <Input
                        type="number"
                        min={0}
                        max={15}
                        name="pingAmount"
                        value={pingAmount}
                        onChange={onChangePingAmount}
                    />
                </Col>
            </FormGroup>
        </Form>
    </InputCard>
);
export default PingSettings;
// value={pingAmount}
// onChange={onChangePingAmount}