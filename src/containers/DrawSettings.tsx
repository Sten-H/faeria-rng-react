import DrawSettings from '../components/Draw/DrawSettings';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/settings';
import { StoreState } from '../types/index';
import { SyntheticEvent } from 'react';

const mapStateToProps = (state: StoreState) => {
    return {
        drawAmount: state.settings.drawAmount,
        mulligan: state.settings.mulligan
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.SettingsAction>) {
    return {
        onChangeDrawAmount: (evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateAmount(evt)),
        onChangeMulligan: (evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateMulligan(evt)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSettings);