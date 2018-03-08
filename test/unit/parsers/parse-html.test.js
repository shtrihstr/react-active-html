import { describe, it } from 'mocha';
import { expect } from 'chai';
import xmldom from 'xmldom';

import parseHtml from 'parsers/parse-html';

const parser = new xmldom.DOMParser();

describe('#parsers parseHtml', () => {
    it('should return NodeList object for simple html', () => {
        const html = '<div id="foo"><p class="bar">Hello World!</p></div>';

        const result = parseHtml(html, parser);

        expect(result).to.be.an('object');

        expect(result[0].attributes[0].name).to.equal('id');
        expect(result[0].attributes[0].value).to.equal('foo');

        expect(result[0].childNodes[0].attributes[0].name).to.equal('class');
        expect(result[0].childNodes[0].attributes[0].value).to.equal('bar');
    });
});
