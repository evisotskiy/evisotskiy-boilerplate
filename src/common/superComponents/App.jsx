/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';

const App = () => (
    <>
        <Helmet
            titleTemplate="%s - React.js Boilerplate"
            defaultTitle="React.js Boilerplate"
        >
            <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <div>Hello!</div>
    </>
);

export default App;
