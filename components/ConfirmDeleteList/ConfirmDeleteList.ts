class ConfirmDeleteList implements Component {
  private listName: string;

  constructor(listName: string) {
    this.listName = listName;
  }
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["containerDeleteList"],
      children: [
        {
          tag: "label",
          text: this.listName,
        },
        {
          tag: "div",
          classes: ["containerChoice"],
          children: [
            {
              tag: "button",
              classes: ["fa", "fa-check", "squareButton"],
              handler: [
                {
                  type: "click",
                  id: "clickConfirmConfirmDeleteList",
                  body: (self: edomElement) => {
                    self.parent?.parent?.parent?.delete();
                    Store.deleteList(this.listName);
                  },
                },
              ],
            },
            {
              tag: "button",
              classes: ["fa", "fa-times", "squareButton"],
              handler: [
                {
                  type: "click",

                  id: "clickExitConfirmDeleteList",
                  body: (self: edomElement) => {
                    new ListButton(this.listName).render(
                      self.parent?.parent?.parent!
                    );
                    self.parent?.parent?.delete();
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }

  public unload() {}
}
