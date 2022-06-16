import Events from "./Events.js";
import NodeBuilder from "./NodeBuilder.js";
import NodeHandler from "./NodeHandler.js";
import UiEditor from "./ui/ui-editor.js";

const init = () => {
    console.log('init');
    const editor = new UiEditor();
    const promise = editor.start();
    const nodeHandler = new NodeHandler('#container');
    const nodeBuilder = new NodeBuilder(nodeHandler);
    
    const events = new Events(nodeHandler, nodeBuilder);
    promise.then(() => {
        events.start();
    })
}

export default init;