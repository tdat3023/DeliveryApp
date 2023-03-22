// export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_STATUS = "UPDATE_STATUS";
const initialState = {
  updateStatus: null,
};

export const setStatus = (data) => ({
  type: "UPDATE_STATUS",
  payload: data,
});

export default function inforReducer(state = initialState, payload) {
  switch (payload.type) {
    case "UPDATE_STATUS":
      return {
        ...state,
        updateStatus: payload.updateStatus,
      };
    default:
      return state;
  }
}
