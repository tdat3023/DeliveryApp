export const SET_SHIPPER = "SET_SHIPPER";
export const LOGOUT_SHIPPER = "LOGOUT_SHIPPER";
const initialState = {
  shipper: null,
};

export const setShipper = (data) => ({
  type: "SET_SHIPPER",
  payload: data,
});

export const logoutShipper = () => ({
  type: LOGOUT_SHIPPER,
});

// const infoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_SHIPPER":
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };
// export default infoReducer;

export default infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIPPER:
      return {
        ...state,
        shipper: action.payload,
      };
    case LOGOUT_SHIPPER:
      return {
        ...state,
        shipper: null,
      };
    default:
      return state;
  }
};
