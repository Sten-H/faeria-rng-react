import DrawCard from '../components/DrawCard';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/draw';
import { DrawCardState, StoreState } from '../types/index';
import { SyntheticEvent } from 'react';

const mapStateToProps = ({drawCards}: StoreState,   {id, needed, total}: DrawCardState) => {
    return {
        id,
        needed,
        total
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.DrawCardAction>) {
    return {
        onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => dispatch(actions.updateCard(id, evt)),
        onRemove: (id: number) => dispatch(actions.removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCard);