enum AppMode {
    hub,
    list,
}

interface State {
    mode: AppMode;
    context: Context;
    currentList: List | null;
}

let state: State;

function startup() {
    initFirebase();
    edom.init();
    edomRouter.rewriteUrl();
    state = {
        mode: getCurrentState(),
        context: new Context(),
        currentList: null,
    };

    initUI();

    checkForSharedList();
}

function getCurrentState(): AppMode {
    const value: Optional<string> = Store.getString('currentList');
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
    const urlParams: obj = getUrlParameter();
    if (urlParams['list'] !== undefined) {
        const listFbId: string = urlParams['list'];
        FirebaseConnector.read(listFbId).then((result: obj | null) => {
            if (result !== null) {
                new Dialog(new addListFromFB(result.name, result.data)).render(
                    edom.findById('content')!
                );
            }
        });
    }
}

function getUrlParameter(): obj {
    const parameterString: string = window.location.search.substring(1);
    if (parameterString === '') {
        return {};
    }
    let params: obj = {};
    parameterString.split('&').forEach((keyValue: string) => {
        const [key, value] = keyValue.split('=');
        params[key] = value;
    });

    return params;
}
