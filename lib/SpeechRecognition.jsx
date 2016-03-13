_H5SpeechRecognition = class {
    constructor () {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
        this.isSupported = !(window.SpeechRecognition == null);
        this.recognizer = new window.SpeechRecognition();
        this.recognizer.continuous = true;
    }

    start (callback, intrimResults = true) {
        if (this.isSupported) {
            this.recognizer.onresult = (event) => {
                let resultText = "";
                let result = {};
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[ i ].isFinal) {
                        resultText = event.results[ i ][ 0 ].transcript;
                        result = {
                            text      : resultText,
                            confidence: event.results[ i ][ 0 ].confidence,
                            isFinal   : true
                        };
                    } else {
                        resultText += event.results[ i ][ 0 ].transcript;
                        result = {
                            text   : resultText,
                            isFinal: false
                        };
                    }
                }
                callback(null, result)
            };
            this.recognizer.onerror = (event) => callback(event, null);
            this.recognizer.interimResults = intrimResults;
            try {
                this.recognizer.start();
            } catch (ex) {
                callback(ex, null);
            }
        }
    }

    stop () {
        if (this.isSupported) this.recognizer.stop();
    }
};