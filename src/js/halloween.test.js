/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
module('halloween', {
    setup: function () {
    }
});

test('constructor', function () {
    // given
    $('<div id="haunted"></div>').appendTo('#qunit-fixture');

    // when
    var booh = new Halloween('#haunted', {name: 'booh'});

    // then
    equal($('#booh').length, 1, 'control created');
    deepEqual($('#haunted').controls(Halloween), [booh], 'control attached to DOM element');
    ok($('#booh').parent().is('#haunted'), 'in the right place');
});