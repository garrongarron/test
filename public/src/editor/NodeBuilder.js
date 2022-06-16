class NodeBuilder {
    constructor(nodehandler) {
        this.tagList = ['h1', 'h2', 'p']
        this.styleList = ['html', 'javascript', 'css']
        this.prevData = []
        this.nodehandler = nodehandler
        this.currentType = 'p'
    }
    update(data) {
        data.forEach((element, index) => {
            if (JSON.stringify(this.prevData[index]) != JSON.stringify(data[index])) {
                let node
                if (this.styleList.includes(element.tag)) {
                    node = this.codeFormater(element)
                } else {
                    node = this.build(element.tag, element.inner, element.className, element.parent)
                }
                node.addEventListener('click', () => {
                    this.currentType = element.tag
                    this.nodehandler.setClickOnNode(node, element.inner)
                })
                this.nodehandler.container.children.hasOwnProperty(index)
                    ? this.nodehandler.remplaceNode(node, index)
                    : this.nodehandler.container.appendChild(node)
            }
        });
        this.prevData = data.map(el => el)
        Prism.highlightAll();
    }
    codeFormater(data) {
        const node = this.build('pre', null, 'language-' + data.tag)
        if (data.lineNumber !== '' && Number.isInteger(data.lineNumber * 1)) {
            node.classList.add('line-numbers')
            node.setAttribute('data-start', data.lineNumber)
        } else {
            if (typeof data.lineNumber != undefined) delete data.lineNumber
        }
        this.build('code', data.inner, null, node)
        return node
    }

    build(tag, inner, className, parent) {
        let el = document.createElement(tag)
        if (inner) el.textContent = inner
        if (className) {
            if (typeof className == 'string') {
                el.classList.add(className)
            } else {
                console.error('class is not string');
            }
        }
        if (parent) parent.appendChild(el)
        return el
    }
}

export default NodeBuilder;