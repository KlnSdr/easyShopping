function loadList() {
    list = getList();

    for (const count in list) {
        let item = list[count];
        newCheckBox(item.n, item.c, item.s, (item.count != undefined) ? (item.count.toString()) : ("1"));
    }
}
// =========================================================================================================================
function save(list) {
    localStorage.setItem(currentList, JSON.stringify(list));
}
// =========================================================================================================================
function getList() {
    return JSON.parse(localStorage.getItem(currentList));
}
// =========================================================================================================================
function resetList() {
    localStorage.setItem(currentList, JSON.stringify(products));

    let list = document.getElementsByClassName("checkBox");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    list = document.getElementsByClassName("selection");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    loadList();
}
// =========================================================================================================================
function checkChanged() {
    let list = getList();

    let PRODUCT = this.value;

    if (this.checked === true) {
        status = "1";
    } else {
        status = "0";
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].n == PRODUCT) {
            list[i].s = (this.checked == true) ? "1" : "0";
            list[i].count = this.parentElement.children[1].innerText.replace(" (", "").replace(")", "");
            console.log(list[i].count);
        }
    }

    save(list);

    try {
        const sync = localStorage.getItem(currentList + ".config").split(";");
        if (sync.length > 1 && sync[0] == "true") {
            var updates = {};
            updates['content'] = JSON.stringify(list);
            updateDatabaseEntry(updates, sync[1]);
        }
    } catch (error) {}
}
// =========================================================================================================================
function clearList() {
    let eslst = getList();

    for (item in eslst) {
        eslst[item].s = "0";
    }

    save(eslst);

    let list = document.getElementsByClassName("checkBox");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    list = document.getElementsByClassName("selection");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    loadList();
}
// =========================================================================================================================
function openList(text) {
    let list = getList();
    let zettel = [];

    text = text;

    for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
            zettel.push(text[i]);
        }
    }

    for (i in zettel) {
        list[i] = list[i].substring(0, list[i].length - 1) + zettel[i];
    }

    save(list);

    list = document.getElementsByClassName("checkBox");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    list = document.getElementsByClassName("selection");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].remove();
    }

    loadList();
}
// =========================================================================================================================
function generateList() {

    let listButtons = document.getElementsByClassName("ListButton");
    for (let i = listButtons.length - 1; 0 <= i; i--) {
        listButtons[i].parentElement.parentElement.remove();
    }

    let list = getList();

    for (const count in list) {
        if (list[count].s == "1") {
            console.log(list[count].count);
            newButton(list[count].n, (list[count].count != undefined) ? list[count].count.toString() : "1");
        }
    }
}