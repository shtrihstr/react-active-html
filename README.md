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

class Html extends Component {

    render() {

        const components = {
            // replace <img> tags by custom react component
            img: (attributes) => {
                return (<Image {...attributes} />);
            },
            // replace <a> tags by React Router Link component
            a: (attributes) => {
                return (<Link to={attributes.href} {...attributes} />);
            },
            // add lazy load to all iframes
            iframe: (attributes) => {
                return (
                    <LazyLoad>
                        <iframe {...attributes} />
                    </LazyLoad>
                );
            }
        };

        // convert string property "content" to React components
        let nodes = activeHtml(this.props.content, components);

        return (<div className="html">{nodes}</div>);
    }
}
```

## Installation
### Frontend
    npm install react-active-html --save-dev
### Backend (NodeJS)
    npm install react-active-html xmldom --save
```js
global.DOMParser = require('xmldom').DOMParser;
```