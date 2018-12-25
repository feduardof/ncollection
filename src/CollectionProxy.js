class CollectionProxy {
    constructor(value, handler) {
        this.data = value._data;
        this.__proto__ = new Proxy(value, {
            get: this.get,
            set: this.set,
            apply: this.apply
        });
    }
    get(obj, prop, receiver) {

        try {

            if (prop in obj) {
                if (typeof obj[prop] == 'function') {
                    return (...dados) => obj[prop](...dados);
                }
                return Reflect.get(obj, prop, receiver);
            }

            if (prop in obj._data) {
                if (typeof obj._data[prop] == 'function') {
                    return (...dados) => obj._data[prop](...dados);
                }
                return Reflect.get(obj._data, prop, receiver);
            }

            if (obj._getValueInPosition(parseInt(prop))) {
                return obj._getValueInPosition(parseInt(prop));
            }

            if (prop == Symbol.iterator) {
                return () => { return new Interable(obj._data) };
            }

            return undefined;

        }catch(e) {
            return undefined;
        }
    }
    set(obj, prop, value) {

        obj._data[prop] = value;
        obj.interableSetData(obj._data);
        return true;
    }
    apply(target, receiver, args) {
        
        return Reflect.apply(target, receiver, args);
    }
    next() {
        return this.__proto__.next();
    }
}

module.exports = CollectionProxy;