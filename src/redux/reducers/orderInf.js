export const CAP_NHAT_STATUS = "CAP_NHAT_STATUS";
const initialState = {
  data: [],
};

export default function actionForOrder(state = initialState, action) {
  switch (action.type) {
    case CAP_NHAT_STATUS:
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            status: action.status,
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}
