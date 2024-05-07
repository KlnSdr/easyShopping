class Section implements Component {
    private name: string;
    private products: Product[];

    constructor(sectionName: string) {
        this.name = sectionName;

        this.products = state.currentList!.products.filter(
            (product: Product) =>
                product.section === ProductSections.sections[this.name]
        );
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'ul',
            classes: ['listHub', 'ulSection'],
            children: this.products.map((product: Product) => {
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
                                                Store.writeList(
                                                    state.currentList!
                                                );
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
                                                    self.getProperty(
                                                        'timerLongPress'
                                                    )
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
                                                    new changeProductAmount(
                                                        product
                                                    )
                                                ).render(
                                                    edom.findById('content')!
                                                );
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
                                                    self.getProperty(
                                                        'timerLongPress'
                                                    )
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
            }),
        };
    }

    public unload() {}
}
