import eventBus from "../EventBus.js";
import imageLoader from "./ImageLoader.js";
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
        this.imageLoader()

        this.updateNode()
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
                    this.nodeBuilder.currentType = type == 'js' ? 'javascript' : type
                    this.updateNode()
                })
        })

    }
    imageLoader() {
        imageLoader.callback = (blob) => {
            this.duplicate()
            this.nodeHandler.setIndex(this.nodeHandler.getIndex() + 1)
            persistence.insert(this.nodeHandler.getIndex(), {
                tag: 'img',
                inner: blob,
            })
            this.nodeBuilder.update(persistence.database)
        }
        document.querySelector('.ui-editor [type="file"]').addEventListener('change', (e) => {
            imageLoader.upload(e)
        })
        document.querySelector('.ui-editor [value="ImgUp"]').addEventListener('click', () => {
            document.querySelector('.ui-editor [type="file"]').click()
        })
    }
}
export default Events