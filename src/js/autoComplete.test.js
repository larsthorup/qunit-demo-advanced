/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('autoComplete', {
    setup: function () {
        this.sinon = sinon.sandbox.create();
        $('<input id="name" />').appendTo('#qunit-fixture');
        this.autoComplete = new AutoComplete('#name', {
            list: ['lars', 'matt', 'mike', 'nick', 'kin'],
            hideDelay: 500
        });
    },
    teardown: function () {
        this.sinon.restore();
    }
});

test('keypress', function () {
    // given
    this.sinon.stub(this.autoComplete, 'getMatch').returns('monique');
    var keypressEvent = $.Event('keypress', {charCode: 109}); // Note: 'm'
    this.sinon.spy(keypressEvent, 'preventDefault');

    // when
    $('#name').trigger(keypressEvent);

    // then
    ok(this.autoComplete.getMatch.calledWith('m'), 'getMatch("m") called');
    ok(keypressEvent.preventDefault.called, 'event cancelled');
    equal($('#name').val(), 'monique', 'value changed');
});

test('openPopup', function () {
    // given
    var popup;
    this.sinon.stub(window, 'open', function () {
        popup = {
            focus: sinon.spy()
        };
        return popup;
    });

    // when
    this.autoComplete.openPopup('zealake.com');

    // then
    ok(window.open.calledWith('zealake.com', '_blank', 'resizable'), 'window.open called');
    ok(popup.focus.called, 'focus changed');
});

test('delayHide', function () {
    // given
    this.sinon.useFakeTimers();

    // when
    this.autoComplete.delayHide();

    // then
    ok($('#name').is(':visible'), 'initially visible');

    // when later
    this.sinon.clock.tick(500);

    // then
    ok($('#name').is(':hidden'), 'then hidden');
});

can.each([

    {desc: 'success', response: {list: ['rachel']}, expected: ['rachel']},
    {desc: 'failure', response: 500, expected: []}

], function (scenario) {

    test('listUrl option, ' + scenario.desc, function () {
        // given
        this.sinon.useFakeTimers();
        can.fixture('/getNames', function (original, respondWith) {
            respondWith(scenario.response);
        });

        // when
        var autoComplete = new AutoComplete('#name', {
            listUrl: '/getNames'
        });
        this.sinon.clock.tick(can.fixture.delay);

        // then
        deepEqual(autoComplete.options.list, scenario.expected, 'resulting list');
    });

});
