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
// =========================================================================================================================
function newButton(name, count) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let button = document.createElement("button");
    button.addEventListener("click", removeElement);
    button.className = "ListButton button";
    let text = document.createTextNode(((count != "1") ? (count.toString() + "x") : ("")) + name);
    button.appendChild(text);

    td.appendChild(button);
    tr.appendChild(td);

    document.getElementById("ListParent").appendChild(tr);
}
// =========================================================================================================================
function removeElement() {
    this.parentElement.parentElement.remove();
    this.parentElement.remove();
    this.remove();
}
// =========================================================================================================================
let timer;
let touchduration = 1000; //length of time we want the user to touch before we do something
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
                // checkChanged("Obst");
                label.children[0].dispatchEvent(new Event("change"));
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