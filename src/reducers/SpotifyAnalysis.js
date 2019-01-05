import {
  INCREMENT_WINDOW_SIZE,
  DECREMENT_WINDOW_SIZE,
  TOGGLE_DOMAIN,
  SET_SELECTED_ITEM,
  SET_HOVERED_YEAR
} from "../actions/SpotifyAnalysis";

const MAX_WINDOW_SIZE = 6;

const initialState = {
  selectedItem: "popularity",
  hoveredYear: false,
  windowSize: 0,
  setDomain: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_WINDOW_SIZE:
      return {
        windowSize: state.windowSize < MAX_WINDOW_SIZE ? state.windowSize + 1 : MAX_WINDOW_SIZE
      }
    case DECREMENT_WINDOW_SIZE:
      return {
        windowSize: state.windowSize > 0 ? state.windowSize - 1 : 0
      }
    case TOGGLE_DOMAIN:
      return {
        setDomain: !state.setDomain
      }
    case SET_SELECTED_ITEM:
      return {
        selectedItem: action.item
      }
    case SET_HOVERED_YEAR:
      return {
        hoveredYear: action.year
      }
    default:
      return state;
  }
}