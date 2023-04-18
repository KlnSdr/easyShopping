"use strict";
class Section {
    constructor(sectionName) {
        this.name = sectionName;
        this.products = state.currentList.products.filter((product) => product.section === ProductSections.sections[this.name]);
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'ul',
            classes: ['listHub', 'ulSection'],
            children: this.products.map((product) => {
                return {
                    tag: 'li',
                    children: [
                        {
                            tag: 'label',
                            children: [
                                {
                                    tag: 'input',
                                    type: 'checkbox',
                                    checked: product.selected,
                                    id: `checkbox${product.name}`,
                                    handler: [
                                        {
                                            type: 'click',
                                            id: 'clickChangeStatus',
                                            body: (self) => {
                                                product.selected = self.element.checked;
                                                Store.writeList(state.currentList);
                                            },
                                        },
                                    ],
                                },
                                {
                                    tag: 'label',
                                    text: `${product.name} (${product.count})`,
                                    for: `checkbox${product.name}`,
                                },
                            ],
                            handler: [
                                {
                                    type: 'touchstart',
                                    id: 'startOfTouch',
                                    body: (self) => {
                                        console.log('timer start');
                                        self.setProperty('timerLongPress', setTimeout(() => {
                                            if (self.getProperty('timerLongPress')) {
                                                clearTimeout(self.getProperty('timerLongPress'));
                                            }
                                            console.log('stop');
                                            console.log('long press');
                                            new Dialog(new changeProductAmount(product)).render(edom.findById('content'));
                                        }, 1000));
                                    },
                                },
                                ...['mouseup', 'touchcancel', 'touchend'].map((eventName) => {
                                    return {
                                        type: eventName,
                                        id: eventName,
                                        body: (self) => {
                                            if (self.getProperty('timerLongPress')) {
                                                clearTimeout(self.getProperty('timerLongPress'));
                                            }
                                        },
                                    };
                                }),
                            ],
                        },
                    ],
                };
            }),
        };
    }
    unload() { }
}
