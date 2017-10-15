import { Draw } from '../components/Draw';
import * as actions from '../actions';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.cards
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.AddCardAction>) {
    return {
        onAdd: () => dispatch(actions.addDrawCard())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);