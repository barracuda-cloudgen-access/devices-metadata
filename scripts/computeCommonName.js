/**
 * Copyright (c) Fyde, Inc. and contributors. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

/**
* Takes list of model names and attempts to generate a canonicalized version.
*/
module.exports = function computeCommonName(names) {
    if (typeof names === 'string') {
        return names;
    } else if (!Array.isArray(names)) {
        return '';
    } else if (names.length === 1) {
        return names[0];
    }

    // Splits string by spaces, taking into account quoted/with parenthesis words
    const explodedNames = names
        .map(name => name.match(/\(([^\)]+)\)|"([^"]*)"|[^\s-]+/g))
        .filter(rep => rep !== null);

    const out = [];
    for (let j = 0; j < Math.max(...explodedNames.map(name => name.length)); j = j + 1) {
        const reps = {};
        // Find variant repetitions 
        explodedNames.forEach(name => {
            reps[name[j]] = true;
        });
        const repsArr = Object.keys(reps)
            .filter(rep => !['undefined'].includes(rep));

        const first = repsArr[0];

        if (repsArr.length === 1) {
            // If only one entry, use it
            out.push(first)
        } else if (repsArr.every(rep => rep.match(/^["\(](.*?)["\)]$/))) {
            // If word is wrapped between quotes/parenthesis
            const startChar = first[0];
            const endChar = first[first.length - 1]

            const unwrappedReps = repsArr.map(rep => rep.substring(1, rep.length - 1));
            const computed = computeCommonName(unwrappedReps);
            if (computed.length) {
                out.push(`${startChar}${computed}${endChar}`)
            }
        } else {
            out.push(repsArr.join('/'))
        }
    }
    // Filter out big words and return joined computed model
    return out
        .filter(s => s.length < 50)
        .join(' ');
}