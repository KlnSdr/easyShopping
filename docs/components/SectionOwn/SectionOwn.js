"use strict";
class SectionOwn {
    constructor() {
        this.products = state.currentList.products.filter((product) => product.section === 'selectSelf');
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            children: [
                {
                    tag: 'table',
                    classes: ['tableAddOwnProducts'],
                    children: [
                        {
                            tag: 'tr',
                            children: [
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'input',
                                            id: 'inputAddNewProduct',
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'button',
                                            classes: [
                                                'fa',
                                                'fa-save',
                                                'squareButton',
                                            ],
                                            handler: [
                                                {
                                                    type: 'click',
                                                    id: 'clickAddNewProduct',
                                                    body: (self) => {
                                                        const input = edom.findById('inputAddNewProduct');
                                                        const productName = input.value.trim();
                                                        input.value = '';
                                                        if (productName === '') {
                                                            return;
                                                        }
                                                        const product = new Product(productName, 'selectSelf', true, 1);
                                                        state.currentList.addProduct(product);
                                                        Store.writeList(state.currentList);
                                                        const checkboxList = edom.findById('ulCheckboxes');
                                                        edom.fromTemplate([
                                                            this.checkBoxTemplate(product),
                                                        ], checkboxList);
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    tag: 'ul',
                    classes: ['listHub', 'ulSection'],
                    id: 'ulCheckboxes',
                    children: this.getCheckboxes(),
                },
            ],
        };
    }
    unload() { }
    getCheckboxes() {
        return this.products.map((product) => this.checkBoxTemplate(product));
    }
    checkBoxTemplate(product) {
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
    }
}
