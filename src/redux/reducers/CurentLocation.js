export const SET_LOCATION = "SET_LOCATION";
const initialState = {
  // location: { latitude: 106.665633, longitude: 10.813301 },
  location: {},
};

export const setLocation = (location) => ({
  type: "SET_LOCATION",
  payload: location,
});

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
