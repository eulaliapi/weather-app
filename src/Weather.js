export class Weather {
    constructor() {
        this._name = "Your position";
        this._temp = null;
        this._feelsLike = null;
        this._description = null;
        this._icon = null;
    }

    getName() {
        return this._name;
    }

    setName(name) {
       return this._name = name;
    }

    getTemp() {
        return this._temp;
    }

    setTemp(temp) {
        return this._temp = temp;
    }

    getFeelsLike() {
        return this._feelsLike;
    }

    setFeelsLike(feelsLike) {
        return  this._feelsLike = feelsLike;
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        return this._description = description;
    }

    getIcon() {
        return this._icon;
    }

    setIcon(icon) {
        return this._icon = icon
    }
    
}
