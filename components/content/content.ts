class Content implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      id: "content",
      children: [{ tag: "ul", id: "listButtons" }],
    };
  }

  public unload() {}
}
