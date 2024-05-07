class ListButton implements Component {
    private listName: string;
    constructor(listName: string) {
        this.listName = listName;
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'button',
            text: this.listName,
            handler: [
                {
                    type: 'swiped-right',
                    id: 'swipeRightConfirmDelete',
                    body: (self: edomElement) => {
                        new ConfirmDeleteList(this.listName).render(
                            self.parent!
                        );
                        self.delete();
                    },
                },
                {
                    type: 'click',
                    id: 'clickOpenList',
                    body: (self: edomElement) => {
                        state.context.openList(self.text);
                    },
                },
            ],
        };
    }

    public unload() {}
}
