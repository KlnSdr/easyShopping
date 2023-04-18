"use strict";
class ListButton {
    constructor(listName) {
        this.listName = listName;
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'button',
            text: this.listName,
            handler: [
                {
                    type: 'swiped-right',
                    id: 'swipeRightConfirmDelete',
                    body: (self) => {
                        new ConfirmDeleteList(this.listName).render(self.parent);
                        self.delete();
                    },
                },
                {
                    type: 'click',
                    id: 'clickOpenList',
                    body: (self) => {
                        state.context.openList(self.text);
                    },
                },
            ],
        };
    }
    unload() { }
}
