"use strict";
class Context {
    constructor() {
        const hubContext = new edomElement(false, 'div');
        hubContext.id = 'contextHub';
        edom.fromTemplate([
            {
                tag: 'div',
                id: 'contextSections',
                handler: [
                    {
                        type: 'click',
                        id: 'clickLoadHub',
                        body: () => {
                            if (this.currentContext.id !== 'contextSections') {
                                return;
                            }
                            state.context.openListHub(false);
                            Store.writeString('currentList', '');
                            this.setLeftNavbarButton('fa-plus');
                            this.setRightNavbarButton('fa-info-circle');
                        },
                    },
                ],
                children: [
                    {
                        tag: 'div',
                        id: 'contextSection',
                        handler: [
                            {
                                type: 'click',
                                id: 'clickLoadSections',
                                body: () => {
                                    if (this.currentContext.id !==
                                        'contextSection') {
                                        return;
                                    }
                                    state.context.openList(state.currentList.name, false);
                                },
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        id: 'contextList',
                        handler: [
                            {
                                type: 'click',
                                id: 'clickLoadSections',
                                body: () => {
                                    if (this.currentContext.id !==
                                        'contextList') {
                                        return;
                                    }
                                    state.context.openList(state.currentList.name, false);
                                },
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        id: 'contextSettings',
                        handler: [
                            {
                                type: 'click',
                                id: 'clickLoadSections',
                                body: () => {
                                    if (this.currentContext.id !==
                                        'contextSettings') {
                                        return;
                                    }
                                    state.context.openList(state.currentList.name, false);
                                },
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'div',
                id: 'contextInfo',
                handler: [
                    {
                        type: 'click',
                        id: 'clickLoadHub',
                        body: () => {
                            if (this.currentContext.id !== 'contextInfo') {
                                return;
                            }
                            state.context.openListHub(false);
                            Store.writeString('currentList', '');
                            this.setLeftNavbarButton('fa-plus');
                            this.setRightNavbarButton('fa-info-circle');
                        },
                    },
                ],
            },
            { tag: 'div', id: 'contextnewList' },
        ], hubContext);
        this.contextHierarchy = hubContext;
        this.currentContext = this.contextHierarchy;
    }
    loadCurrentContext() {
        this.clearContent();
        if (state.mode === AppMode.hub) {
            this.openListHub();
        }
        else {
            this.openList(Store.getString('currentList').value);
        }
    }
    openListHub(setContext = true) {
        if (setContext) {
            this.currentContext = this.contextHierarchy;
            this.clearContent();
        }
        edom.findById('headline').text = 'Einkaufszettel';
        new ListHub(Store.getListNames()).render(edom.findById('content'));
    }
    openList(name, setContext = true) {
        const list = Store.getList(name);
        state.currentList = list;
        if (setContext) {
            this.currentContext = edom.findById('contextSections');
            this.clearContent();
        }
        Store.writeString('currentList', name);
        new ProductSections().render(edom.findById('content'));
        edom.findById('headline').text = name;
        this.setLeftNavbarButton('fa-list');
        this.setRightNavbarButton('fa-cog');
    }
    openSection(name, setContext = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextSection');
            this.clearContent();
        }
        edom.findById('headline').text = name;
        if (name === 'Eigene') {
            new SectionOwn().render(edom.findById('content'));
        }
        else {
            new Section(name).render(edom.findById('content'));
        }
    }
    openShoppinglist(setContext = true) {
        if (state.currentList === null) {
            return;
        }
        if (setContext) {
            this.currentContext = edom.findById('contextList');
            this.clearContent();
        }
        edom.findById('headline').text = 'Einkaufszettel';
        new Shoppinglist(state.currentList.getShoppinglist()).render(edom.findById('content'));
    }
    openInfoScreen(setContext = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextInfo');
            this.clearContent();
        }
        edom.findById('headline').text = 'Info';
        new InfoScreen().render(edom.findById('content'));
    }
    openSettingsScreen(setContext = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextSettings');
            this.clearContent();
        }
        new ListSettings().render(edom.findById('content'));
    }
    loadNextHigherContext() {
        if (this.currentContext.parent !== undefined) {
            this.clearContent();
            this.currentContext.doClick();
            this.currentContext = this.currentContext.parent;
        }
    }
    clearContent() {
        var _a;
        (_a = edom.findById('content')) === null || _a === void 0 ? void 0 : _a.children.forEach((child) => {
            child.delete();
        });
    }
    setLeftNavbarButton(buttonClass) {
        // switch navbar button from add new list to display shopinglist
        const leftButton = edom.findById('navbarBttnLeft');
        if (leftButton === undefined) {
            console.error('could not switch navbar button because left navbar button container was not found.');
            return;
        }
        leftButton.children.forEach((child) => {
            child.delete();
        });
        edom.fromTemplate([Navbar.getNavbarButtonInstructions(buttonClass)], leftButton);
    }
    setRightNavbarButton(buttonClass) {
        // switch navbar button from info to display "settings"
        const rightButton = edom.findById('navbarBttnRight');
        if (rightButton === undefined) {
            console.error('could not switch navbar button because right navbar button container was not found.');
            return;
        }
        rightButton.children.forEach((child) => {
            child.delete();
        });
        edom.fromTemplate([Navbar.getNavbarButtonInstructions(buttonClass)], rightButton);
    }
}
