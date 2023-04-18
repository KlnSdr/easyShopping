"use strict";
class InfoScreen {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            children: [
                {
                    tag: 'img',
                    classes: ['logo'],
                    src: 'favicon.svg',
                },
                {
                    tag: 'p',
                    text: 'v2.0.0',
                },
            ],
        };
    }
    unload() { }
}
