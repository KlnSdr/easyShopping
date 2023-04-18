"use strict";
class ListSettings {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['containerSettingsButtons'],
            children: ['fa-undo', 'fa-recycle', 'fa-share'].map((className) => {
                return {
                    tag: 'button',
                    classes: ['fa', className],
                    handler: [ListSettings.buttonHandler[className]],
                };
            }),
        };
    }
    unload() { }
}
ListSettings.buttonHandler = {
    'fa-undo': {
        type: 'click',
        id: 'resetList',
        body: (self) => {
            try {
                state.currentList = new List(state.currentList.name, baseListProducts);
                Store.writeList(state.currentList);
                self.applyStyle('success');
            }
            catch (e) {
                self.applyStyle('fail');
            }
        },
    },
    'fa-recycle': {
        type: 'click',
        id: 'recycleList',
        body: (self) => {
            var _a;
            try {
                (_a = state.currentList) === null || _a === void 0 ? void 0 : _a.products.forEach((product) => (product.selected = false));
                Store.writeList(state.currentList);
                self.applyStyle('success');
            }
            catch (e) {
                self.applyStyle('fail');
            }
        },
    },
    'fa-share': {
        type: 'click',
        id: 'shareList',
        body: (_self) => { var _a; return (_a = state.currentList) === null || _a === void 0 ? void 0 : _a.share(MethodShare.WhatsApp); },
    },
};
