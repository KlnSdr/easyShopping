//Public==============
let currentList = "";
//Public==============
// =========================================================================================================================
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
// =========================================================================================================================
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