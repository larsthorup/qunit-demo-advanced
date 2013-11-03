/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('promptForm', {
    setup: function () {
        this.sinon = sinon.sandbox.create();
        $('<div id="form"><input id="name" /></div>').appendTo('#qunit-fixture');
    },
    teardown: function () {
        this.sinon.restore();
        detectLeaks();
    }
});

test('construction', function () {
    // given
    this.sinon.stub(window, 'AutoComplete', function () {
        this.focus = sinon.spy();
    });

    // when
    var form = new window.PromptForm('#form', {
        listUrl: '/someUrl'
    });

    // then
    ok(form, 'created');
    equal(window.AutoComplete.callCount, 1, 'AutoComplete called...');
    var call = window.AutoComplete.firstCall;
    var args = call.args;
    var autoComplete = call.thisValue;
    ok(args[0].is('#name'), '... on the right element');
    deepEqual(args[1], {listUrl: '/someUrl'}, '... with the right options');
    ok(autoComplete.focus.called, 'focus changed');
});
