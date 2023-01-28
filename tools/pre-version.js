"use strict";
// This script updates the package-solution version analogue to the the package.json file.

if (process.env.npm_package_version === undefined) {
    throw 'Package version cannot be evaluated';
}

// define path to package-solution file
const solution = './config/package-solution.json';

const { strict } = require('assert');
const fs = require('fs');                                                                               // Require filesystem instance
const { version } = require('os');

const nextPkgVersion = process.env.npm_package_version;                                                 // Get next automated package version from process variable
const nextVersion = nextPkgVersion.indexOf('-') === -1 ? nextPkgVersion : nextPkgVersion.split('-')[0]; // Make sure next build version match

// Update version in SPFx package-solution if exists
if (fs.existsSync(solution)) {

    const solutionFileContent = fs.readFileSync(solution, 'UTF-8');                                     // Read package-solution file
    const solutionContents = JSON.parse(solutionFileContent);                                           // Parse file as json

    solutionContents.solution.version = nextVersion + '.0';                                             // Set property of version to new version

    // save file
    fs.writeFileSync(
        solution,
        // convert file back to proper json
        JSON.stringify(solutionContents, null, 2),
        'UTF-8'
    );
}
