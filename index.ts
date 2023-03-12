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
