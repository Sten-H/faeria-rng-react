import Draw from '../components/Draw';
import * as actions from '../actions/draw';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.drawCards
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.DrawCardAction>) {
    return {
        onAdd: () => dispatch(actions.addDrawCard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);