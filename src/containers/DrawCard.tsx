import DrawCard from '../components/Draw/DrawCard';
import { connect, Dispatch } from 'react-redux';
import { DrawCardState, StoreState } from '../types/index';
import { SyntheticEvent } from 'react';
import { removeDrawCard, updateCard } from '../actions/draw';
import { InputAction } from '../actions/commonActions';

const mapStateToProps = ({drawCards}: StoreState,   {id, needed, total}: DrawCardState) => {
    return {
        id,
        needed,
        total
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => dispatch(updateCard(id, evt)),
        onRemove: (id: number) => dispatch(removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCard);