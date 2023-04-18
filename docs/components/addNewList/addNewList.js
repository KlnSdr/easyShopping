"use strict";
class addNewList {
    constructor() {
        this.listName = '';
        this.inputId = Math.random().toString() + Math.random().toString();
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
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
                    value: this.listName,
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
                                    body: (self) => Dialog.findParentDialog(self).delete(),
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
                                    body: (self) => this.createNewList(self),
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    unload() { }
    createNewList(self) {
        const inputListName = edom.findById(this.inputId);
        const listName = inputListName.value.trim();
        Dialog.findParentDialog(self).delete();
        if (listName === '') {
            return;
        }
        const list = new List(listName, baseListProducts);
        Store.writeList(list);
        state.context.openList(listName);
    }
    onRendered() {
        edom.findById(this.inputId).focus();
    }
    getInputId() {
        return this.inputId;
    }
}
class addListFromFB extends addNewList {
    constructor(remoteName, remoteListData) {
        super();
        super.listName = remoteName;
        this.listData = remoteListData;
    }
    createNewList(self) {
        const inputListName = edom.findById(super.getInputId());
        const listName = inputListName.value.trim();
        Dialog.findParentDialog(self).delete();
        if (listName === '') {
            return;
        }
        const list = new List(listName, this.listData);
        Store.writeList(list);
        state.context.openList(listName);
    }
}
