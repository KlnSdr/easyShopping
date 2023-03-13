enum AppMode {
  hub,
  list,
}

interface State {
  mode: AppMode;
}

let state: State = {
  mode: AppMode.hub,
};

function startup() {
  initUI();

  state.mode = getCurrentState();
  Hub.generateListButtons(["Rewe", "Netto", "Lidl"]);
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
