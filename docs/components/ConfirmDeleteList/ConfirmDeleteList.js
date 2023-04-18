"use strict";
class ConfirmDeleteList {
    constructor(listName) {
        this.listName = listName;
    }
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['containerDeleteList'],
            children: [
                {
                    tag: 'label',
                    text: `"${this.listName}" löschen?`,
                },
                {
                    tag: 'div',
                    classes: ['containerChoice'],
                    children: [
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-check', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickConfirmConfirmDeleteList',
                                    body: (self) => {
                                        var _a, _b, _c;
                                        (_c = (_b = (_a = self.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.delete();
                                        Store.deleteList(this.listName);
                                        state.context.openListHub();
                                    },
                                },
                            ],
                        },
                        {
                            tag: 'button',
                            classes: ['fa', 'fa-times', 'squareButton'],
                            handler: [
                                {
                                    type: 'click',
                                    id: 'clickExitConfirmDeleteList',
                                    body: (self) => {
                                        var _a, _b, _c, _d;
                                        new ListButton(this.listName).render((_b = (_a = self.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent);
                                        (_d = (_c = self.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.delete();
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    unload() { }
}
