import React from 'react';
import './Counter.css';

function Counter(props) {
    return (
        <div className="mainCounter">
            Your score
            <div className="score">{props.counter}</div>
        </div>
    )
}

export default Counter
