import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/settings';
import { StoreState } from '../types/index';
// import { SyntheticEvent } from 'react';
import PingSettings from '../components/Ping/PingSettings';
import { SyntheticEvent } from 'react';

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