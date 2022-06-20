import Events from "./Events.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeHandler from "./NodeHandler.js";
import UiEditor from "./ui/ui-editor.js";

const init = () => {
    console.log('init');
    const editor = new UiEditor();
    const nodeHandler = new NodeHandler('#container');
    const nodeBuilder = new NodeBuilder(nodeHandler);

    const events = new Events(nodeHandler, nodeBuilder);
    if (location.origin == 'http://localhost:8080') {
        const promise = editor.start();
        promise.then(() => {
            events.start();
        })
    }
    events.loadData();
}

export default init;