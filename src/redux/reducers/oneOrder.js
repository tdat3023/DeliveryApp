export const SET_ORDER = "SET_ORDER";
export const REMOVE_ONEORDER = "REMOVE_ONEORDER";
const initialState = {
  oneOrder: null,
};

export const setOrder = (data) => ({
  type: "SET_ORDER",
  payload: data,
});

export const removeOneOrder = () => ({
  type: REMOVE_ONEORDER,
});

export default function inforOrder(state = initialState, action) {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state,
        oneOrder: action.payload,
      };
    case "REMOVE_ONEORDER":
      return {
        ...state,
        oneOrder: null,
      };
    default:
      return state;
  }
}
