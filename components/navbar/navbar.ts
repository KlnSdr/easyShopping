class Navbar implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "nav",
      children: ["fa-plus", "fa-home", "fa-cog"].map((specialClass: string) => {
        return {
          tag: "button",
          classes: ["fa", specialClass],
        };
      }),
    };
  }

  public unload() {}
}
