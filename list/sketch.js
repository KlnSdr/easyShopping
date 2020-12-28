//Public==============
let currentList = "";
//Public==============

//=====================================================
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
            updates['content'] = postData;
            updateDatabaseEntry(updates, sync[1]);
        }
    } catch (error) {}
}
// ==================================================================================================================================================
function save(list) {
    localStorage.setItem(currentList, JSON.stringify(list));
}
// ==================================================================================================================================================
function getList() {
    return JSON.parse(localStorage.getItem(currentList));
}
// ==================================================================================================================================================
function switchTo(id) {
    if (id == "menu") {
        if (document.getElementById("menu").style.visibility == "visible") {
            localStorage.setItem("workingList", "");
            window.location = "../";
        }
    }
    let menu = document.getElementsByClassName("container");
    for (let i = 0; i < menu.length; i++) {
        menu[i].style.visibility = "hidden";
        menu[i].style.display = "none";
    }

    let div = document.getElementById(id);
    div.style.visibility = "visible";
    div.style.display = "block";
}
// ==================================================================================================================================================
function removeElement() {
    this.parentElement.parentElement.remove();
    this.parentElement.remove();
    this.remove();
}
// ==================================================================================================================================================
function loadList() {
    list = getList();

    for (const count in list) {
        let item = list[count];
        newCheckBox(item.n, item.c, item.s, (item.count != undefined) ? (item.count.toString()) : ("1"));
    }
}
// ==================================================================================================================================================
function newButton(name, count) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let button = document.createElement("button");
    button.addEventListener("click", removeElement);
    button.className = "ListButton button";
    let text = document.createTextNode(((count != "1") ? ("(" + count.toString() + ") ") : ("")) + name);
    button.appendChild(text);

    td.appendChild(button);
    tr.appendChild(td);

    document.getElementById("ListParent").appendChild(tr);
}
// ==================================================================================================================================================

let timer;
let touchduration = 500; //length of time we want the user to touch before we do something

function newCheckBox(name, group, status, count) {
    // console.log(name);
    // console.log(group);
    // console.log(status);
    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let box = document.createElement("input");
    box.type = "checkBox";
    box.className = "checkBox";
    box.value = name;
    box.addEventListener("change", checkChanged);
    if (status === "0") {
        box.checked = false;
    } else {
        box.checked = true;
    }

    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let label = document.createElement("label");
    label.addEventListener("touchstart", () => {
        // label.addEventListener("mousedown", () => {
        console.log("start");
        timer = setTimeout(() => {
            if (timer) {
                clearTimeout(timer);
            }
            console.log("stop");
            console.log("long press");
            // code
            openDialog("Menge:", (data) => {
                console.log("yes\nvalue:" + data);
                label.children[1].innerText = ` (${data})`;
            }, () => {
                console.log("no");
            }, "speichern", "verwerfen", true, "", "number", (context) => {
                document.getElementById("dialogInput").value = parseInt(context[0].children[1].innerText.replace(" (", "").replace(")", ""));
            }, label);
        }, touchduration);
    });
    label.addEventListener("mouseup", () => {
        if (timer) {
            clearTimeout(timer);
        }
        console.log("stop");
    });
    label.addEventListener("touchcancel", () => {
        if (timer) {
            clearTimeout(timer);
        }
        console.log("stop");
    });

    label.addEventListener("touchend", () => {
        if (timer) {
            clearTimeout(timer);
        }
        console.log("stop");
    });

    label.className = "selection";
    label.appendChild(box);
    let text = document.createTextNode(name);
    label.appendChild(text);

    let lblCount = document.createElement("label");
    lblCount.appendChild(document.createTextNode(` (${count})`));

    label.appendChild(lblCount);

    document.getElementById(group).appendChild(label);
}
// ==================================================================================================================================================
function setup() {
    if (localStorage.getItem("workingList") !== "") {
        currentList = localStorage.getItem("workingList");
    } else {
        window.location = "../";
    }

    if (localStorage.getItem(currentList) === null) {
        localStorage.setItem(currentList, JSON.stringify(products));
    }

    loadList();

    let submenus = document.getElementsByClassName("container");
    for (let i = 0; i < submenus.length; i++) {
        submenus[i].style.visibility = "hidden";
        submenus[i].style.display = "none";
    }

    let menu = document.getElementById("menu");
    menu.style.visibility = "visible";
    menu.style.display = "block";
}
// ==================================================================================================================================================
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
// ==================================================================================================================================================
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
// ==================================================================================================================================================
function addCustom() {
    let val = document.getElementById("inCustom").value;
    if (val != "" && val != null) {
        if (val[0] == "<") {
            document.getElementById("xssTarget").innerHTML = val;
        } else {
            let prod = {
                n: val,
                c: "customProducts",
                s: "1",
                count: "1"
            }
            let list = getList();
            list.push(prod);
            save(list);

            newCheckBox(document.getElementById("inCustom").value, "customProducts", "1", "1");
            //===============================================================
        }
        document.getElementById("inCustom").value = "";
    }
}
// ==================================================================================================================================================
function shareList() {
    let list = getList();
    let id = writeToDatabase({
        name: currentList,
        content: JSON.stringify(list)
    });

    let text = "https://KlnSdr.github.io/easyShopping?lst=" + encodeURIComponent(id);
    sendWhatsApp(text);
}

//keeping if needed
function compress(list) {
    let tmp = []
    let temp = "";

    for (i in list) {
        if (list[i] !== ";") {
            temp += list[i];
        } else {
            tmp.push(temp);
        }
    }

    list = temp;


    let zip = ""
    let prev = list[0];
    let count = 1;

    for (let i = 1; i < list.length; i++) {
        let element = list[i];

        if (element === prev) {
            count += 1;
        } else {
            if (count === 1) {
                zip += prev + ";";
            } else {
                zip += String.fromCharCode(count + 64) + prev + ";";
            }
            count = 1;
            prev = element;
        }
    }

    zip += String.fromCharCode(count + 64) + prev;

    return zip;
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

//keeping if needed
function extract(zip) {
    let list = "";

    let tmp = ""
    let Zettel = []

    for (i in zip) {
        if (zip[i] === ';') {
            Zettel.push(tmp);
            tmp = "";
        } else {
            tmp += zip[i];
        }
    }
    Zettel.push(tmp);

    for (i in Zettel) {
        if (Zettel[i].length === 1) {
            list += Zettel[i] + ";";
        } else {
            let Anzahl = Zettel[i][0].charCodeAt(0) - 64;
            let status = Zettel[i][1];
            for (let j = 0; j < Anzahl; j++) {
                list += status + ";";
            }
        }
    }

    if (list[list.length - 1] === ";") {
        list = list.substring(0, list.length - 1);
    }

    return list;
}
// ==================================================================================================================================================
function sendWhatsApp(message) {
    window.location = "whatsapp://send?text=" + encodeURIComponent(message);
}
// ==================================================================================================================================================
function generateList() {

    let listButtons = document.getElementsByClassName("ListButton");
    for (let i = listButtons.length - 1; 0 <= i; i--) {
        listButtons[i].parentElement.parentElement.remove();
    }

    let list = getList();

    for (const count in list) {
        if (list[count].s == "1") {
            newButton(list[count].n, (list[count].count != undefined) ? list[count].count.toString() : "1");
        }
    }
}