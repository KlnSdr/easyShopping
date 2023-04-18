"use strict";
class Navbar {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'nav',
            children: [
                { divId: 'navbarBttnLeft', buttonClass: 'fa-plus' },
                { divId: 'navbarBttnMiddle', buttonClass: 'fa-home' },
                { divId: 'navbarBttnRight', buttonClass: 'fa-info-circle' },
            ].map(({ divId, buttonClass, }) => {
                return {
                    tag: 'div',
                    id: divId,
                    children: [
                        Navbar.getNavbarButtonInstructions(buttonClass),
                    ],
                };
            }),
        };
    }
    static getNavbarButtonInstructions(buttonClass) {
        return {
            tag: 'button',
            classes: ['fa', buttonClass],
            handler: [Navbar.buttonHandler[buttonClass]],
        };
    }
    unload() { }
}
Navbar.buttonHandler = {
    'fa-list': {
        type: 'click',
        id: 'clickShowShoppinglist',
        body: (_self) => {
            state.context.openShoppinglist();
        },
    },
    'fa-plus': {
        type: 'click',
        id: 'clickAddList',
        body: (_self) => {
            new Dialog(new addNewList()).render(edom.findById('content'));
        },
    },
    'fa-home': {
        type: 'click',
        id: 'clickMoveContextUp',
        body: (_self) => {
            state.context.loadNextHigherContext();
        },
    },
    'fa-info-circle': {
        type: 'click',
        id: 'clickOpenInfo',
        body: (_self) => {
            state.context.openInfoScreen();
        },
    },
    'fa-cog': {
        type: 'click',
        id: 'clickOpenSettings',
        body: (_self) => {
            state.context.openSettingsScreen();
        },
    },
};
