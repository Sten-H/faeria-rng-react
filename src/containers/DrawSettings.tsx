import DrawSettings from '../components/DrawSettings';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/drawSettings';
import { StoreState } from '../types/index';

const mapStateToProps = ({drawSettings: {draws = 10, mulligan = false} = {}}: StoreState) => {
    return {
        draws,
        mulligan
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.UpdateDrawSettingsAction>) {
    return {
        onChange: () => dispatch(actions.updateCard()),
        // onRemove: (id: number) => dispatch(actions.removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawSettings);