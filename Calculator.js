import React, { useState } from 'react';
import './Calculator.css';
import RestoreIcon from '@mui/icons-material/Restore';
import { Popover } from 'antd';

function Calculator() {
    const [result, setResult] = useState('');
    const [expression, setExpression] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [equalsClicked, setEqualsClicked] = useState(false);

    const handleClick = (clickedValue) => {
        if (clickedValue === 'DE') {
            setResult(prevResult => prevResult.slice(0, -1) || '');
        } else if (clickedValue === '()') {
            setResult(prevResult => {
                if (prevResult.endsWith('(')) {
                    return prevResult.concat(')');
                } else if (prevResult.endsWith(')') || prevResult === '') {
                    return prevResult.concat('(');
                } else {
                    return prevResult.concat(')');
                }
            });
        } else if (clickedValue === '=') {
            calculate();
            setEqualsClicked(true);
        } else {
            setResult(prevResult => prevResult.concat(clickedValue));
        }
    }

    const toggleHistory = () => {
        setShowHistory(prev => !prev);
    };

    const clear = () => {
        setResult('');
        setExpression('');
        setEqualsClicked(false);

    }

    const calculate = () => {
        try {
            const evalResult = parseFloat(result);
            setExpression(result);
            setResult(evalResult);
            setHistory(prevHistory => [...prevHistory, { expression: result, result: evalResult }]);
        } catch (error) {
            setResult('Error');
        }
    }

    return (
        <div className="container">
            <div className="calculator">
                <h1>Calculator</h1>
                <div className="input-container">
                    <textarea className="combined-input" value={`${expression}\n${result || '0'}`} readOnly />
                    <div className="history-icon" onClick={toggleHistory}>
                        <Popover
                            content={(
                                <div className="history">
                                    {history.map((item, index) => (
                                        <div key={index} className="history-item">
                                            <p className="history-expression">{item.expression}</p>
                                            <p className="history-result">{item.result}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            placement="bottom"
                            trigger="click"
                        >
                            <RestoreIcon />
                        </Popover>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => clear()} className="clear">Clear</button>
                    <button onClick={() => handleClick("()")}>( )</button>
                    <button onClick={() => handleClick("%")}>%</button>
                    <button onClick={() => handleClick("DE")}>DE</button>
                    <button onClick={() => handleClick("7")}>7</button>
                    <button onClick={() => handleClick("8")}>8</button>
                    <button onClick={() => handleClick("9")}>9</button>
                    <button onClick={() => handleClick("/")}>/</button>
                    <button onClick={() => handleClick("4")}>4</button>
                    <button onClick={() => handleClick("5")}>5</button>
                    <button onClick={() => handleClick("6")}>6</button>
                    <button onClick={() => handleClick("*")}>*</button>
                    <button onClick={() => handleClick("1")}>1</button>
                    <button onClick={() => handleClick("2")}>2</button>
                    <button onClick={() => handleClick("3")}>3</button>
                    <button onClick={() => handleClick("-")}>-</button>
                    <button onClick={() => handleClick("0")}>0</button>
                    <button onClick={() => handleClick(".")}>.</button>
                    <button onClick={() => calculate()} className="equal">=</button>
                    <button onClick={() => handleClick("+")}>+</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
