qunit-demo-advanced
===================

Advanced front-end JavaScript unit testing with QUnit

Prerequisites:

* install node.js

then

    npm install
    npm install grunt-cli -g

and to support code coverage, setup path to phantomjs and jscoverage as instructed here:

    https://github.com/afonsof/grunt-qunit-cov



From the browser
----------------

run all tests

    file://(path-to)/src/test/index.html


From the command line
---------------------

run all tests (results in output\testresults)

    grunt test


run jshint

    grunt lint


produce code coverage (results in out\coverage)

    grunt coverage