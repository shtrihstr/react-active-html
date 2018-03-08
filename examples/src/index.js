import React, { Component } from 'react';
import ReactDom from 'react-dom';

import activeHtml from '../../src/index';

const html = '<artice><img src="https://placeimg.com/300/300/animals" class="main-image" alt="" />' +
    '<p style="color: red">Lorem ipsum...</p></p>';

const componentsMap = {
    // use custom component for all <p> nodes
    p: (props) => <h1 {...props} className={`paragraph ${props.className}`} />
};

class HTML extends Component {
    // Performance wise activeHtml() is very slow operation.
    // I definitely recommend wrapping it in a component with shouldComponentUpdate() implementation.
    shouldComponentUpdate(nextProps) {
        return this.props.html !== nextProps.html;
    }

    render() {
        const nodes = activeHtml(this.props.html, componentsMap);
        return <div className="html">{nodes}</div>;
    }
}

const App = () => (
    <div className="content">
        <HTML html={html} />
    </div>
);

ReactDom.render(
    <App/>,
    document.getElementById('app')
);
