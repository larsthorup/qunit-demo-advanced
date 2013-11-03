detectLeaks = function () {
    var leaks = $('body').children(':not(#qunit-reporter)');
    equal(leaks.length, 0, 'no DOM elements leaked');
    leaks.remove();
};