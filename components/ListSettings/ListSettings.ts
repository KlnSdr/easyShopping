class ListSettings implements Component {
    private static buttonHandler: { [key: string]: handlerPreObject } = {
        'fa-undo': {
            type: 'click',
            id: 'resetList',
            body: (_self: edomElement) => {
                state.currentList = new List(
                    state.currentList!.name,
                    baseListProducts
                );
                Store.writeList(state.currentList!);
            },
        },
        'fa-recycle': {
            type: 'click',
            id: 'recycleList',
            body: (_self: edomElement) => {
                state.currentList?.products.forEach(
                    (product: Product) => (product.selected = false)
                );
                Store.writeList(state.currentList!);
            },
        },
        'fa-share': {
            type: 'click',
            id: 'shareList',
            body: (_self: edomElement) => {
                alert('todo: implement');
            },
        },
    };

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['containerSettingsButtons'],
            children: ['fa-undo', 'fa-recycle', 'fa-share'].map(
                (className: string) => {
                    return {
                        tag: 'button',
                        classes: ['fa', className],
                        handler: [ListSettings.buttonHandler[className]],
                    };
                }
            ),
        };
    }

    public unload() {}
}
