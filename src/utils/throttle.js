 const throttle = (callback, time) => {
    let throttleTimer;

    return (...args) => {
        if (throttleTimer) return;
        throttleTimer = true;
        setTimeout(() => {
            callback(...args);
            throttleTimer = false;
        }, time);
    }
}

export default throttle