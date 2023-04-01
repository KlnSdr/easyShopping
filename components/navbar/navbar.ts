class Navbar implements Component {
    private static buttonHandler: { [key: string]: handlerPreObject } = {
        'fa-list': {
            type: 'click',
            id: 'clickShowShoppinglist',
            body: (self: edomElement) => {
                state.context.openShoppinglist();
            },
        },
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
            id: 'clickMoveContextUp',
            body: (self: edomElement) => {
                state.context.loadNextHigherContext();
            },
        },
        'fa-cog': {
            type: 'click',
            id: 'clickOpenSettings',
            body: (self: edomElement) => {},
        },
    };

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'nav',
            children: [
                { divId: 'navbarBttnLeft', buttonClass: 'fa-plus' },
                { divId: 'navbarBttnMiddle', buttonClass: 'fa-home' },
                { divId: 'navbarBttnRight', buttonClass: 'fa-cog' },
            ].map(
                ({
                    divId,
                    buttonClass,
                }: {
                    divId: string;
                    buttonClass: string;
                }) => {
                    return {
                        tag: 'div',
                        id: divId,
                        children: [
                            Navbar.getNavbarButtonInstructions(buttonClass),
                        ],
                    };
                }
            ),
        };
    }

    public static getNavbarButtonInstructions(
        buttonClass: string
    ): edomTemplate {
        return {
            tag: 'button',
            classes: ['fa', buttonClass],
            handler: [Navbar.buttonHandler[buttonClass]],
        };
    }

    public unload() {}
}
