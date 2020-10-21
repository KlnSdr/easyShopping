function setup() {
    if (localStorage.getItem("workingList") === null) {
        localStorage.setItem("workingList", "");
    }

    // open shared list =====================================
    let param = GetURLParameter("lst");
    if (param !== undefined) {
        param = decodeURIComponent(param);
        openList(param);
    } else {
        setupPartTwo();
    }
    // ======================================================
}

function setupPartTwo() {
    if (localStorage.getItem("workingList") !== "") {
        navigateTo(localStorage.getItem("workingList"), true);
    }

    let lists = localStorage.getItem("Lists");

    try {
        lists = lists.split(";");
        lists.forEach(name => {
            if (name != "") {
                newButton(name);
            }
        });

        if (lists.length == 1) {
            let frownie = document.getElementById("frown");
            frownie.style.visibility = "visible";
            frownie.style.display = "block";
        }
    } catch (error) {
        let frownie = document.getElementById("frown");
        frownie.style.visibility = "visible";
        frownie.style.display = "block";
    }

    let menu = document.getElementsByClassName("container");
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.visibility = "hidden";
        menu[i].style.display = "none";
    }

    let div = document.getElementById("DivLists");
    div.style.visibility = "visible";
    div.style.display = "block";
}
// ==================================================================================================================================================
function openList(text) {
    openDialog("Möchtest du einen neuen Einkaufszettel erstellen?", () => {
        readDatabase(text, (data) => {
            addList(true, data);
        });
    }, () => {
        setupPartTwo();
    }, "Ja", "Nein");
}
// ==================================================================================================================================================
function GetURLParameter(sParam) {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}
// ==================================================================================================================================================
function newButton(name) {
    let tr = document.createElement("tr");
    let tdNavTo = document.createElement("td");

    let button = document.createElement("button");
    button.addEventListener("click", navigateTo);
    button.className = "ListButton button";
    let text = document.createTextNode(name);
    button.appendChild(text);

    let tdDelete = document.createElement("td");
    tdDelete.className = "removeButton";

    let buttonTrash = document.createElement("button");
    buttonTrash.addEventListener("click", () => {

        let lists = localStorage.getItem("Lists");
        console.log(lists);

        let tmp = "";
        lists = lists.split(";");
        lists.forEach(listName => {
            if (listName != "" && listName != name) {
                tmp += listName + ";";
            }
        });

        localStorage.removeItem(name);
        localStorage.setItem("Lists", tmp);
        reloadLists();

    });

    buttonTrash.className = "button removeThingy fa fa-trash";

    tdNavTo.appendChild(button);
    tdDelete.appendChild(buttonTrash);

    tr.appendChild(tdNavTo);
    tr.appendChild(tdDelete);

    document.getElementById("Lists").appendChild(tr);
}
// ==================================================================================================================================================
function addList(sharedList = false, list = "") {
    if (sharedList) {
        list = JSON.parse(list);
        console.log(list);
    }

    openDialog("Wie soll dein neuer Einkaufszettel heißen?", (name) => {
        if (name != "" && name !== null) {
            if (localStorage.getItem("Lists") === null) {
                localStorage.setItem("Lists", "");
            }
            localStorage.setItem("Lists", localStorage.getItem("Lists") + name + ";");
            if (sharedList) {
                localStorage.setItem(name, JSON.stringify(JSON.parse(list.content)));
            }
            navigateTo(name, true);
        }
    }, () => {}, "speichern", "abbrechen", true, (sharedList) ? list.name : "");
}
// ==================================================================================================================================================
function navigateTo(listName = "", secondary = false) {
    if (secondary == false) {
        listName = event.srcElement.innerText;
    }

    localStorage.setItem("workingList", listName);

    window.location = "list/";
}

function reloadLists() {
    document.getElementById("Lists").innerHTML = "";
    setupPartTwo();
}