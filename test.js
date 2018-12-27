/* eslint-disable no-undef */
const assert = require("assert");

const Collection = require("./src/Collection");
// const Interable = require("./src/Interable");


function newCollectionArray() {
	return new Collection([{ a: "Usuario 1" }, { a: "Usuario 2" }, { b: "Usuario 2" } ]);
}

function newCollectionObject() {
	return new Collection({ a: { a: "Usuario 1" }, b: { a: "Usuario 2" }, c: { b: "Usuario 2" } });
}

describe("Collection type Array", function () {
	describe("#find()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionArray();
		});

		it("when property is present", () => {
			const obj = coll.find((item) => item.a == "Usuario 2");
			assert.equal(obj.a, "Usuario 2");
		});

		it("when property is not present in all elements", () => {
			const obj = coll.find((item) => item.b == "Usuario 2");
			assert.equal(obj.b, "Usuario 2");
		});

		it("when property is not present in any elements", () => {
			const obj = coll.find((item) => item.y == "Usuario 2");
			assert.equal(obj, undefined);
		});
	});
	describe("#delete()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionArray();
		});

		it("when pass index", () => {
			assert.equal(coll.delete(2).length, 2);
		});

		it("when pass many index", () => {
			assert.equal(coll.delete([2, 1]).length, 1);
		});
		it("when pass function", () => {
			assert.equal(coll.delete((item) => item.a == "Usuario 2").length, 2);
		});
		it("sequential", () => {
			assert.equal(coll.delete(1).delete([0]).length, 1);
		});
		it("sequential", () => {
			assert.equal(coll.delete(1).delete([2]).length, 2);
		});
	});
	describe("#push()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionArray();
		});

		it("with one element", () => {
			assert.equal(coll.push({ a: "Novo usuario" }).length, 4);
		});

		it("two wice sequential", () => {
			assert.equal(coll.push({ a: "Novo usuario" }).push({ a: "Novo usuario" }).length, 5);
		});

	});
	describe("#map()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = new Collection([{ a: 1 }, { a: 2 }, { b: 1 }]);
		});

		it("with elements", () => {
			coll.map((item) => item.a).forEach((item, index) => {
				if (index == 2) assert.equal(item, undefined);
				else assert.equal(item, index+1);
			});
		});

	});
	// describe("#groupBy()", function () {
	// 	it("TODO", () => { assert.equal(false, true); });
	// });
	// describe("#forEach()", function () {
	// 	it("TODO", () => { assert.equal(false, true); });
	// });
	// describe("#filter()", function () {
	// 	it("TODO", () => { assert.equal(false, true); });
	// });
	describe("for .. ", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionArray();
		});

		it("in ..", () => {
			let success = true;
			for (let item in coll) {
				success = success && (["0", "1", "2"].indexOf(item) >= 0);
			}
			assert.equal(success, true);
		});

		it("of ..", () => {
			let count = 0;
			for (let item of coll) {
				if (item) count++;
				else count--;
			}
			assert.equal(count, 3);
		});
	});
});


describe("Collection type Object", function () {
	describe("#find()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionObject();
		});

		it("when property is present", () => {
			const obj = coll.find((item) => item.a == "Usuario 2");
			assert.equal(obj.a, "Usuario 2");
		});

		it("when property is not present in all elements", () => {
			const obj = coll.find((item) => item.b == "Usuario 2");
			assert.equal(obj.b, "Usuario 2");
		});

		it("when property is not present in any elements", () => {
			const obj = coll.find((item) => item.y == "Usuario 2");
			assert.equal(obj, undefined);
		});
	});
	describe("#delete()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionObject();
		});

		it("when pass index", () => {
			assert.equal(coll.delete("a").length, 2);
		});

		it("when pass many index", () => {
			assert.equal(coll.delete(["a","b"]).length, 1);
		});
		it("when pass function", () => {
			assert.equal(coll.delete((item) => item.a == "Usuario 2").length, 2);
		});
		it("sequential", () => {
			assert.equal(coll.delete("a").delete(["b"]).length, 1);
		});
	});
	describe("#push()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionObject();
		});

		it("with one element", () => {
			assert.equal(coll.push("d",{ a: "Novo usuario" }).length, 4);
		});

		it("two wice sequential", () => {
			assert.equal(coll.push("d", { a: "Novo usuario" }).push("f",{ a: "Novo usuario" }).length, 5);
		});

	});
	describe("#map()", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = new Collection([{ a: 1 }, { a: 2 }, { b: 1 }]);
		});

		it("with elements", () => {
			coll.map((item) => item.a).forEach((item, index) => {
				if (index == 2) assert.equal(item, undefined);
				else assert.equal(item, index + 1);
			});
		});

	});

	describe("for .. ", function () {
		let coll;
		beforeEach("Setting collection array list", () => {
			coll = newCollectionObject();
		});

		it("in ..", () => {
			let success = true;
			for (let item in coll) {
				success = success && (["a", "b", "c"].indexOf(item) >= 0);
			}
			assert.equal(success, true);
		});

		it("of ..", () => {
			let count = 0;
			for (let item of coll) {
				if (item) count++;
				else count--;
			}
			assert.equal(count, 3);
		});
	});
});