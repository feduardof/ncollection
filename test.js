const assert = require('assert');

const Collection = require('./src/Collection');
const Interable = require('./src/Interable');
describe('Collection type Array', function () {
    describe('#find()', function () {
        let coll;
        beforeEach('Setting collection array list', () => {
            coll = new Collection([{ a: 'Usuario 1' }, { a: 'Usuario 2' }, { b: 'Usuario 2' }]);
        });

        it('when property is present', () => {
            const obj = coll.find((item) => item.a == 'Usuario 2');
            assert.equal(obj.a, 'Usuario 2');
        });

        it('when property is not present in all elements', () => {
            const obj = coll.find((item) => item.b == 'Usuario 2');
            assert.equal(obj.b, 'Usuario 2');
        });

        it('when property is not present in any elements', () => {
            const obj = coll.find((item) => item.y == 'Usuario 2');
            assert.equal(obj, undefined);
        });
    });
    describe('#delete()', function () {
        let coll;
        beforeEach('Setting collection array list', () => {
            coll = new Collection([{ a: 'Usuario 1' }, { a: 'Usuario 2' }, { b: 'Usuario 2' }]);
        });

        it('when pass index', () => {
            assert.equal(coll.delete(2).length, 2);
        });

        it('when pass many index', () => {
            assert.equal(coll.delete([2, 1]).length, 1);
        });
        it('when pass function', () => {
            assert.equal(coll.delete((item) => item.a == 'Usuario 2').length, 1);
        });
    });
    describe('#push()', function () {
        let coll;
        beforeEach('Setting collection array list', () => {
            coll = new Collection([{ a: 'Usuario 1' }, { a: 'Usuario 2' }, { b: 'Usuario 2' }]);
        });

        it('with one element', () => {
            assert.equal(coll.push({ a: 'Novo usuario' }).length, 4);
        });

        it('two wice sequential', () => {
            assert.equal(coll.push({ a: 'Novo usuario' }).push({ a: 'Novo usuario' }).length, 5);
        });

    });
    describe('#map()', function () {
        let coll;
        beforeEach('Setting collection array list', () => {
            coll = new Collection([{ a: 1 }, { a: 2 }, { b: 1 }]);
        });

        it('with elements', () => {
            coll.map((item) => item.a).forEach((item, index) => {
                if (index == 2) assert.equal(item, undefined);
                else assert.equal(item, index+1);
            })
        });


    });
    describe('#groupBy()', function () {
        it('TODO', () => { assert.equal(false, true) });
    });
    describe('#forEach()', function () {
        it('TODO', () => { assert.equal(false, true) });
    });
    describe('#filter()', function () {
        it('TODO', () => { assert.equal(false, true) });
    });
});