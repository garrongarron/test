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
        this.markDownMaker()
        this.imageLoader()
        this.exportJson()
        this.importJson(this.nodeHandler)
        this.lineNumber()
        this.updateNode()
        this.save()
        //this.loadData()
    }
    loadData() {
        const filename = location.pathname.replace('/editor/', '')
        fetch('/api/files/' + filename)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) return
                persistence.database = data
                this.nodeBuilder.update(persistence.database)
                this.nodeHandler.setIndex(0)

            });
        fetch('/api/files')
            .then(response => response.json())
            .then(data => {
                data = data.map(element => {
                    return `
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                        <a href="/editor/${element}" class="text-decoration-none h6 m-0">${element}</a>
                        <span class="badge badge-primary badge-pill">150</span>
                    </li>`
                });
                
                document.querySelector(".list-group.list-group-flush").innerHTML = data.join('\n')
            });
    }
    save() {
        const filename = location.pathname.replace('/editor/', '')
        document.querySelector('.ui-editor [value="save"]').addEventListener('click', () => {
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: filename,
                    json: persistence.database
                })
            };
            fetch('/api/files', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data === true) {
                        alert("Guardado con exito")
                    } else {
                        alert("Error al guardar")
                    }
                });
        })
    }
    markDownMaker() {
        document.querySelector('.ui-editor [value="md"]').addEventListener('click', () => {
            this.nodeBuilder.currentType = 'md'
            this.updateNode()
        })
    }
    nodeTypeButtons() {
        const types = 'h1 h2 p html css js gdscript csharp'.split(' ')
        types.forEach(type => {
            document.querySelector('.ui-editor [value="' + type + '"]')
                .addEventListener('click', (e) => {
                    this.nodeBuilder.currentType = type == 'js' ? 'javascript' : type
                    this.updateNode()
                })
        })

    }
    lineNumber() {
        const eventHandler = (e) => {
            console.log(e.target.value);
            persistence.update(this.nodeHandler.getIndex(), {
                tag: this.nodeBuilder.currentType,
                inner: document.querySelector('.ui-editor textarea').value,
                lineNumber: e.target.value,
            })
            this.nodeBuilder.update(persistence.database)
        }
        document.querySelector('.ui-editor [type="number"]').addEventListener('change', eventHandler)
        document.querySelector('.ui-editor [type="number"]').addEventListener('keyup', eventHandler)
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
    updateNode() {
        const data = {
            tag: this.nodeBuilder.currentType,
            inner: document.querySelector('.ui-editor textarea').value,
        }
        const lineNumber = persistence.database[this.nodeHandler.getIndex()]?.lineNumber
        if (lineNumber) data.lineNumber = lineNumber
        persistence.update(this.nodeHandler.getIndex(), data)
        this.nodeBuilder.update(persistence.database)
    }
    duplicate() {
        document.querySelector('.ui-editor [value="Duplicate"]')
            .addEventListener('click', () => {
                const clone = Object.assign({}, persistence.database[this.nodeHandler.getIndex()]);
                persistence.insert(this.nodeHandler.getIndex(), clone)
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