import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../sass/app.sass';
import {App} from './components/App';
import Schedule from "./containers/Schedule";

const renders = {
    app: <App/>,
    schedule: <Schedule/>
};

Object.keys(renders).forEach((key) => {
    const element = document.getElementById(key);

    if (element) {
        ReactDOM.render(
            renders[key],
            element
        );
    }
});


