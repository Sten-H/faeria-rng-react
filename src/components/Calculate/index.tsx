import * as React from 'react';
import { Button } from 'reactstrap';

import './Calculate.css';

export const Calculate = () => (
    <div>
    <Button
        className="calculate my-2"
        color="primary"
        onClick={() => null}
        block
    >Calculate
    </Button>
        <div className="results">
            <h3>
                <span className="text-highlight">--- </span>
                out of
                <span className="text-highlight"> 1000 </span>
                 hands would have desired outcome.
            </h3>
            <hr />
            <p>Completed in <span className="text-highlight>"> --- </span> seconds</p>
        </div>
    </div>
);

export default Calculate;