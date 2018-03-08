[![Build Status](https://travis-ci.org/shtrihstr/react-active-html.svg?branch=master)](https://travis-ci.org/shtrihstr/react-active-html)

# Active HTML for ReactJS
Convert HTML string to React Components

## The problem
The most of the CMS provide content as pure html from WYSIWYG editors:
```json
{
    "content": "<a href='/hello'>Hello World</a><img src='image.png' class='main-image' alt='' /><p>Lorem ipsum...</p>"
}
```
In this case you lose advantage of using React components in the content.

## Solution
```jsx
import activeHtml from 'react-active-html';

const componentsMap = {
    // replace <img> tags by custom react component
    img: props => <Image {...props} />,
    // replace <a> tags by React Router Link component
    a: props => <Link {...props} to={props.href} />,
    // add lazy load to all iframes
    iframe: props => (
        <LazyLoad>
            <iframe {...props} />
        </LazyLoad>
    )
};

class Html extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.content !== nextProps.content;
    }

    render() {
        // convert string property "content" to React components
        const nodes = activeHtml(this.props.content, componentsMap);
        return <div className="html">{nodes}</div>;
    }
}
```

## Installation
### Browser
    npm install react-active-html --save-dev
### Node
    npm install react-active-html xmldom --save
```js
const activeHtml = require('react-active-html');
const xmldom = require('rxmldom');

activeHtml.DOMParser = new xmldom.DOMParser();
```