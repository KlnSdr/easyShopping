class Context {
  public loadCurrentContext() {
    if (state.mode === AppMode.hub) {
      new ListHub(["Rewe", "Netto", "Lidl", "Norma"]).render(
        edom.findById("content")!
      );
    }
  }
}
