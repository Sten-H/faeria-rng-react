import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/settings';
import { StoreState } from '../types/index';
import { Label, Input, FormGroup, Form, Col } from 'reactstrap';
import InputCard from '../components/InputCard';

/**
 * Settings container for draw calculation. Draw amount and mulligan state can be updated and shown.
 * State is saved to state.results.draw, is used by calculate reducer
 */
interface DrawSettingProps {
    drawAmount: number;
    mulligan: boolean;
    onChangeDrawAmount: (evt: React.SyntheticEvent<HTMLInputElement>) => void;
    onChangeMulligan: (evt: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const DrawSettings = ({drawAmount, mulligan, onChangeDrawAmount, onChangeMulligan}: DrawSettingProps) => (
    <InputCard className="settings" title="Settings">
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

const mapStateToProps = (state: StoreState) => {
    return {
        drawAmount: state.settings.drawAmount,
        mulligan: state.settings.mulligan
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.SettingsAction>) {
    return {
        onChangeDrawAmount: (evt: React.SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateAmount(evt)),
        onChangeMulligan: (evt: React.SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateMulligan(evt)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSettings);