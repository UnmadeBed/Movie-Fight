// This function places a time delay on network requests. It will only make a network request once a
// period of one second of no input has passed.

const debounce = (func, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay)
  };
};