import eventBus from "../EventBus.js";

class ImageLoader {
    constructor() {
        this.callback = (reader) => {
            eventBus.dispatch('duplicate.btn', null)
            eventBus.dispatch('machine.image.loaded', reader.result)
        };
    }
    start() {
        eventBus.subscribe('click.on.ImageLoader', (e) => {
            this.upload(e)
        })
    }

    upload(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            this.callback(reader.result)
        }
        reader.readAsDataURL(file)
    }
    stop() { }
}

let imageLoader = new ImageLoader()

export default imageLoader