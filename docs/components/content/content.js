"use strict";
class Content {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            id: 'content',
        };
    }
    unload() { }
}
