class UI {
  public static init() {
    new Headline().render(edom.body);
    new Content().render(edom.body);
    new Navbar().render(edom.body);
    state.context.loadCurrentContext();
  }
}
