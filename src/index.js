/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';

import App from './App';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const MOUNT_NODE = document.getElementById('root');

// eslint-disable-next-line no-unused-vars
const render = messages => {
    ReactDOM.render(
        <App />,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', './App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise(resolve => {
        resolve(import('intl'));
    })
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/en.js'),
            import('intl/locale-data/jsonp/de.js'),
        ]))
        .then(() => render(translationMessages))
        .catch(err => {
            throw err;
        });
} else {
    render(translationMessages);
}
