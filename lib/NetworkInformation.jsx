_H5NetworkInformation = class {
    constructor () {
        this.connection = window.navigator.connection || window.navigator.mozConnection || null;
        this.isSupported = this.connection !== null;
        if (this.isSupported) {
            this.isMetered = ("metered" in this.connection);
            this.bandwidth = null;
            this.metered = null;
            this.type = null;
            if (this.isMetered) {
                this.connection.addEventListener("change", (event) => {
                    this.bandwidth = this.connection.bandwidth;
                    this.metered = (this.connection.metered ? "" : "not ") + "metered";
                });
                this.connection.dispatchEvent(new Event("chagne"));
            } else {
                this.connection.addEventListener("typechange", (event) => {
                    this.type = this.connection.type;
                });
            }
        }
    }

    get connectionInformation () {
        if (this.isMetered) {
            return {
                bandwidth: this.bandwidth,
                metered  : this.metered
            }
        } else {
            return this.type;
        }
    }
};