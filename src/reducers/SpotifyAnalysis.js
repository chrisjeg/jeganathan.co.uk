import {
  INCREMENT_WINDOW_SIZE,
  DECREMENT_WINDOW_SIZE,
  TOGGLE_DOMAIN,
  SET_SELECTED_FEATURE,
  SET_HOVERED_FEATURE,
  SET_HOVERED_YEAR
} from "../actions/SpotifyAnalysis";

const MAX_WINDOW_SIZE = 6;

export const initialState = {
  selectedFeature: "popularity",
  hoveredYear: false,
  hoveredFeature: undefined,
  windowSize: 0,
  isDomainFixed: false
};

export default function reducer(state, action) {
  switch (action.type) {
    case INCREMENT_WINDOW_SIZE:
      return {
        ...state,
        windowSize:
          state.windowSize < MAX_WINDOW_SIZE
            ? state.windowSize + 1
            : MAX_WINDOW_SIZE
      };
    case DECREMENT_WINDOW_SIZE:
      return {
        ...state,
        windowSize: state.windowSize > 0 ? state.windowSize - 1 : 0
      };
    case TOGGLE_DOMAIN:
      return { ...state, isDomainFixed: !state.isDomainFixed };
    case SET_SELECTED_FEATURE:
      return { ...state, selectedFeature: action.feature };
    case SET_HOVERED_FEATURE:
      return { ...state, hoveredFeature: action.feature };
    case SET_HOVERED_YEAR:
      return { ...state, hoveredYear: action.year };
    default:
      return state;
  }
}
