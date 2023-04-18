"use strict";
class Headline {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['top'],
            children: [
                {
                    tag: 'h1',
                    id: 'headline',
                    text: 'Einkaufszettel',
                },
            ],
        };
    }
    unload() { }
}
