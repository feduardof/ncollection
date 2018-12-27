const Interable = require("./Interable");
const CollectionProxy = require("./CollectionProxy");

class Collection extends Interable  {
    
	constructor(data) {
		super(data);
		this._data = data;
		// this.__proto__ = new CollectionProxy(this);
		return new CollectionProxy(this);
	} 

	_getValueByDot (campo, value) {
		let strCampo = campo.split(".");
		let valueTemp = value;
		strCampo.find(item => {
			valueTemp = valueTemp[item];
		});
		return valueTemp;
	}

	groupBy(campo) {
		let retorno = {};
		let arrayData = [ ...this._data ];
        
		arrayData.forEach(item => {
			let value = this._getValueByDot(campo, item);
			if (!retorno[value]) retorno[value] = [];
			retorno[value].push(item);
		});

		return new Collection(retorno);
	}
	forEach(fc) {
		if (typeof this._data.forEach == "function") {
			this._data.forEach(fc);
		} else {
			let interable = new Interable(this._data);
			let index = 0;
			for (let value of interable) {
				let namedIndex = this._getPropertyInPosition(index);
				fc(value, namedIndex);
				index++;
			}

		}
	}
	find(fc) {
		if (typeof this._data.find == "function") {
			return this._data.find(fc);
		} else {
			let interable = new Interable(this._data);
			let index = 0;
			for (let value of interable) {
				let namedIndex = this._getPropertyInPosition(index);
				let success = fc(value, namedIndex);
				index++;
				if (success) {
					return value;
				}
			}
		}
	}
	filter(fc) {
		if (typeof this._data.filter == "function") {
			let retorno = this._data.filter(fc);
			return retorno.length > 0 ? new Collection(retorno) : undefined;
		} else {
			let retorno = {};
			let interable = new Interable(this._data);
			let index = 0;
			for (let value of interable) {
				let namedIndex = this._getPropertyInPosition(index);
				let success = fc(value, namedIndex);
				index++;
				if (success) {
					retorno[namedIndex] = value;
				}
			}
			return Object.keys(retorno).length > 0 ? new Collection(retorno) : undefined;
		}
	}
	map(fc) {
		let retorno = [];
		let interable = new Interable(this._data);
		let index = 0;
		for (let value of interable) {
			let namedIndex = this._getPropertyInPosition(index);
			retorno.push(fc(value, namedIndex));
			index++;
		}
		return new Collection(retorno);
	}
	push(firstParam,secondParam) {
		if (typeof this._data.push == "function") {
			this._data.push(firstParam);
		} else {
			if(!secondParam) throw Error("To push collection type of object, need second param collection.push(Name,Value)");
			this._data[firstParam] = secondParam;
		}
		this.interableSetData(this._data);
		return this;
	}
	delete(fc) {
		// let data = this._data instanceof Array ? [...this._data] : { ...this._data };
		let interable = new Interable(this._data);
		let index = 0;

		let removeData = (index) => {
			if (this._data instanceof Array) {
				this._data.splice(index, 1);
			} else {
				if (typeof index == "number") index = this._getPropertyInPosition(index);
				Reflect.deleteProperty(this._data, index);
			}
		};

		if (typeof fc == "number" || typeof fc == "string" ) {
			removeData(fc);
		} else if (typeof fc == "function" ) {
			for (let value of interable) {
				let namedIndex = this._getPropertyInPosition(index);
				let retornoRemove = fc(value, namedIndex);
				
				if (retornoRemove) {
					removeData(index);
				}
				index++;
			}
		} else if (typeof fc == "object" && fc instanceof Array) {
			for (let index of fc) {
				removeData(index);
			}
		}

		this.interableSetData(this._data);
		return this;
	}
    
}


module.exports = Collection;