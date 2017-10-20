import * as React from 'react';
import { Button } from 'reactstrap';
import * as actions from '../actions/calculate';
import * as constants from '../constants';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../types/index';

/**
 * The calculate button will dispatch either calculateDraw or calculatePing depending on which
 * calculate constant was passed as type. Results of calculation will be stored in containers state
 * and rendered for user to see
 */
interface CalculateProps {
    result: {
        timeTaken: number;
        desiredOutcomes: number;
    };
    onCalculate: () => void;
}
// Returns results number as highlighted span or "---" text if uncalculated
const styleResult = (result: number): React.ReactElement<string> => (
    <span className="text-highlight">
        {(result >= 0) ? result.toString() : '---'}
    </span>);

export const Calculate = ({result, onCalculate}: CalculateProps) => {
    return(
        <div>
            <Button
                className="calculate my-2"
                color="primary"
                onClick={onCalculate}
                block
            >Calculate
            </Button>
            <div className="results">
                <h3>
                    {styleResult(result.desiredOutcomes)}  out of {styleResult(1000)} games would have desired outcome.
                </h3>
                <hr />
                <p>Completed in {styleResult(result.timeTaken)} seconds</p>
            </div>
        </div>
    );
};
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