"use strict";
var AppMode;
(function (AppMode) {
    AppMode[AppMode["hub"] = 0] = "hub";
    AppMode[AppMode["list"] = 1] = "list";
})(AppMode || (AppMode = {}));
let state;
function startup() {
    edom.init();
    state = {
        mode: getCurrentState(),
        context: new Context(),
        currentList: null,
    };
    initUI();
    new Dialog(new eolAlert()).render(edom.body);
}
function getCurrentState() {
    const value = Store.getString('currentList');
    if (value.isPresent === false || value.value === '') {
        return AppMode.hub;
    }
    return AppMode.list;
}
function initUI() {
    UI.init();
}
