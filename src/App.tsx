import * as React from "react";
import { UserCombo } from './components/Users';
import mainReducer from './state/reducer';
import { initialState } from './state/constants';
import { AppContext } from './state/context'

export const App = () => {

  const [state, dispatch] = React.useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}>
        <UserCombo />
    </AppContext.Provider>
  )
};