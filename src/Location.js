export class Location {

    constructor() {
        this._name = "Current Location";
        this._lat = null;
        this._lon = null;
        this._unit = "metric"
    }

    getName() {
        return this._name;
    }

    setName(name) {
        return this._name = name;
    }

    getLat() {
        return this._lat;
    }

    setLat(lat) {
        return this._lat = lat;
    }
    
    getLon() {
        return this._lon;
    }

    setLon(lon) {
        return this._lon = lon;
    }

    getUnit() {
        return this._unit;
    }

    setUnit(unit) {
        return this._unit = unit;
    }

    toggleUnit() {
        return this._unit = this._unit === "metric" ? "imperial" : "metric";
    }
}