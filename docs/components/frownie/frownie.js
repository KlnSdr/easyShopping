"use strict";
class frownie {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['frownie'],
            children: [{ tag: 'p', classes: ['fa', 'fa-frown-o'] }],
        };
    }
    unload() { }
}
