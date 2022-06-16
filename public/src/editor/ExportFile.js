import eventBus from "../EventBus.js";

const cache = document.createElement('div')

class ExportFile {
    start() {
        eventBus.subscribe('export.content.html', () => {
            this.downloadHTML()
        })
    }

    download(contentString = null) {
        let fileContent = contentString || localStorage.getItem('data') || [];
        var fileName = prompt("File name", "Demo");
        if (fileName != null) {
            const blob = new Blob([fileContent], { type: 'application/json' });
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', window.URL.createObjectURL(blob));
            a.click();
        }
    }

    downloadHTML() {
        let editor = document.querySelector('.lateral-forms')
        cache.appendChild(editor)
        let title = document.title
        var fileName = prompt("File name", "index");

        if (fileName != null) {
            document.title = fileName
            let data = localStorage.getItem('data')
            let dataScript = document.createElement('span')
            dataScript.textContent = 'let data = `'+data+'`'
            dataScript.style.display = `none`
            document.body.appendChild(dataScript)


            let fileContent = '<!DOCTYPE html>' + document.querySelector('html').outerHTML;
            document.head.querySelector('title').innerText = fileName
            const blob = new Blob([fileContent], { type: 'text/html' });
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', window.URL.createObjectURL(blob));
            a.click();

            dataScript.remove()
            document.title = title
            document.body.appendChild(editor)

        }

    }
}
const exportFile = new ExportFile();
export default exportFile;