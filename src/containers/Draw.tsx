import Draw from '../components/Draw';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { InputAction } from '../actions/commonActions';
import { addDrawCard } from '../actions/draw';

const mapStateToProps = (state: StoreState) => {
    return {
        cards: state.drawCards
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onAdd: () => dispatch(addDrawCard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw);