// export const CAP_NHAT_STATUS = "CAP_NHAT_STATUS";
export const SET_DATA = "SET_DATA";
const initialState = {
  data: [],
};

// export default function actionForOrder(state = initialState, action) {
//   switch (action.type) {
//     case CAP_NHAT_STATUS:
//       return state.map((item) => {
//         if (item.id === action.id) {
//           return {
//             ...item,
//             status: action.status,
//           };
//         } else {
//           return item;
//         }
//       });
//     default:
//       return state;
//   }
// }
// export const setData = (data) => ({
//   type: "SET_DATA",
//   payload: data,
// });

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
