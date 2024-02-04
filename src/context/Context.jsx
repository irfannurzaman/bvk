import React, { createContext, useReducer, useState } from 'react';
import { reducer } from "./reducer"
import { initialState } from "./initialState"
function AppContext() {
    const Context = createContext();
    const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const values = { 
        dispatch,
        state
    }
    
    return (
        <Context.Provider value={values}>
            {props.children}
        </Context.Provider>
    );
  }
  
  return {
    Context,
    Provider,
  }
}

export default AppContext();