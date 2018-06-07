_H5SpeechSynthesis = class {
    constructor () {
        this.isSupported = !(window.SpeechSynthesisUtterance === undefined);
        if(this.isSupported) {
            this._initiateVoices();
            this._loadVoices();
            this.rate = 1;
            this.pitch = 1;
        }
    }

    speak (text, startCallback = null, endCallback = null) {
        if (this.isSupported) {
            let utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.voice = this.selectedVoice;
            utterance.lang = this.selectedVoice.lang;
            utterance.rate = this.rate;
            utterance.pitch = this.pitch;
            if (startCallback) utterance.addEventListener('start', startCallback);
            if (endCallback) utterance.addEventListener('end', endCallback);
            window.speechSynthesis.speak(utterance);
        } else {
            return false;
        }
    }

    getVoices() {
        return this.voices;
    }

    stop () {
        if (this.isSupported) window.speechSynthesis.cancel();
    }

    pause () {
        if (this.isSupported) window.speechSynthesis.pause();
    }

    resume () {
        if (this.isSupported && window.speechSynthesis.paused === true) window.speechSynthesis.resume();
    }

    setRate (rate) {
        if (rate >= 0.1 && rate <= 10) {
            this.rate = rate;
        }
    }

    setPitch (pitch) {
        if (pitch >= 0.1 && pitch <= 2) {
            this.pitch = pitch;
        }
    }

    setVoice (lang) {
        _.each(this.voices, (voice) => {
            if (lang == voice.lang) this.selectedVoice = voice;
        });
    }

    setVoiceByUri(uri) {
        _.each(this.voices, (voice) => {
            if(uri == voice.uri) this.selectedVoice = voice;
        });
    }

    _initiateVoices () {
        if (this.isSupported) {
            this.voices = window.speechSynthesis.getVoices().map(voice => {
                voice.uri = voice.voiceURI;
                return voice;
            });
        }
    }

    _loadVoices () {
        if (this.isSupported && typeof window.speechSynthesis.addEventListener == "function") {
            window.speechSynthesis.addEventListener("voiceschanged", () => {
                this._initiateVoices();
            });
        }
    }
};
