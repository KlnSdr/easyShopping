class SectionOwn implements Component {
    private products: Product[];

    constructor() {
        this.products = state.currentList!.products.filter(
            (product: Product) => product.section === 'selectSelf'
        );
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
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
                                                    body: (
                                                        self: edomElement
                                                    ) => {
                                                        const input: edomInputElement =
                                                            edom.findById(
                                                                'inputAddNewProduct'
                                                            ) as edomInputElement;
                                                        const productName: string =
                                                            input.value.trim();
                                                        input.value = '';

                                                        if (
                                                            productName === ''
                                                        ) {
                                                            return;
                                                        }

                                                        const product: Product =
                                                            new Product(
                                                                productName,
                                                                'selectSelf',
                                                                true,
                                                                1
                                                            );
                                                        state.currentList!.addProduct(
                                                            product
                                                        );
                                                        Store.writeList(
                                                            state.currentList!
                                                        );

                                                        const checkboxList: edomElement =
                                                            edom.findById(
                                                                'ulCheckboxes'
                                                            )!;

                                                        edom.fromTemplate(
                                                            [
                                                                this.checkBoxTemplate(
                                                                    product
                                                                ),
                                                            ],
                                                            checkboxList
                                                        );
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

    public unload() {}

    private getCheckboxes(): edomTemplate[] {
        return this.products.map((product: Product) =>
            this.checkBoxTemplate(product)
        );
    }

    private checkBoxTemplate(product: Product): edomTemplate {
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
                                    body: (self: edomElement) => {
                                        product.selected = (
                                            self.element as HTMLInputElement
                                        ).checked;
                                        Store.writeList(state.currentList!);
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
                            body: (self: edomElement) => {
                                console.log('timer start');
                                self.setProperty(
                                    'timerLongPress',
                                    setTimeout(() => {
                                        if (
                                            self.getProperty('timerLongPress')
                                        ) {
                                            clearTimeout(
                                                self.getProperty(
                                                    'timerLongPress'
                                                )
                                            );
                                        }

                                        console.log('stop');
                                        console.log('long press');

                                        new Dialog(
                                            new changeProductAmount(product)
                                        ).render(edom.findById('content')!);
                                    }, 1000)
                                );
                            },
                        },
                        ...['mouseup', 'touchcancel', 'touchend'].map(
                            (eventName: string) => {
                                return {
                                    type: eventName,
                                    id: eventName,
                                    body: (self: edomElement) => {
                                        if (
                                            self.getProperty('timerLongPress')
                                        ) {
                                            clearTimeout(
                                                self.getProperty(
                                                    'timerLongPress'
                                                )
                                            );
                                        }
                                    },
                                };
                            }
                        ),
                    ],
                },
            ],
        };
    }
}
