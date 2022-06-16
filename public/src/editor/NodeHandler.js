import eventBus from "../EventBus.js";

class NodeHandler {
    constructor(selector) {
        this.index = 0;
        this.container = document.querySelector(selector)
        this.firstNode = document.createElement('div')
        this.firstNode.innerText = 'Start...'
        this.container.appendChild(this.firstNode)
    }
    getIndex() {
        return this.index;
    }
    currentNode() {
        return this.container.children[this.index]
    }
    setIndex(index) {
        if (this.index != null) this.currentNode()?.classList.remove('node-selected')
        this.index = index
        this.currentNode()?.classList.add('node-selected')
    }
    // insertAfter(newNode, existingNode) {
    //     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    // }
    getIndexOf(node) {
        let index = Array.from(this.container.children).indexOf(node)
        return index
    }
    remplaceNode(newNode, index) {
        const oldNode = this.container.children[index]
        this.container.replaceChild(newNode, oldNode);
    }
    setClickOnNode(node, text) {
        node.addEventListener('click', () => {
            this.setIndex(this.getIndexOf(node))
            eventBus.dispatch('click.on.node', text)
        })
    }
}

export default NodeHandler