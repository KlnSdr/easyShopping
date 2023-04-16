class changeProductAmount implements DialogContentComponent {
    private product: Product;
    private inputId: string;

    constructor(product: Product) {
        this.product = product;
        this.inputId = Math.random().toString() + Math.random().toString();
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
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
                                    body: (self: edomElement) =>
                                        Dialog.findParentDialog(self).delete(),
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
                                    body: (self: edomElement) =>
                                        this.updateAmount(self),
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }

    public unload() {}

    public onRendered() {
        edom.findById(this.inputId)?.focus();
    }

    private updateAmount(self: edomElement) {
        const inputAmount: edomInputElement = edom.findById(
            this.inputId
        ) as edomInputElement;

        const newAmount: string = inputAmount.value.trim();

        Dialog.findParentDialog(self).delete();

        if (newAmount === '') {
            return;
        }

        this.product.count = parseInt(newAmount);
        Store.writeList(state.currentList!);
        state.context.openSection(
            Object.keys(ProductSections.sections).find(
                (key: string) =>
                    ProductSections.sections[key] === this.product.section
            )!
        );
    }
}
