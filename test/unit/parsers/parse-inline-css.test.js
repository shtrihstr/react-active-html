import { describe, it } from 'mocha';
import { expect } from 'chai';

import parseInlineCss from 'parsers/parse-inline-css';

describe('#parsers parseInlineCss', () => {
    it('should parse simple CSS correctly', () => {
        const inlineCss = ';color: RED;   Display: block;background-color: blUe';
        const expectedResult = {
            color: 'RED',
            display: 'block',
            backgroundColor: 'blUe'
        };

        const result = parseInlineCss(inlineCss);

        expect(result).to.deep.equal(expectedResult);
    });

    it('should proper parse CSS with \';\' symbol in urls', () => {

        const inlineCss = 'background-image: url(/foo;bar.jpg), url(\'/foo;baz.gif\'), url("/foo;).png")';
        const expectedResult = {
            backgroundImage: 'url(/foo;bar.jpg), url(\'/foo;baz.gif\'), url("/foo;).png")'
        };

        const result = parseInlineCss(inlineCss);

        expect(result).to.deep.equal(expectedResult);
    });
});
