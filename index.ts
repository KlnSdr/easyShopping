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
    edom.init();
    state = {
        mode: getCurrentState(),
        context: new Context(),
        currentList: null,
    };

    initUI();
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
