'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;

build.rig.getTasks = function () {
    var result = getTasks.call(build.rig);

    result.set('serve', result.get('serve-deprecated'));

    return result;
};

/* fast-serve */
const { addFastServe } = require("spfx-fast-serve-helpers");
addFastServe(build);
/* end of fast-serve */

build.initialize(require('gulp'));


gulp.task('version-sync', function (done) {                                                                                                  // Create gulp task: 'version-sync'
// This function updates the package-solution version analogue to the the package.json file.

    const gutil = require('gulp-util');                                                                                                      // Import gulp utilits to write error messages
    const fs = require('fs');                                                                                                                // Import file system utilities from nodeJS
    var pkgConfig = require('./package.json');                                                                                               // Read package.json
    var pkgSolution = require('./config/package-solution.json');                                                                             // Read configuration of spfx web part solution file
    
    gutil.log('Syncing versions…');
    var newVersionNumber = pkgConfig.version.split('-')[0] + '.0';                                                                           // Generate new MS compliant version number

    if (pkgSolution.solution.version !== newVersionNumber) {

        gutil.log('From old version:', gutil.colors.yellow(pkgSolution.solution.version), 'to new:', gutil.colors.yellow(newVersionNumber)); // Log old to new version
        pkgSolution.solution.version = newVersionNumber;                                                                                     // Assign newly generated version number to web part version

<<<<<<< HEAD
        fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4), {"encoding":"utf8"}, function (err) { // Write changed package-solution file 
            if (err) gutil.log('Error:', err);
=======
        fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4), {"encoding":"utf8"}, function (error, result) { // Write changed package-solution file 
            if (error) gutil.log('Error:', err);
>>>>>>> a67b05cde1539e29759b697ee10302cf404a4a8c
        });

    } else {
        gutil.log('Versions are up to date');
    }

    done();
});
