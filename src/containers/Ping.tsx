import Ping from '../components/Ping';
// import * as actions from '../actions/ping';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { InputAction } from '../actions/commonActions';
import { addCreatureCard } from '../actions/ping';

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.creatureCards
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onAdd: () => dispatch(addCreatureCard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ping);