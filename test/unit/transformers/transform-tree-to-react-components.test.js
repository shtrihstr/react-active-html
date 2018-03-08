import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';

import transformTreeToReactComponents from 'transformers/transform-tree-to-react-components';

describe('#transformers transformTreeToReactComponents', () => {
    it('should properly transform tree', () => {
        const tree = [
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

        const result = transformTreeToReactComponents(tree);

        expect(result).to.be.an('array');

        const divNode = result[0];
        expect(divNode).to.be.an('object');
        expect(divNode.type).to.equal('div');
        expect(divNode.key).to.equal('0');
        expect(divNode.props.id).to.equal('foo');
        expect(divNode.props.children).to.be.an('array');

        const pNode = divNode.props.children[0];
        expect(pNode).to.be.an('object');
        expect(pNode.type).to.equal('p');
        expect(pNode.key).to.equal('0');
        expect(pNode.props.className).to.equal('bar');
        expect(pNode.props.style.color).to.equal('red');
        expect(pNode.props.children).to.be.an('array');

        const textNode = pNode.props.children[0];
        expect(textNode).to.equal('Hello World! ');
    });
});
