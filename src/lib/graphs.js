export const GRAPH_COLORS = [
  "#06D6A0",
  "#FFD166",
  "#EF476F",
  "#118AB2",
  "#F26419",
  "#4357AD",
  "#DB222A"
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const AUDIO_FEATURES = [
  "popularity",
  "liveness",
  "valence",
  "instrumentalness",
  "danceability",
  "speechiness",
  "acousticness"
];

export const movingAverage = (array, windowSize = 0) => {
    const newArray = [];
    if (!windowSize) {
      return array;
    }
    for (let i = 0; i < array.length; i++) {
      const start = i - windowSize;
      const end = i + windowSize;
      const actualStart = start >= 0 ? start : 0;
      const actualEnd = end < array.length ? end : array.length - 1;
  
      const sample = array.slice(actualStart, actualEnd);
      newArray.push(
        sample.reduce((acc, val) => {
          acc += val;
          return acc;
        }, 0) / sample.length
      );
    }
    return newArray;
  };
  