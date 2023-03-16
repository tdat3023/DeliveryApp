export const CAP_NHAT_STATUS = "CAP_NHAT_STATUS";
const initialState = {
  diachiNN: "",
  toado: "",
  id: "",
  image: "",
  sdtNN: "",
  status: "",
};

export default function actionForOrder(state = initialState, payload) {
  switch (payload.type) {
    case "CAP_NHAT_STATUS":
      return {
        ...state,
        status: payload.status,
      };
    default:
      return state;
  }
}
