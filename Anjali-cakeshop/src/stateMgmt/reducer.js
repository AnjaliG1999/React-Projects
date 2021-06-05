export const initialState = {
  user: null,
  query: "",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
};

export default reducer;
