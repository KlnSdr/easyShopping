class Navbar implements Component {
    private static buttonHandler: { [key: string]: handlerPreObject } = {
        'fa-plus': {
            type: 'click',
            id: 'clickAddList',
            body: (self: edomElement) => {
                const tst: List = new List('testList', baseListProducts);
                Store.writeList(tst);
                state.currentList = tst;
                state.context.openList(tst.name);
            },
        },
        'fa-home': {
            type: 'click',
            id: 'clickAddList',
            body: (self: edomElement) => {
                state.context.loadNextHigherContext();
            },
        },
        'fa-cog': {
            type: 'click',
            id: 'clickAddList',
            body: (self: edomElement) => {},
        },
    };

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'nav',
            children: ['fa-plus', 'fa-home', 'fa-cog'].map(
                (specialClass: string) => {
                    return {
                        tag: 'button',
                        classes: ['fa', specialClass],
                        handler: [Navbar.buttonHandler[specialClass]],
                    };
                }
            ),
        };
    }

    public unload() {}
}
