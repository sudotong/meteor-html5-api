_H5GetUserMedia = class {
    constructor () {
        window.navigator = window.navigator || {};
        this._navigator = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || null;
        this.isSupported = navigator.getUserMedia !== null;
        this.audioContext = window.AudioContext || window.webkitAudioContext || null;
        this.isAudioSupported = this.audioContext !== null;
        this.video = true;
        this.audio = true;
        this.videoStream = null;
        this._createSrc = window.URL ? window.URL.createObjectURL : function (stream) {
            return stream;
        };
    }

    set getAudio (getAudio) {
        this.audio = getAudio;
    }

    set getVideo (getVideo) {
        this.video = getVideo;
    }

    getStream (callback) {
        if (this.isSupported) {
            this._navigator({
                video: this.video,
                audio: this.audio
            }, (stream) => {
                this.videoStream = this._createSrc(stream);
                callback(null, stream);
            }, (err) => {
                callback(err, null);
            });
        } else {
            callback("Unsupported", null);
        }
    }

    stop () {
        if (this.videoStream !== null) this.videoStream.stop();
    }
};