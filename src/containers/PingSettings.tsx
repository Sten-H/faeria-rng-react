import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/settings';
import { StoreState } from '../types/index';
import { SyntheticEvent } from 'react';
import InputCard from '../components/InputCard';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

/**
 * Settings container for ping calculation. Ping amount state can be updated and shown.
 * State is saved to state.results.ping, is used by calculate reducer
 */
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

const mapStateToProps = (state: StoreState) => {
    return {
        pingAmount: state.settings.pingAmount
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.SettingsAction>) {
    return {
        onChangePingAmount: (evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateAmount(evt)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PingSettings);