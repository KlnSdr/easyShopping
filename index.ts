function startup() {
  generateListButtons(["Rewe", "Netto", "Lidl"]);
}

function generateListButtons(lists: string[]) {
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
      swipeActionListButton(e, listName, li);
    });

    li.appendChild(bttn);

    container.appendChild(li);
  });
}

function deleteList(name: string, parent: HTMLLIElement | null = null) {
  if (parent != null) {
    parent.remove();
  }
}

function abortDeleteList(name: string, parent: HTMLLIElement) {
  while (parent.lastChild != null) {
    parent.lastChild.remove();
  }
  const bttn: HTMLButtonElement = document.createElement("button");
  bttn.innerText = name;
  // TODO open list on click
  bttn.addEventListener("swiped-right", (e: Event) => {
    swipeActionListButton(e, name, parent);
  });

  parent.appendChild(bttn);
}

function swipeActionListButton(e: Event, listName: string, li: HTMLLIElement) {
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
    deleteList(listName, li);
  });

  containerChoice.appendChild(bttnYes);

  const bttnNo: HTMLButtonElement = document.createElement("button");
  bttnNo.classList.add("fa", "fa-times");
  bttnNo.classList.add("squareButton");
  bttnNo.addEventListener("click", () => {
    abortDeleteList(listName, li);
  });
  containerChoice.appendChild(bttnNo);

  div.appendChild(containerChoice);

  li.appendChild(div);
}
