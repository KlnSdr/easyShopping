"use strict";
class Shoppinglist {
    constructor(productNames) {
        this.productNames = productNames;
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'ul',
            classes: ['listHub'],
            children: this.productNames.map((name) => {
                return {
                    tag: 'li',
                    children: [
                        {
                            tag: 'button',
                            text: name,
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickRemoveSelf',
                                    body: (self) => {
                                        self.parent.delete();
                                    },
                                },
                            ],
                        },
                    ],
                };
            }),
        };
    }
    unload() { }
}
