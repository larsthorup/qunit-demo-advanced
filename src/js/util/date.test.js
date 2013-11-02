/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('date', {
    setup: function () {
        this.sinon = sinon.sandbox.create();
    },
    teardown: function () {
        this.sinon.restore();
    }
});

test('mocking', function () {
    // given
    this.sinon.useFakeTimers();
    var then = new Date();

    // when
    this.sinon.clock.tick(42000);
    var later = new Date();

    // then
    equal(later.getTime() - then.getTime(), 42000, 'time "passed"');
});