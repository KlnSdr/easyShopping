enum AppMode {
  hub,
  list,
}

interface State {
  mode: AppMode;
  context: Context;
}

let state: State = {
  mode: AppMode.hub,
  context: new Context(),
};

function startup() {
  initUI();

  state.mode = getCurrentState();
}

function getCurrentState(): AppMode {
  const value: Optional<string> = Store.getString("currentList");
  if (value.isPresent === false || value.value === "") {
    return AppMode.hub;
  }

  return AppMode.list;
}

function initUI() {
  edom.init();
  UI.init();
}
