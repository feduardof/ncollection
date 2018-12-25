class Interable {
    constructor(data) {
        this.interableSetData(data);
        this[Symbol.iterator] = () => { return this };
    }

    interableSetData(data) {
        this._dataInterable = data;
        this._interablePosition = 0;
        this._firstInteration = true;
        if (!(data instanceof Array) && typeof data == 'object') {
            this._namesIndex = Object.keys(data);
        }
    }

    _getValueInPosition(index) {
        if (this._dataInterable instanceof Array) return this._dataInterable[index];
        else if (typeof this._dataInterable == 'object') return this._dataInterable[this._namesIndex[index]];
    }
    _getPropertyInPosition(index) {
        if (this._dataInterable instanceof Array) return index;
        else if (typeof this._dataInterable == 'object') return this._namesIndex[index];
    }
    get length() {
        return this._namesIndex ? this._namesIndex.length : this._dataInterable.length;
    }

    next() {
        if (!this._firstInteration) { this._interablePosition++ }
        let done = this.length == this._interablePosition;
        let value = this._getValueInPosition(this._interablePosition);
        this._firstInteration = false;
        return { value, done };
    }
}


module.exports = Interable;