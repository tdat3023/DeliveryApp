export const SET_SHIPPER = "SET_SHIPPER";
const initialState = {
  shipper: null,
};

export const setData = (data) => ({
  type: "SET_SHIPPER",
  payload: data,
});

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHIPPER":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default infoReducer;
