import { describe, it } from 'mocha';
import { expect } from 'chai';
import xmldom from 'xmldom';

import parseHtml from 'parsers/parse-html';

import transformNodesToObjectsTree from 'transformers/transform-nodes-to-objects-tree';

const parser = new xmldom.DOMParser();

describe('#transformers transformNodesToObjectsTree', () => {
    it('should properly transform nodes', () => {
        const html = '<div id="foo"><p class="bar" style="color: red;">Hello World! </p></div>';
        const nodes = parseHtml(html, parser);

        const expectedResult = [
            {
                node: 'div',
                props: {
                    id: 'foo'
                },
                children: [
                    {
                        node: 'p',
                        props: {
                            className: 'bar',
                            style: {
                                color: 'red'
                            }
                        },
                        children: [
                            {
                                node: 'text',
                                text: 'Hello World! '
                            }
                        ]
                    }
                ]
            }
        ];

        const result = transformNodesToObjectsTree(nodes);

        expect(result).to.deep.equal(expectedResult);
    });
});
