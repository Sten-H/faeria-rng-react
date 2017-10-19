import CreatureCard from '../components/Ping/CreatureCard';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../types/index';
import { InputAction } from '../actions/commonActions';
import { removeCreatureCard, updateCreatureCard } from '../actions/ping';
import { SyntheticEvent } from 'react';

interface Props {
    id: number;
    hp: number;
    toDie: number;
    isGod: boolean;
}
const mapStateToProps = ({creatureCards}: StoreState, {id, hp, toDie, isGod}: Props) => {
    return {
        id,
        hp,
        toDie,
        isGod
    };
};

export function mapDispatchToProps(dispatch: Dispatch<InputAction>) {
    return {
        onChange: (id: number, evt: SyntheticEvent<HTMLInputElement>) => dispatch(updateCreatureCard(id, evt)),
        onRemove: (id: number) => dispatch(removeCreatureCard(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatureCard);