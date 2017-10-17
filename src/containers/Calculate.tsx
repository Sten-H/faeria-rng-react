import Calculate from '../components/common/Calculate';
import * as actions from '../actions/calculate';
import * as constants from '../constants';
import { StoreState } from '../types';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = ({results: {draw, ping}}: StoreState, {type}: any) => {
    const relevantResult = (type === constants.CALCULATE_DRAW) ? draw : ping;
    return {
        result: relevantResult
    };
};

export function mapDispatchToProps(dispatch: Dispatch<actions.CalculateAction>, {type}: any) {
    const relevantFunc = (type === constants.CALCULATE_DRAW) ? actions.calculateDraw : actions.calculatePing;
    return {
        onCalculate: () => dispatch(relevantFunc()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculate);