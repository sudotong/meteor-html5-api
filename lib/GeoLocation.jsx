_H5GeoLocation = class {
    constructor () {
        this.isSupported = (window.navigator && window.navigator.geolocation);
        this.options = {
            enableHighAccuracy: true,
            timeout           : 10 * 1000, // 10 seconds
            maximumAge        : 30 * 1000 // 30 seconds
        };
        this.position = {
            latitude        : null,
            longitude       : null,
            accuracy        : null,
            altitude        : null,
            altitudeAccuracy: null,
            heading         : null,
            speed           : null,
            timestamp       : null
        };
    }

    enableHighAccuracy (enable) {
        this.options.enableHighAccuracy = enable;
    }

    timeout (timeout) {
        this.options.timeout = timeout;
    }

    maximumAge (maximumAge) {
        this.options.maximumAge = maximumAge;
    }

    getLocation (callback) {
        if (this.isSupported) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.position.latitude = position.coords.latitude || null;
                this.position.longitude = position.coords.longitude || null;
                this.position.accuracy = position.coords.accuracy || null;
                this.position.altitude = position.coords.altitude || null;
                this.position.altitudeAccuracy = position.coords.altitudeAccuracy || null;
                this.position.heading = position.coords.heading || null;
                this.position.speed = position.coords.speed || null;
                this.position.timestamp = position.timestamp;
                callback(null, this.position);
            }, (err) => {
                callback(err, null);
            }, this.options);
        } else {
            callback("Unsupported", null);
        }
    }

    watch (callback) {
        if (this.isSupported) {
            let watchId = navigator.geolocation.watchPosition((position) => {
                this.position.latitude = position.coords.latitude || null;
                this.position.longitude = position.coords.longitude || null;
                this.position.accuracy = position.coords.accuracy || null;
                this.position.altitude = position.coords.altitude || null;
                this.position.altitudeAccuracy = position.coords.altitudeAccuracy || null;
                this.position.heading = position.coords.heading || null;
                this.position.speed = position.coords.speed || null;
                this.position.timestamp = position.timestamp;

                callback(null, { result: this.position, watchId: watchId });
            }, (err) => {
                callback(err, null);
            }, this.options);
        } else {
            callback("Unsupported", null);
        }
    }

    stopWatching (watchId) {
        if (this.isSupported && watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
        } else {
            return false;
        }
    }
};