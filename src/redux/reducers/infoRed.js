export const CAP_NHAT_IMAGE = "CAP_NHAT_IMAGE";
export const CAP_NHAT_PASSWORD = "CAP_NHAT_PASSWORD";
const initialState = {
  sdt: "",
  password: "",
  id: "",
  image: "",
};

export default function inforReducer(state = initialState, payload) {
  switch (payload.type) {
    case "CAP_NHAT_PASSWORD":
      return {
        ...state,
        password: payload.password,
      };
    case "CAP_NHAT_IMAGE":
      return {
        ...state,
        image: payload.image,
      };
    default:
      return state;
  }
}
