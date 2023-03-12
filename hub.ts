class Hub {
  public static generateListButtons(lists: string[]) {
    const container: HTMLUListElement = document.getElementById(
      "listButtons"
    ) as HTMLUListElement;

    while (container.lastChild != null) {
      container.lastChild.remove();
    }

    lists.sort();

    lists.forEach((listName: string) => {
      const li: HTMLLIElement = document.createElement("li");

      const bttn: HTMLButtonElement = document.createElement("button");
      bttn.innerText = listName;
      // TODO open list on click
      bttn.addEventListener("swiped-right", (e: Event) => {
        Hub.swipeActionListButton(e, listName, li);
      });

      li.appendChild(bttn);

      container.appendChild(li);
    });
  }

  public static removeListFromView(parent: HTMLLIElement | null = null) {
    if (parent != null) {
      parent.remove();
    }
  }

  public static abortDeleteList(name: string, parent: HTMLLIElement) {
    while (parent.lastChild != null) {
      parent.lastChild.remove();
    }
    const bttn: HTMLButtonElement = document.createElement("button");
    bttn.innerText = name;
    // TODO open list on click
    bttn.addEventListener("swiped-right", (e: Event) => {
      Hub.swipeActionListButton(e, name, parent);
    });

    parent.appendChild(bttn);
  }

  public static swipeActionListButton(
    e: Event,
    listName: string,
    li: HTMLLIElement
  ) {
    (e.target as HTMLButtonElement).remove();

    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("containerDeleteList");

    const labelName: HTMLLabelElement = document.createElement("label");
    labelName.innerText = `"${listName}" löschen?`;
    div.appendChild(labelName);

    const containerChoice: HTMLDivElement = document.createElement("div");
    containerChoice.classList.add("containerChoice");

    const bttnYes: HTMLButtonElement = document.createElement("button");
    bttnYes.classList.add("fa", "fa-check");
    bttnYes.classList.add("squareButton");
    bttnYes.addEventListener("click", () => {
      Hub.removeListFromView(li);
      Store.deleteList(listName);
    });

    containerChoice.appendChild(bttnYes);

    const bttnNo: HTMLButtonElement = document.createElement("button");
    bttnNo.classList.add("fa", "fa-times");
    bttnNo.classList.add("squareButton");
    bttnNo.addEventListener("click", () => {
      Hub.abortDeleteList(listName, li);
    });
    containerChoice.appendChild(bttnNo);

    div.appendChild(containerChoice);

    li.appendChild(div);
  }
}
