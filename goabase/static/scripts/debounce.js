export default function debounce(func, milliseconds, immediate = false) {
  let timeout;

  function clear() {
    clearTimeout(timeout);
  }

  function throttle(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }
    const callNow = immediate && !timeout;

    clear();
    timeout = setTimeout(later, milliseconds);

    if (callNow) {
      func.apply(this, args);
    }
  }

  throttle.clear = clear;
  return throttle;
}
