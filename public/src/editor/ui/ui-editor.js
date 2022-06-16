class UiEditor{
    constructor(){
        this.node = document.createElement('div');
        this.promise = fetch('src/editor/ui/ui-editor.html').then(res => res.text())
        this.cache = document.createElement('div');
    }
    start(){
        this.promise.then(html => {
            this.node.innerHTML = html;
        })
        document.body.appendChild(this.node);
        return this.promise
    }

    stop(){
        this.cache.appendChild(this.node);
    }
}
export default UiEditor