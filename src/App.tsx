import React, { useReducer } from 'react';
import { key } from './eNum';

interface State {
  inputData?: string,
  lastData?: string,
  operator?: string,
}

const initialState: State = {
  inputData: '',
  lastData: '',
  operator: '',
};

const calReducer = (state: State, action: { type: string; payload: State; }) => {
  switch (action.type) {
    case 'OPERATE':
      return { ...action.payload }
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(calReducer, initialState);
  console.log(state);
  const { inputData, lastData, operator } = state;
  const addToInput = (key: string | number) => dispatch({ type: 'OPERATE', payload: { ...state, inputData: inputData + key }});
  const addZero = (key: number) => {!(inputData === '') && addToInput(key)};
  const addPoint = (key: string) => {!((/\./).test(inputData)) && addToInput(key)};
  const allClear = () => dispatch({ type: 'OPERATE', payload: { inputData: '', lastData: '' }});
  const handleClear = () => dispatch({ type: 'OPERATE', payload: { inputData: '' }});
  const handleOperate = (key: string) => dispatch({ type: 'OPERATE', payload: { lastData: inputData || lastData , inputData: '', operator: key }});
  const handleDelete = () => dispatch({ type: 'OPERATE', payload: { inputData: inputData.substring(0, inputData.length - 1)}});
  const handleCalculate = () => {
    let result: number;
    switch (operator) {
      case '+':
        result = +(lastData) + +(inputData);
        break;
      case '-':
        result = +(lastData) - +(inputData);
        break;
      case '*':
        result = +(lastData) * +(inputData);
        break;
      case '/':
        result = +(lastData) / +(inputData);
        break;
      default:
        return;
    };
    allClear();
    dispatch({ type: 'OPERATE', payload: { inputData: result.toString() }});
  };
  const changePolarity = () => dispatch({ type: 'OPERATE', payload: { inputData: (-(+(inputData))).toString() }});

  return (
    <div className="app">
        <input className="input" type="text" defaultValue={inputData} />
      <div className="pads">
        <button onClick={allClear} className="blue" >{key.AC}</button>
        <button onClick={handleClear} className="blue" >{key.C}</button>
        <button onClick={handleDelete} className="blue" >{key.Del}</button>
        <button onClick={() => handleOperate(key.plus)} className="red" >{key.plus}</button>
        <button onClick={() => addToInput(key.num7)}>{key.num7}</button>
        <button onClick={() => addToInput(key.num8)}>{key.num8}</button>
        <button onClick={() => addToInput(key.num9)}>{key.num9}</button>
        <button onClick={() => handleOperate(key.minus)} className="red" >{key.minus}</button>
        <button onClick={() => addToInput(key.num4)}>{key.num4}</button>
        <button onClick={() => addToInput(key.num5)}>{key.num5}</button>
        <button onClick={() => addToInput(key.num6)}>{key.num6}</button>
        <button onClick={() => handleOperate(key.multiply)} className="red" >{key.multiply}</button>
        <button onClick={() => addToInput(key.num1)}>{key.num1}</button>
        <button onClick={() => addToInput(key.num2)}>{key.num2}</button>
        <button onClick={() => addToInput(key.num3)}>{key.num3}</button>
        <button onClick={() => handleOperate(key.divide)} className="red" >{key.divide}</button>
        <button onClick={() => addPoint(key.point)}>{key.point}</button>
        <button onClick={() => addZero(key.num0)}>{key.num0}</button>
        <button onClick={changePolarity}>{key.negative}</button>
        <button onClick={handleCalculate} className="red" >{key.equal}</button>
      </div>
    </div>
  );
}

export default App;