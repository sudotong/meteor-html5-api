_H5PageVisibility = class {
    constructor () {
        let hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
        let visibilityStateProperty = 'visibilityState' in document ? 'visibilityState' : 'webkitVisibilityState' in document ? 'webkitVisibilityState' : 'mozVisibilityState' in document ? 'mozVisibilityState' : null;
        this.isSupported = !(hiddenProperty === null || visibilityStateProperty === null);
    }

    state () {
        if (this.isSupported) {
            let visibilityStateProperty = 'visibilityState' in document ? 'visibilityState' : 'webkitVisibilityState' in document ? 'webkitVisibilityState' : 'mozVisibilityState' in document ? 'mozVisibilityState' : null;
            return document[ visibilityStateProperty ];
        } else {
            return false;
        }
    }

    onChange (callback) {
        let hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
        let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        document.addEventListener(visibilityChangeEvent, callback);
    }
};