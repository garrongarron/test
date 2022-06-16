import eventBus from "../EventBus.js";
import exportFile from "./ExportFile.js";
import imageLoader from "./ImageLoader.js";
import importFile from "./ImportFile.js";
import persistence from "./Persistence.js";

class Events {
    constructor(nodeHandler, nodeBuilder) {
        this.nodeHandler = nodeHandler
        this.nodeBuilder = nodeBuilder
    }
    start() {
        this.edit()
        this.duplicate()
        this.delete()
        this.clickOnNode()
        this.nodeTypeButtons()
        this.imageLoader()
        this.exportJson()
        this.importJson(this.nodeHandler)

        this.updateNode()
    }
    delete() {
        document.querySelector('.ui-editor [value="Delete"]')
            .addEventListener('click', () => {
                const bool = persistence.delete(this.nodeHandler.getIndex())
                if (bool) this.nodeBuilder.delete(this.nodeHandler.getIndex())
            })
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
            this.nodeBuilder.currentType = persistence.database[this.nodeHandler.getIndex()].tag
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
            this.nodeBuilder.currentType = 'img'
            persistence.insert(this.nodeHandler.getIndex(), {
                tag: this.nodeBuilder.currentType,
                inner: blob,
            })
            this.nodeBuilder.update(persistence.database)
        }
        document.querySelector('.ui-editor [accept="image/png, image/jpeg"]').addEventListener('change', (e) => {
            imageLoader.upload(e)
        })
        document.querySelector('.ui-editor [value="ImgUp"]').addEventListener('click', () => {
            document.querySelector('.ui-editor [accept="image/png, image/jpeg"]').click()
        })
    }

    exportJson() {
        document.querySelector('.ui-editor [value="Download_Json"]').addEventListener('click', () => {
            exportFile.download(JSON.stringify(persistence.database))
        })
    }
    importJson(nodehandler) {
        const children = nodehandler.container.children
        importFile.callback = (text) => {
            persistence.database = JSON.parse(text)
            for (var i = 0; i < children.length; i++) {
                children[i].remove();
            }
            this.nodeBuilder.update(persistence.database)
        }
        document.querySelector('.ui-editor [accept="application/JSON"]').addEventListener('change', (e) => {
            importFile.upload(e)
        })
        document.querySelector('.ui-editor [value="Upload_Json"]').addEventListener('click', (e) => {
            document.querySelector('.ui-editor [accept="application/JSON"]').click()
        })
    }
}
export default Events