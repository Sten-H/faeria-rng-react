import DrawCard from '../components/DrawCard';
// import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';

interface InitialValues {
    id: number;
    needed: number;
    total: number;
}
const mapStateToProps = (state: any, { id, needed, total }: InitialValues) => {
    return {
        id,
        needed,
        total,
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.RemoveCardAction>) {
    return {
        onChange: (id: number, evt: any) => dispatch(actions.updateCard(id, evt)),
        onRemove: (evt: any) => dispatch(actions.removeDrawCard(evt)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCard);