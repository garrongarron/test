class EventBus {
    constructor() {
        this.event = {}
    }
    subscribe(eventName, callback) {
        if (!this.event[eventName]) {
            this.event[eventName] = []
        }
        this.event[eventName].push(callback)
    }
    dispatch(eventName, params) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(callback => {
                callback(params)
            });
        }
    }
}

let eventBus = new EventBus()
export default eventBus