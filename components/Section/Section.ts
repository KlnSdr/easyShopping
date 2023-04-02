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
        edom.findById('headline')!.text = this.name;
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
                                    text: product.name,
                                    for: `checkbox${product.name}`,
                                },
                            ],
                        },
                    ],
                };
            }),
        };
    }

    public unload() {}
}
