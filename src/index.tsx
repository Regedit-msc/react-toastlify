import React from "react";
import { render } from "react-dom";

const ROOT_ID = 'snack';
const App = () => {
    return (
        <div>
            <h1>Before any magic</h1>
        </div>
    );
}
const createElement = (): HTMLDivElement => {
    const element = document.createElement('div');
    element.id = ROOT_ID;
    document.body.appendChild(element);
    return element;
};

render(<App />, document.getElementById(ROOT_ID) || createElement());


export default App;