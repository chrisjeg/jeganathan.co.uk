export const INCREMENT_WINDOW_SIZE = "INCREMENT_WINDOW_SIZE";
export const DECREMENT_WINDOW_SIZE = "DECREMENT_WINDOW_SIZE";
export const TOGGLE_DOMAIN = "TOGGLE_DOMAIN";
export const SET_HOVERED_FEATURE = "SET_HOVERED_FEATURE";
export const SET_SELECTED_FEATURE = "SET_SELECTED_FEATURE";
export const SET_HOVERED_YEAR = "SET_HOVERED_YEAR";

export const incrementWindowSize = () => ({ type: INCREMENT_WINDOW_SIZE });
export const decrementWindowSize = () => ({ type: DECREMENT_WINDOW_SIZE });
export const toggleDomain = () => ({ type: TOGGLE_DOMAIN });
export const setSelectedFeature = feature => ({ type: SET_SELECTED_FEATURE, feature });
export const setHoveredFeature = feature => ({ type: SET_HOVERED_FEATURE, feature });
export const setHoveredYear = year => ({ type: SET_HOVERED_YEAR, year});