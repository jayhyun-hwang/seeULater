import { createContext, useReducer } from "react";
import { GET_HOST } from "./actionTypes";

//initial state
// const initialState = {
//   productList: {
//     computer: [
//       { name: "pc", price: 100 },
//       { name: "note-book", price: 200 },
//     ],
//     fruits: [
//       { name: "banana", price: 10 },
//       { name: "apple", price: 20 },
//     ],
//   },
// };

const SERVICEHOST = {
    HOST: "http://3.36.36.62/",
    HOSTDEV: "http://127.0.0.1/"
}

// create context
const Context = createContext({});

// create reducer
// const reducer_ = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_FRUIT:
//       return {
//         ...state,
//         productList: {
//           ...state.productList,
//           fruits: [...state.productList.fruits, action.payload],
//         },
//       };
//     default:
//       return state;
//   }
// };

const reducer = (state = SERVICEHOST, action) => {
  switch (action.type) {
    case GET_HOST:
      return {
        ...state,
        HOST: state.HOST,
        HOSTDEV: state.HOSTDEV
      };
    default:
      return state;
  }
};

// create Provider component (High order component)
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, SERVICEHOST);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };