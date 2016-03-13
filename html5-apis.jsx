Html5Api = class {
    constructor () {
        this._geoLocation = null;
        //this._getUserMedia = null;
        this._networkInformation = null;
        this._pageVisibility = null;
        this._speechSynthesis = null;
        this._vibration = null;
        this._webNotification = null;
        this._speechRecognition = null;
    }

    geoLocation () {
        if (this._geoLocation == null) {
            this._geoLocation = new _H5GeoLocation();
            if (this._geoLocation.isSupported) {
                return this._geoLocation;
            } else {
                this._geoLocation = null;
                return false;
            }
        } else {
            return this._geoLocation;
        }
    }

    //getUserMedia () {
    //    if (this._getUserMedia == null) {
    //        this._getUserMedia = new _H5GetUserMedia();
    //        if (this._getUserMedia.isSupported) {
    //            return this._getUserMedia;
    //        } else {
    //            this._getUserMedia = null;
    //            return false;
    //        }
    //    } else {
    //        return this._getUserMedia;
    //    }
    //}

    networkInformation () {
        if (this._networkInformation == null) {
            this._networkInformation = new _H5NetworkInformation();
            if (this._networkInformation.isSupported) {
                return this._networkInformation;
            } else {
                this._networkInformation = null;
                return false;
            }
        } else {
            return this._networkInformation
        }
    }

    pageVisibility () {
        if (this._pageVisibility == null) {
            this._pageVisibility = new _H5PageVisibility();
            if (this._pageVisibility.isSupported) {
                return this._pageVisibility;
            } else {
                this._pageVisibility = null;
                return false;
            }
        } else {
            return this._pageVisibility;
        }
    }

    speechSynthesis () {
        if (this._speechSynthesis == null) {
            this._speechSynthesis = new _H5SpeechSynthesis();
            if (this._speechSynthesis.isSupported) {
                return this._speechSynthesis;
            } else {
                this._speechSynthesis = null;
                return false;
            }
        } else {
            return this._speechSynthesis;
        }
    }

    vibration () {
        if (this._vibration == null) {
            this._vibration = new _H5Vibration();
            if (this._vibration.isSupported) {
                return this._vibration;
            } else {
                this._vibration = null;
                return false;
            }
        } else {
            return this._vibration;
        }
    }

    webNotification () {
        if (this._webNotification == null) {
            this._webNotification = new _H5WebNotification();
            if (this._webNotification.isSupported) {
                return this._webNotification;
            } else {
                this._webNotification = null;
                return false;
            }
        } else {
            return this._webNotification;
        }
    }

    speechRecognition () {
        if (this._speechRecognition == null) {
            this._speechRecognition = new _H5SpeechRecognition();
            if (this._speechRecognition.isSupported) {
                return this._speechRecognition;
            } else {
                this._speechRecognition = null;
                return false;
            }
        } else {
            return this._speechRecognition;
        }
    }
};