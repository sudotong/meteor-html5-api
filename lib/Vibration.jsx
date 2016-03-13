_H5Vibration = class {
    constructor () {
        window.navigator = window.navigator || {};
        this.isSupported = !(navigator.vibrate === undefined);
    }

    vibrate (times = null) {
        if (this.isSupported) {
            if (times == null)
                navigator.vibrate(1000);
            else {
                if (typeof times == "array")
                    navigator.vibrate(times);
                else if (typeof times == "int") {
                    let arr = [];
                    for (let i = 0; i < times; i++) {
                        arr.push(1000);
                        arr.push(500);
                    }
                    navigator.vibrate(arr);
                }
            }
        }
    }

    stop () {
        if (this.isSupported)
            navigator.vibrate(0);
    }
};