"use strict";
class changeProductAmount {
    constructor(product) {
        this.product = product;
        this.inputId = Math.random().toString() + Math.random().toString();
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['changeProductAmount'],
            children: [
                { tag: 'p', text: 'Menge:' },
                {
                    tag: 'input',
                    type: 'number',
                    value: this.product.count.toString(),
                    id: this.inputId,
                },
                {
                    tag: 'div',
                    classes: ['centerButtons'],
                    children: [
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-times', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickCloseDialog',
                                    body: (self) => Dialog.findParentDialog(self).delete(),
                                },
                            ],
                        },
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-save', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickAddList',
                                    body: (self) => this.updateAmount(self),
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    unload() { }
    onRendered() {
        var _a;
        (_a = edom.findById(this.inputId)) === null || _a === void 0 ? void 0 : _a.focus();
    }
    updateAmount(self) {
        const inputAmount = edom.findById(this.inputId);
        const newAmount = inputAmount.value.trim();
        Dialog.findParentDialog(self).delete();
        if (newAmount === '') {
            return;
        }
        this.product.count = parseInt(newAmount);
        Store.writeList(state.currentList);
        state.context.openSection(Object.keys(ProductSections.sections).find((key) => ProductSections.sections[key] === this.product.section));
    }
}
