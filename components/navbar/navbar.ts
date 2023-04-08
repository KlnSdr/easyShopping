class Navbar implements Component {
    private static buttonHandler: { [key: string]: handlerPreObject } = {
        'fa-list': {
            type: 'click',
            id: 'clickShowShoppinglist',
            body: (_self: edomElement) => {
                state.context.openShoppinglist();
            },
        },
        'fa-plus': {
            type: 'click',
            id: 'clickAddList',
            body: (_self: edomElement) => {
                new Dialog(new addNewList()).render(edom.findById('content')!);
            },
        },
        'fa-home': {
            type: 'click',
            id: 'clickMoveContextUp',
            body: (_self: edomElement) => {
                state.context.loadNextHigherContext();
            },
        },
        'fa-info-circle': {
            type: 'click',
            id: 'clickOpenInfo',
            body: (_self: edomElement) => {
                state.context.openInfoScreen();
            },
        },
        'fa-cog': {
            type: 'click',
            id: 'clickOpenSettings',
            body: (_self: edomElement) => {
                state.context.openSettingsScreen();
            },
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
                { divId: 'navbarBttnRight', buttonClass: 'fa-info-circle' },
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
