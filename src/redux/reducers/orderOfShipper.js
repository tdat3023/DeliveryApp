export const SET_ORDEROFSHIPPER = "SET_ORDEROFSHIPPER";
const initialState = {
  data: null,
};

export const setOrderOfShipper = (data) => ({
  type: "SET_ORDEROFSHIPPER",
  payload: data,
});

const dataOrderOfShipper = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDEROFSHIPPER":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default dataOrderOfShipper;
