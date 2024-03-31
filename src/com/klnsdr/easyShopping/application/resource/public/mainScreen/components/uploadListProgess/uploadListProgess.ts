class uploadListProgess implements DialogContentComponent {
  private static buttonHandler: { [key: string]: handlerPreObject } = {
    "fa-files-o": {
      type: "click",
      id: "copyLink",
      body: (self: edomElement) => {
        self.removeStyle("success", "fail");
        try {
          const link: string = this.getLinkFromInput();
          if (link === "") {
            throw new Error("");
          }
          navigator.clipboard.writeText(link);
          self.applyStyle("success");
        } catch (e) {
          self.applyStyle("fail");
        }
      },
    },
    "fa-whatsapp": {
      type: "click",
      id: "shareWhatsapp",
      body: (self: edomElement) => {
        self.removeStyle("success", "fail");
        try {
          const link: string = this.getLinkFromInput();
          if (link === "") {
            throw new Error("");
          }
          window.location.assign(
            `whatsapp://send?text=${encodeURIComponent(link)}`
          );
          self.applyStyle("success");
        } catch (e) {
          self.applyStyle("fail");
        }
      },
    },
  };
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      children: [
        {
          tag: "p",
          text: "Lade Liste hoch...",
          id: "staticTextUploadList",
        },
        {
          tag: "p",
          text: "",
          id: "currentPageUpdloadOutput",
        },
        {
          tag: "input",
          id: "outputShareLink",
          classes: ["hidden"],
        },
        {
          tag: "div",
          id: "containerShareButtons",
          classes: ["containerShareButtons", "hidden"],
          children: ["fa-files-o", "fa-whatsapp"].map((className: string) => {
            return {
              tag: "button",
              classes: ["fa", className],
              handler: [uploadListProgess.buttonHandler[className]],
            };
          }),
        },
      ],
    };
  }

  public static updateCurrentPage(current: number, max: number): void {
    edom.findById("currentPageUpdloadOutput")!.text = `${current}/${max}`;
  }

  public static setShareLink(link: string): void {
    edom.findById("staticTextUploadList")!.delete();
    edom.findById("currentPageUpdloadOutput")!.delete();

    edom.findById("outputShareLink")!.removeStyle("hidden");
    edom.findById("containerShareButtons")!.removeStyle("hidden");

    (edom.findById("outputShareLink") as edomInputElement).value = link;
  }

  public unload() {}

  onRendered(): void {}

  private static getLinkFromInput(): string {
    return (edom.findById("outputShareLink") as edomInputElement).value;
  }
}
