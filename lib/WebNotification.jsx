_H5WebNotification = class {
    constructor() {
        this.isSupported = ('Notification' in window);
        if (this.isSupported) {
            Notification.requestPermission((result) => {
                this.permission = result;
            });
        }
        this.options = {};
    }

    defaultOptions(options) {
        this.options = _.extend(this.options, options);
    }

    requestPermissions() {
        Notification.requestPermission();
    }

    notify(title, text, options = {}, eventOptions = {}) {
        options = _.extend(this.options, options);
        options.body = text;
        if (this.isSupported && this.permission == "granted") {
            let notification = new Notification(title, options);
            _.each(eventOptions, (callback, eventName) => {
                notification[eventName] = (event) => callback(event, notification);
            });
        }
    }
};
