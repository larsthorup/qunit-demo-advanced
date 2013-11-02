/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('autoComplete', {
    setup: function () {
        this.sandbox = sinon.sandbox.create();
        $('<input id="name" />').appendTo('#qunit-fixture');
        this.autoComplete = new AutoComplete('#name', {
            list: ['lars', 'matt', 'mike', 'nick', 'kin'],
            hideDelay: 500
        });
    },
    teardown: function () {
        this.sandbox.restore();
    }
});

test('keypress', function () {
    // given
    this.sandbox.stub(this.autoComplete, 'getMatch').returns('monique');
    var keypressEvent = $.Event('keypress', {charCode: 109}); // Note: 'm'
    this.sandbox.spy(keypressEvent, 'preventDefault');

    // when
    $('#name').trigger(keypressEvent);

    // then
    ok(this.autoComplete.getMatch.calledWith('m'), 'called getMatch("m")');
    ok(keypressEvent.preventDefault.called, 'event cancelled');
    equal($('#name').val(), 'monique', 'value is set');
});
