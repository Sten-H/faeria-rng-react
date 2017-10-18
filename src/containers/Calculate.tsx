import Calculate from '../components/common/Calculate';
import * as actions from '../actions/calculate';
import * as constants from '../constants';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../types/index';

interface OwnProps {
    type: string;
}
const mapStateToProps = ({results: {draw, ping}}: StoreState, {type}: OwnProps) => {
    const relevantResult = (type === constants.CALCULATE_DRAW) ? draw : ping;
    return {
        result: relevantResult
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.CalculateAction>, {type}: OwnProps) {
    const relevantFunc = (type === constants.CALCULATE_DRAW) ? actions.calculateDraw : actions.calculatePing;
    return {
        onCalculate: () => dispatch(relevantFunc()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculate);