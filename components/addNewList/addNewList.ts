class addNewList implements DialogContentComponent {
    private inputId: string;

    constructor() {
        this.inputId = Math.random().toString() + Math.random().toString();
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['addNewList'],
            children: [
                {
                    tag: 'p',
                    text: 'Name der Liste:',
                },
                {
                    tag: 'input',
                    id: this.inputId,
                },
                {
                    tag: 'div',
                    classes: ['centerButtons'],
                    children: [
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-times', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickCloseDialog',
                                    body: (self: edomElement) =>
                                        Dialog.findParentDialog(self).delete(),
                                },
                            ],
                        },
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-save', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickAddList',
                                    body: (self: edomElement) =>
                                        this.createNewList(self),
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }

    public unload() {}

    private createNewList(self: edomElement) {
        const inputListName: edomInputElement = edom.findById(
            this.inputId
        ) as edomInputElement;

        const listName: string = inputListName.value.trim();

        Dialog.findParentDialog(self).delete();

        if (listName === '') {
            return;
        }

        const list: List = new List(listName, baseListProducts);
        Store.writeList(list);

        state.context.openList(listName);
    }

    public onRendered() {
        edom.findById(this.inputId)!.focus();
    }
}
