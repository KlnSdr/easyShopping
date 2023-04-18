"use strict";
var AppMode;
(function (AppMode) {
    AppMode[AppMode["hub"] = 0] = "hub";
    AppMode[AppMode["list"] = 1] = "list";
})(AppMode || (AppMode = {}));
let state;
function startup() {
    initFirebase();
    edom.init();
    state = {
        mode: getCurrentState(),
        context: new Context(),
        currentList: null,
    };
    initUI();
    checkForSharedList();
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
function initFirebase() {
    FirebaseConnector.initConnection();
    window.onbeforeunload = () => {
        FirebaseConnector.closeConnection();
    };
}
function checkForSharedList() {
    const urlParams = getUrlParameter();
    if (urlParams['list'] !== undefined) {
        const listFbId = urlParams['list'];
        FirebaseConnector.read(listFbId).then((result) => {
            if (result !== null) {
                new Dialog(new addListFromFB(result.name, result.data)).render(edom.findById('content'));
            }
        });
    }
}
function getUrlParameter() {
    const parameterString = window.location.search.substring(1);
    if (parameterString === '') {
        return {};
    }
    let params = {};
    parameterString.split('&').forEach((keyValue) => {
        const [key, value] = keyValue.split('=');
        params[key] = value;
    });
    return params;
}
