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
                        { tag: 'div', id: 'contextList' },
                        { tag: 'div', id: 'contextSettings' },
                    ],
                },
                { tag: 'div', id: 'contextSettings' },
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
        }
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
    }

    public openSection(name: string, setContext: boolean = true) {
        if (setContext) {
            this.currentContext = edom.findById('contextSection')!;
            this.clearContent();
        }

        new Section(name).render(edom.findById('content')!);
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
}
