import { describe, it } from 'mocha';
import { expect } from 'chai';

import transformNodeProps from 'transformers/transform-node-props';

describe('#transformers transformNodeProps', () => {
    it('should properly transform node props', () => {
        const props = {
            'class': 'foo',
            'for': 'element',
            'data-value': 'ok',
            'area-hidden': 'true',
            TABINDEX: 1,
            invalidProperty: 'invalid'
        };

        const expectedResult = {
            className: 'foo',
            htmlFor: 'element',
            'data-value': 'ok',
            'area-hidden': 'true',
            tabIndex: 1
        };

        const result = transformNodeProps(props);

        expect(result).to.deep.equal(expectedResult);
    });

    it('should properly transform style prop', () => {
        const props = {
            style: 'background-color: red'
        };

        const expectedResult = {
            style: {
                backgroundColor: 'red'
            }
        };

        const result = transformNodeProps(props);

        expect(result).to.deep.equal(expectedResult);
    });
});
