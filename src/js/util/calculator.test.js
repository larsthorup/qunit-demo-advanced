/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('util.calculator', {
    setup: function () {
        this.calc = new Calculator();
    }
});

test('multiply', function () {
    equal(this.calc.multiply(6, 7), 42, '6*7');
});
