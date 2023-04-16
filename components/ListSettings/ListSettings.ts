class ListSettings implements Component {
    private static buttonHandler: { [key: string]: handlerPreObject } = {
        'fa-undo': {
            type: 'click',
            id: 'resetList',
            body: (self: edomElement) => {
                try {
                    state.currentList = new List(
                        state.currentList!.name,
                        baseListProducts
                    );
                    Store.writeList(state.currentList!);
                    self.applyStyle('success');
                } catch (e) {
                    self.applyStyle('fail');
                }
            },
        },
        'fa-recycle': {
            type: 'click',
            id: 'recycleList',
            body: (self: edomElement) => {
                try {
                    state.currentList?.products.forEach(
                        (product: Product) => (product.selected = false)
                    );
                    Store.writeList(state.currentList!);
                    self.applyStyle('success');
                } catch (e) {
                    self.applyStyle('fail');
                }
            },
        },
        'fa-share': {
            type: 'click',
            id: 'shareList',
            body: (_self: edomElement) =>
                state.currentList?.share(MethodShare.WhatsApp),
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
