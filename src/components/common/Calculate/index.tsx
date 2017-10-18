import * as React from 'react';
import { Button } from 'reactstrap';

import './Calculate.css';
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

export default Calculate;