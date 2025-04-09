import newState from "./Numstatus";

const defaultState = {
  ...newState,
};

let reducer = (state = defaultState, action: { type: string; val: number }) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "add1":
      newState.actions.add1(newState, action);
      break;
    case "add2":
      newState.actions.add2(newState, action);
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
