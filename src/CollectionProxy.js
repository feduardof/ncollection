var Interable = require("./Interable");

class CollectionProxy  {
	constructor(value) {
		// this.data = value._data;
		this.__proto__ = new Proxy(value, {
			get: this.get,
			// set: this.set,
			// apply: this.apply,
			ownKeys(target) {
				// console.log('ownKeys');
				// console.log(target.interableKeys());
				return target.interableKeys();
			},
			// getPrototypeOf(target) {
			// 	console.log('getPrototypeOf');
			// 	// console.log(target);
			// 	return target._data;
			// },
			getOwnPropertyDescriptor(target, prop) {
				// console.log(`Chamando propriedade: ${prop}`);
				let configurable = true;
				let enumerable = true;
				let value = target._data[prop];
				// console.log(value);
				// if (prop == 'constructor') {
				// 	value = target._data;
				// }
				return { configurable, enumerable, value };
			},
			// has(target, key) {
			// 	console.log("has: "+key);				
			// 	return true;
			// },
			// apply (target, thisArg, argumentsList) {
			// 	console.log(`Apply:`);
			// }
		});
	}
	get(obj, prop, receiver) {
		// console.log("- Obtendo prop: " + prop);
		let valueReflect = Reflect.get(obj, prop, receiver);
		// console.log(typeof(valueReflect));
		if (prop == Symbol.iterator) { return () => { return new Interable(obj._data); }; }
		if (typeof valueReflect === "function") return (...args) => { return valueReflect.apply(obj, args); };
		

		return valueReflect;
		
		// if (prop in obj) {
		// 	console.log('-- Tem no objeto!');
		// 	if (typeof isMethod === 'function' ) {
		// 		console.log('function');
		// 	}
		// 	return isMethod;
		// }


		// try {
		// console.log('Obtendo prop: '+prop);

		// if (prop in obj) {
		// 	console.log(". objeto");
		// 	console.log(obj[prop]);
		// 	// console.log(Reflect.get(obj, prop, receiver));
		// 	if (typeof obj[prop] == "function") {
		// 		return (...dados) => { 
		// 			console.log("... Dados como parametro");
		// 			console.log(dados);
		// 			obj[prop](...dados);
		// 		};
		// 	}
		// 	return Reflect.get(obj, prop, receiver);
		// }

		// if (prop in obj._data) {
		// 	console.log(". array");
		// 	console.log('.. Tipo: ' + typeof obj._data[prop]);
		// 	if (typeof obj._data[prop] == "function") {
		// 		return (...dados) => obj._data[prop](...dados);
		// 	}
		// 	return Reflect.get(obj._data, prop, receiver);
		// }

		// if (obj._getValueInPosition(parseInt(prop))) {
		// 	return obj._getValueInPosition(parseInt(prop));
		// }

		// if (prop == Symbol.iterator) {
		// 	return () => { return new Interable(obj._data); };
		// }

		// if (prop == 'inspect') {
		// 	return JSON.parse(JSON.stringify(obj._data));
		// }

		// console.log("retorno undefined");
		// return undefined;

		// }catch(e) {
		// 	return undefined;
		// }
	}
	set(obj, prop, value) {
		obj._data[prop] = value;
		obj.interableSetData(obj._data);
		return true;
	}
	// apply(target, receiver, args) {
        
	// 	return Reflect.apply(target, receiver, args);
	// }
	// next() {
	// 	return this.__proto__.next();
	// }
}

module.exports = CollectionProxy;