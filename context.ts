class Context {
    private contextHierarchy: edomElement;
    private currentContext: edomElement;

    constructor() {
        const hubContext: edomElement = new edomElement(false, 'div');
        hubContext.id = 'contextHub';

        edom.fromTemplate(
            [
                {
                    tag: 'div',
                    id: 'contextSections',
                    handler: [
                        {
                            type: 'click',
                            id: 'clickLoadHub',
                            body: () => {
                                if (
                                    this.currentContext.id !== 'contextSections'
                                ) {
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
                                        if (
                                            this.currentContext.id !==
                                            'contextSection'
                                        ) {
                                            return;
                                        }
                                        state.context.openList(
                                            state.currentList!.name,
                                            false
                                        );
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
                                        if (
                                            this.currentContext.id !==
                                            'contextList'
                                        ) {
                                            return;
                                        }
                                        state.context.openList(
                                            state.currentList!.name,
                                            false
                                        );
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
                                        if (
                                            this.currentContext.id !==
                                            'contextSettings'
                                        ) {
                                            return;
                                        }
                                        state.context.openList(
                                            state.currentList!.name,
                                            false
                                        );
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
            ],
            hubContext
        );

        this.contextHierarchy = hubContext;
        this.currentContext = this.contextHierarchy;
    }

    public loadCurrentContext() {
        this.clearContent();
        if (state.mode === AppMode.hub) {
            this.openListHub();
        } else {
            this.openList(Store.getString('currentList').value!);
        }
    }

    public openListHub(setContext: boolean = true) {
        if (setContext) {
            this.currentContext = this.contextHierarchy;
            this.clearContent();
        }
        edom.findById('headline')!.text = 'Einkaufszettel';
        new ListHub(Store.getListNames()).render(edom.findById('content')!);
    }

    public openList(name: string, setContext: boolean = true) {
        const list: List = Store.getList(name);
        state.currentList = list;
        if (setContext) {
            this.currentContext = edom.findById('contextSections')!;
            this.clearContent();
        }
        Store.writeString('currentList', name);
        new ProductSections().render(edom.findById('content')!);
        edom.findById('headline')!.text = name;

        this.setLeftNavbarButton('fa-list');
        this.setRightNavbarButton('fa-cog');
    }

    public openSection(name: string, setContext: boolean = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextSection')!;
            this.clearContent();
        }

        edom.findById('headline')!.text = name;
        if (name === 'Eigene') {
            new SectionOwn().render(edom.findById('content')!);
        } else {
            new Section(name).render(edom.findById('content')!);
        }
    }

    public openShoppinglist(setContext: boolean = true) {
        if (state.currentList === null) {
            return;
        }

        if (setContext) {
            this.currentContext = edom.findById('contextList')!;
            this.clearContent();
        }

        edom.findById('headline')!.text = 'Einkaufszettel';
        new Shoppinglist(state.currentList!.getShoppinglist()).render(
            edom.findById('content')!
        );
    }

    public openInfoScreen(setContext: boolean = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextInfo')!;
            this.clearContent();
        }

        edom.findById('headline')!.text = 'Info';
        new InfoScreen().render(edom.findById('content')!);
    }

    public openSettingsScreen(setContext: boolean = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextSettings')!;
            this.clearContent();
        }

        new ListSettings().render(edom.findById('content')!);
    }

    public loadNextHigherContext() {
        if (this.currentContext.parent !== undefined) {
            this.clearContent();
            this.currentContext.doClick();
            this.currentContext = this.currentContext.parent!;
        }
    }

    private clearContent() {
        edom.findById('content')?.children.forEach((child: edomElement) => {
            child.delete();
        });
    }

    private setLeftNavbarButton(buttonClass: string) {
        // switch navbar button from add new list to display shopinglist
        const leftButton: edomElement | undefined =
            edom.findById('navbarBttnLeft');
        if (leftButton === undefined) {
            console.error(
                'could not switch navbar button because left navbar button container was not found.'
            );
            return;
        }

        leftButton.children.forEach((child: edomElement) => {
            child.delete();
        });

        edom.fromTemplate(
            [Navbar.getNavbarButtonInstructions(buttonClass)],
            leftButton
        );
    }

    private setRightNavbarButton(buttonClass: string) {
        // switch navbar button from info to display "settings"
        const rightButton: edomElement | undefined =
            edom.findById('navbarBttnRight');
        if (rightButton === undefined) {
            console.error(
                'could not switch navbar button because right navbar button container was not found.'
            );
            return;
        }

        rightButton.children.forEach((child: edomElement) => {
            child.delete();
        });

        edom.fromTemplate(
            [Navbar.getNavbarButtonInstructions(buttonClass)],
            rightButton
        );
    }
}
