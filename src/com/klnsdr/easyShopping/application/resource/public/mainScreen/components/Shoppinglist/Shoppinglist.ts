class Shoppinglist implements Component {
    private productNames: string[];
    constructor(productNames: string[]) {
        this.productNames = productNames;
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'ul',
            classes: ['listHub'],
            children: this.productNames.map((name: string) => {
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
                                    body: (self: edomElement) => {
                                        self.parent!.delete();
                                    },
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
