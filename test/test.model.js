/*global describe, it */
/*jshint indent:4, newcap:false, node:true */
'use strict';

var chai = require('chai');
var Model = require(require.alias ? 'model' : '../lib/model');

describe('Model', function () {
    it('should wrap an object', function () {
        var a = Model({ a: 1 });
        var b = new Model({ b: 2 });
        var c = Model.call(null, { c: 3 });
        var d = Model.apply(null, [{ d: 4 }]);
        var z = Model(a);

        chai.expect(a.toJSON()).deep.equals({ a: 1 });
        chai.expect(b.toJSON()).deep.equals({ b: 2 });
        chai.expect(c.toJSON()).deep.equals({ c: 3 });
        chai.expect(d.toJSON()).deep.equals({ d: 4 });
        chai.expect(z.toJSON()).deep.equals({ a: 1 });
    });

    describe('.prototype', function () {
        describe('.get()', function () {
            it('should get a single value', function () {
                var model = Model({ a: 1, b: 2, c: 3 });

                chai.expect(model.get('a'))
                    .equals(1);

                chai.expect(model.get('b'))
                    .equals(2);

                chai.expect(model.get('c'))
                    .equals(3);

                chai.expect(model.get('d'))
                    .equals(undefined);
            });

            it('should get multiple values', function () {
                var model = Model({ a: 1, b: 2, c: 3 });

                chai.expect(model.get(['a', 'b']))
                    .deep.equals({ a: 1, b: 2 });

                chai.expect(model.get(['b', 'c']))
                    .deep.equals({ b: 2, c: 3 });

                chai.expect(model.get(['c', 'd']))
                    .deep.equals({ c: 3, d: undefined });
            });
        });

        describe('.set()', function () {
            it('should set a single value', function () {
                var model = Model();

                chai.expect(model.toJSON())
                    .deep.equals({});

                chai.expect(model.set('a', 1))
                    .equals(model);

                chai.expect(model.toJSON())
                    .deep.equals({ a: 1 });

                chai.expect(model.set('a', 2))
                    .equals(model);

                chai.expect(model.toJSON())
                    .deep.equals({ a: 2 });
            });

            it('should set multiple values', function () {
                var model = Model();

                chai.expect(model.toJSON())
                    .deep.equals({});

                chai.expect(model.set({ a: 1, b: 2 }))
                    .equals(model);

                chai.expect(model.toJSON())
                    .deep.equals({ a: 1, b: 2 });

                chai.expect(model.set({ b: 3, c: 4 }))
                    .equals(model);

                chai.expect(model.toJSON())
                    .deep.equals({ a: 1, b: 3, c: 4 });
            });
        });

        describe('.toJSON()', function () {
            it('should return unwrapped data', function () {
                var a = Model({ foo: 'bar' });
                var b = Model(a);

                chai.expect(a.toJSON())
                    .deep.equal({ foo: 'bar' })
                    .not.instanceOf(Model);

                chai.expect(b.toJSON())
                    .deep.equal({ foo: 'bar' })
                    .not.instanceOf(Model);
            });
        });
    });
});
