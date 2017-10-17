import DrawSettings from '../components/Draw/DrawSettings';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/drawSettings';
import { StoreState } from '../types/index';
import { SyntheticEvent } from 'react';

const mapStateToProps = ({drawSettings: {draws = 10, mulligan = false} = {}}: StoreState) => {
    return {
        draws,
        mulligan
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.DrawSettingsAction>) {
    return {
        onChangeDrawAmount: (evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateDrawAmount(evt)),
        onChangeMulligan: (evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateMulligan(evt)),
        // onRemove: (id: number) => dispatch(actions.removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSettings);