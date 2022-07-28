import React, { useEffect, useReducer, useState } from 'react';
import { initState, context, countReducer } from './reducer/index'
import Home from './page/home'
function App() {
  let store = useReducer(countReducer, initState)
  return (
    <div className="App">
      <context.Provider value={store}>
        <Home store={store}></Home>
      </context.Provider>
    </div>
  );
}
export default App;
