import eventBus from "../EventBus.js";

class ImportFile {
    constructor() {
        this.callback = (string) => {
            localStorage.setItem('data', string);
        }
    }
    
    start() {
        eventBus.subscribe('upload.content.json', (params) => {
            this.upload(params.e, params.container)
        })
    }

    upload(e) {
        var file = e.target.files[0];
        var textType = 'application/json';
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.callback(reader.result)
            }
            reader.readAsText(file);
        } else {
            console.error('error', e)
        }
    }

    stop() {

    }
}

const importFile = new ImportFile();

export default importFile;