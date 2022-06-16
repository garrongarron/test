import eventBus from "../EventBus.js";
import persistence from "./Persistence.js";

class Events {
    constructor(nodeHandler, nodeBuilder) {
        this.nodeHandler = nodeHandler
        this.nodeBuilder = nodeBuilder
    }
    start() {
        this.edit()
        this.duplicate()
        this.clickOnNode()
        this.nodeTypeButtons()
    }
    edit() {
        document.querySelector('.ui-editor textarea')
            .addEventListener('keyup', () => {
                this.updateNode()
            })
    }
    duplicate() {
        document.querySelector('.ui-editor [value="Duplicate"]')
            .addEventListener('click', () => {
                persistence.insert(this.nodeHandler.getIndex(), {
                    tag: this.nodeBuilder.currentType,
                    inner: document.querySelector('.ui-editor textarea').value,
                })
                this.nodeBuilder.update(persistence.database)
                this.nodeHandler.setIndex(this.nodeHandler.getIndex() + 1)
            })
    }
    clickOnNode() {
        eventBus.subscribe('click.on.node', (text) => {
            document.querySelector('.ui-editor textarea').value = text
        })
    }
    updateNode() {
        persistence.update(this.nodeHandler.getIndex(), {
            tag: this.nodeBuilder.currentType,
            inner: document.querySelector('.ui-editor textarea').value,
        })
        this.nodeBuilder.update(persistence.database)
    }
    nodeTypeButtons() {
        const types = 'h1 h2 p html css js'.split(' ')
        types.forEach(type => {
            document.querySelector('.ui-editor [value="' + type + '"]')
            .addEventListener('click', (e) => {
                this.nodeBuilder.currentType = type
                this.updateNode()
            })
        })
        
    }
}
export default Events