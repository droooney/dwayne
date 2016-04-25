import D from '../../';
import methods from '../../methods';
import { validate, defineProperties } from '../../libs';

const NativeObject = Object;

const cls = class Object {
	constructor(object = {}) {
		defineProperties(this, { $: object });
	}

	array(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);
		const a = [];

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				const value = object[key];

				mapFn(a, value, array ? Number(key) : key, object);
			}
		}

		return new D.Array(a);
	}
	assign() {
		const object = this.$,
			length = arguments.length;

		for (let i = 0; i < length; i++) {
			const o = transform(arguments[i]);

			for (const key in o) {
				if (o.hasOwnProperty(key)) {
					object[key] = o[key];
				}
			}
		}

		return this;
	}
	average(mapFn = null) {
		return this.sum(mapFn) / this.count;
	}
	call(f) {
		validate([f], ['function']);

		const g = f;
		Array.prototype.shift.call(arguments);

		return g.apply(this, arguments);
	}
	// TODO: .copy()
	get count() {
		const object = this.$;

		if (!methods.isObject(object)) {
			return 0;
		}

		return NativeObject.keys(object).length;
	}
	// TODO: .deepAssign()
	// TODO: .deepCopy()
	deepEquals(o = null) {
		return deepEqual(this.$, o);
	}
	deepEvery(mapFn, n) {
		if (arguments.length === 1 && !methods.isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepEvery(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepFilter(mapFn, n) {
		if (arguments.length === 1 && !methods.isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		const filtered = deepFilter(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return methods.isArrayAlike(filtered) ? new D.Array(filtered) : new Object(filtered);
	}
	deepFind(mapFn, n) {
		if (arguments.length === 1 && !methods.isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		return deepFind(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepFreeze() {
		deepFreeze(this.$);

		return this;
	}
	deepMap(mapFn, n = 1) {
		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		const map = deepMap(this.$, mapFn, n, [{ key: null, value: this.$ }]);

		return methods.isArrayAlike(map) ? new D.Array(map) : new Object(map);
	}
	deepReduce(mapFn, n = 1, IV) {
		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepReduce(this.$, mapFn, n, false, IV, [{ key: null, value: this.$ }]);
	}
	deepSome(mapFn, n) {
		if (arguments.length === 1 && !methods.isFunction(mapFn)) {
			n = mapFn;
			mapFn = Boolean;
		} else if (arguments.length === 1) {
			n = 1;
		} else if (!arguments.length) {
			n = 1;
			mapFn = Boolean;
		}

		validate([mapFn, n], ['function', ['intAlike', '>0']]);

		n = Number(n);

		return deepSome(this.$, mapFn, n, [{ key: null, value: this.$ }]);
	}
	deepStrictEquals(o = null) {
		return deepStrictEqual(this.$, o);
	}
	define(property, descriptor) {
		if (arguments.length >= 2) {
			property = { [property]: descriptor };
		}

		property = transform(property);

		if (methods.isObject(this.$)) {
			NativeObject.defineProperties(this.$, property);
		}

		return this;
	}
	['delete']() {
		const object = this.$;

		if (object) {
			for (let i = 0, length = arguments.length; i < length; i++) {
				delete object[arguments[i]];
			}
		}

		return this;
	}
	equals(o) {
		o = transform(o);

		return this.$ == o;
	}
	every(mapFn = Boolean) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				if (!mapFn(object[key], array ? Number(key) : key, object)) {
					return false;
				}
			}
		}

		return true;
	}
	filter(mapFn = Boolean) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);
		const nul = methods.isNull(this.$);
		const o = array ? [] : nul ? null : {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				if (mapFn(value, array ? Number(key) : key, object)) {
					o[key] = value;
				}
			}
		}

		return array ? new D.Array(o) : new Object(o);
	}
	find(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				if (mapFn(value, array ? Number(key) : key, object)) {
					return { key, value };
				}
			}
		}

		return null;
	}
	forEach(mapFn = Boolean) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				mapFn(object[key], array ? Number(key) : key, object);
			}
		}

		return this;
	}
	freeze() {
		NativeObject.freeze(this.$);

		return this;
	}
	get(property, getter) {
		if (arguments.length >= 2) {
			property = { [property]: getter };
		}

		const object = this.$;

		property = transform(property);

		if (methods.isObject(object)) {
			for (const key in property) {
				if (property.hasOwnProperty(key)) {
					NativeObject.defineProperty(object, key, { get: property[key] });
				}
			}
		}

		return this;
	}
	has(key) {
		const object = this.$;

		if (!methods.isObject(object)) {
			return false;
		}

		return key in object;
	}
	hasOwn(key) {
		const object = this.$;

		if (!methods.isObject(object)) {
			return false;
		}

		return object.hasOwnProperty(key);
	}
	// TODO: .instanceof()
	isFrozen() {
		return NativeObject.isFrozen(this.$);
	}
	json(f, indent) {
		if (arguments.length === 1 && !methods.isFunction(f)) {
			indent = f;
			f = null;
		} else if (!arguments.length) {
			f = null;
		}

		validate([f], ['function||!']);

		return JSON.stringify(this.$, function (key, value) {
			value = transform(value);

			return f ? f.apply(null, arguments) : value;
		}, indent);
	}
	keyOf(value) {
		const object = this.$;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				const val = object[key];

				if (val == value || (methods.isNaN(val) && methods.isNaN(value))) {
					return key;
				}
			}
		}

		return null;
	}
	keyOfStrict(value) {
		const object = this.$;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (object[key] === value) {
					return key;
				}
			}
		}

		return null;
	}
	keys() {
		const object = this.$;

		if (!methods.isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.keys(object));
	}
	log(method = 'log') {
		console[method](this);

		return this;
	}
	map(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);
		const nul = methods.isNull(object);
		const o = array ? [] : nul ? null : {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				o[key] = mapFn(object[key], key, object);
			}
		}

		return array ? new D.Array(o) : new Object(o);
	}
	max(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let max = { key: null, value: -Infinity };
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key],
					val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;

				if (val > max.value) {
					max = { key, value };
				}
			}
		}

		return max;
	}
	min(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let min = { key: null, value: Infinity };
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key],
					val = mapFn ? mapFn(value, array ? Number(key) : key, object) : value;

				if (val < min.value) {
					min = { key, value };
				}
			}
		}

		return min;
	}
	object(mapFn) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);
		const o = {};

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				mapFn(o, object[key], array ? Number(key) : key, object);
			}
		}

		return new Object(o);
	}
	propertyDescriptor(key) {
		const object = this.$;

		if (!methods.isObject(object)) {
			return;
		}

		return NativeObject.getOwnPropertyDescriptor(object, key);
	}
	propertyNames() {
		const object = this.$;

		if (!methods.isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.getOwnPropertyNames(object));
	}
	propertySymbols() {
		const object = this.$;

		if (!methods.isObject(object)) {
			return new D.Array();
		}

		return new D.Array(NativeObject.getOwnPropertySymbols(object));
	}
	proto(proto) {
		const object = this.$;

		if (arguments.length) {
			if (methods.isObject(object)) {
				NativeObject.setPrototypeOf(object, proto);
			}
			return this;
		}

		if (!methods.isObject(object)) {
			return;
		}

		return NativeObject.getPrototypeOf(object);
	}
	reduce(mapFn, IV) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let startKey;
		let iterated = 0;

		if (IV == null) {
			for (const key in object) {
				if (object.hasOwnProperty(key)) {
					startKey = key;
					iterated = 1;
					IV = object[key];
					break;
				}
			}
		}

		for (const key in object) {
			if (object.hasOwnProperty(key) && key != startKey) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				IV = mapFn(IV, object[key], array ? Number(key) : key, object);
			}
		}

		return IV;
	}
	set(property, setter) {
		if (arguments.length >= 2) {
			property = { [property]: setter };
		}

		property = transform(property);

		const object = this.$;

		if (methods.isObject(object)) {
			for (const key in property) {
				if (property.hasOwnProperty(key)) {
					NativeObject.defineProperty(object, key, { set: property[key] });
				}
			}
		}

		return this;
	}
	some(mapFn = Boolean) {
		validate([mapFn], ['function']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				if (mapFn(object[key], array ? Number(key) : key, object)) {
					return true;
				}
			}
		}

		return false;
	}
	strictEquals(o) {
		o = transform(o);

		return this.$ === o;
	}
	sum(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let sum = 0;
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				sum += Number(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
			}
		}

		return sum;
	}
	// TODO: .typeof()
	values() {
		const object = this.$;
		const array = [];

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				array.push(object[key]);
			}
		}

		return new D.Array(array);
	}
	word(mapFn = null) {
		validate([mapFn], ['function||!']);

		const object = this.$;
		const array = methods.isArrayAlike(object);

		let word = '';
		let iterated = 0;

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (array && iterated === object.length) {
					break;
				}

				iterated++;

				const value = object[key];

				word += String(mapFn ? mapFn(value, array ? Number(key) : key, object) : value);
			}
		}

		return word;
	}
};

function deepEqual(o1, o2) {
	o1 = transform(o1);
	o2 = transform(o2);

	if (methods.isNull(o1) && methods.isNull(o2)) {
		return true;
	}

	if (methods.isNull(o1) || methods.isNull(o2)) {
		return false;
	}

	if (
		o1 != o2 &&
		(!methods.isNaN(o1) || !methods.isNaN(o2)) &&
		NativeObject.keys(o1).length !== NativeObject.keys(o2).length
	) {
		return false;
	}

	for (const key in o1) {
		if (o1.hasOwnProperty(key)) {
			if (!(key in o2) || !deepEqual(o1[key], o2[key])) {
				return false;
			}
		}
	}

	return true;
}
function deepEvery(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (
				end ?
					!mapFn(value, array ? Number(key) : key, object, newTree)
					: !deepEvery(value, mapFn, n - 1, newTree)
			) {
				return false;
			}
		}
	}

	return true;
}
function deepFilter(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const nul = methods.isNull(object);
	const o = array ? [] : nul ? null : {};
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (end && mapFn(value, key, object, newTree)) {
				if (array) {
					o.push(value);
					continue;
				}

				o[key] = value;
				continue;
			}

			if (!end) {
				const filtered = deepFilter(value, mapFn, n - 1, newTree);

				if (array) {
					o.push(filtered);
					continue;
				}

				o[key] = filtered;
			}
		}
	}

	return o;
}
function deepFind(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (end) {
				if (mapFn(value, array ? Number(key) : key, object, newTree)) {
					return newTree;
				}

				continue;
			}

			const result = deepFind(value, mapFn, n - 1, newTree);

			if (result) {
				return result;
			}
		}
	}

	return null;
}
function deepFreeze(object = {}) {
	NativeObject.freeze(object);
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			deepFreeze(object[key]);
		}
	}
}
function deepMap(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const nul = methods.isNull(object);
	const o = array ? [] : nul ? null : {};
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			o[key] = end
				? mapFn(value, array ? Number(key) : key, object, newTree)
				: deepMap(value, mapFn, n - 1, newTree);
		}
	}

	return o;
}
function deepReduce(object = {}, mapFn, n, start, IV, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const end = n === 1;

	let startKey;
	let iterated = 0;

	if (IV == null && end && !start) {
		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				start = true;
				startKey = key;
				iterated = 1;
				IV = object[key];
				break;
			}
		}
	}

	for (const key in object) {
		if (object.hasOwnProperty(key) && key !== startKey) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			IV = end
				? mapFn(IV, value, array ? Number(key) : key, object, newTree)
				: deepReduce(value, mapFn, n - 1, start, IV, newTree);
		}
	}

	return IV;
}
function deepSome(object = {}, mapFn, n, tree) {
	object = transform(object);

	const array = methods.isArrayAlike(object);
	const end = n === 1;

	let iterated = 0;

	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			if (array && iterated === object.length) {
				break;
			}

			iterated++;

			const value = object[key];
			const newTree = [{ key, value }].concat(tree);

			if (
				end
					? mapFn(value, array ? Number(key) : key, object, newTree)
					: deepSome(value, mapFn, n - 1, newTree)
			) {
				return true;
			}
		}
	}

	return false;
}
function deepStrictEqual(o1, o2) {
	o1 = transform(o1);
	o2 = transform(o2);

	if (methods.isNull(o1) && methods.isNull(o2)) {
		return true;
	}

	if (methods.isNull(o1) || methods.isNull(o2)) {
		return false;
	}

	if (
		o1 !== o2 &&
		(!methods.isNaN(o1) || !methods.isNaN(o2)) &&
		NativeObject.keys(o1).length !== NativeObject.keys(o2).length
	) {
		return false;
	}

	for (const key in o1) {
		if (o1.hasOwnProperty(key)) {
			if (!(key in o2) || !deepStrictEqual(o1[key], o2[key])) {
				return false;
			}
		}
	}

	return true;
}

D.Object = cls;
D.constructors.unshift({
	check: D.isObject,
	cls
});

export function transform(object) {
	while (object instanceof cls) {
		object = object.$;
	}

	return object;
}

export default cls;