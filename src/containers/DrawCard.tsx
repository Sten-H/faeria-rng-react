import DrawCard from '../components/Draw/DrawCard';
import { connect, Dispatch } from 'react-redux';
import { DrawCardState, StoreState } from '../types/index';
import { SyntheticEvent } from 'react';
import { InputAction } from '../actions/commonActions';
import { removeDrawCard, updateDrawCard } from '../actions/draw';

const mapStateToProps = ({drawCards}: StoreState,   {id, needed, total}: DrawCardState) => {
    return {
        id,
        needed,
        total
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => dispatch(updateDrawCard(id, evt)),
        onRemove: (id: number) => dispatch(removeDrawCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCard);