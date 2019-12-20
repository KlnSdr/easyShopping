function checkChanged() {
    // newCheckBox("Butter");
    // console.log("Text und so.. ne!");
}
// ==================================================================================================================================================
function switchTo(id) {
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
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
// ==================================================================================================================================================
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
// ==================================================================================================================================================
function removeElement() {
    event.target.remove();
}
// ==================================================================================================================================================
function loadList() {
    let localList = localStorage.getItem('eslst');
    let tmp = "";
    let list = [];

    for (let i = 0; i < localList.length; i++) {
        if (localList[i] == ',') {
            list.push(tmp);
            tmp = "";
        } else {
            tmp += localList[i];
        }
    }

    list.push(tmp);

    console.log(list);

    for (const item in list) {
        let name;
        let group;
        let tmp = "";

        for (let i = 0; i < list[item].length; i++) {
            if (list[item][i] === ';') {
                name = tmp;
                tmp = "";
            } else {
                tmp += list[item][i];
            }
        }
        group = tmp;

        // console.log(name + "/" + group);
        newCheckBox(name, group);
    }
}
// ==================================================================================================================================================
function newButton(name) {
    let button = document.createElement("button"); // Create a <li> node
    button.addEventListener("click", removeElement);
    button.className = "ListButton button";
    let text = document.createTextNode(name); // Create a text node
    button.appendChild(text); // Append the text to <li>
    document.getElementById("selectList").appendChild(button); // Append <li> to <ul> with id="myList"
}
// ==================================================================================================================================================
function newCheckBox(name, group) {
    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let box = document.createElement("input"); // Create a <li> node
    box.type = "checkBox";
    box.className = "checkBox";
    box.value = name;
    box.addEventListener("change", checkChanged);

    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let label = document.createElement("label"); // Create a <li> node
    label.className = "selection";
    label.appendChild(box);
    let text = document.createTextNode(name); // Create a text node
    label.appendChild(text); // Append the text to <li>

    document.getElementById(group).appendChild(label); // Append <li> to <ul> with id="myList"
}
// ==================================================================================================================================================
function setup() {
    if (localStorage.getItem("eslst") === null) {
        localStorage.setItem('eslst',
            'Obst;selectObstGemuse,Gemüse;selectObstGemuse,Kartoffeln;selectObstGemuse,Salat;selectObstGemuse,Salatkräuter;selectObstGemuse,Zwiebeln;selectObstGemuse,Waschmittel;selectHygiene,Flüssigwaschmittel;selectHygiene,Zahnpasta;selectHygiene,Taschentücher;selectHygiene,Kindertaschentücher;selectHygiene,Küchenrolle;selectHygiene,Toilettenpapier;selectHygiene,Fensterreiniger;selectHygiene,Hygienespüler;selectHygiene,Deo;selectHygiene,Rasierklingen;selectHygiene,Rasierschaum;selectHygiene,Einweghandschuhe;selectHygiene,WC-Reiniger;selectHygiene,Kartoffeltaschen;selectTiefgefroren,Chicken Wings;selectTiefgefroren,Pizza;selectTiefgefroren,Piccolinis;selectTiefgefroren,Milch;selectMilch,Kakaomilch;selectMilch,Sahne;selectMilch,Schmand;selectMilch,Saure Sahne;selectMilch,Quark;selectMilch,Butter;selectMilch,Joghurt;selectMilch,Käsebelag;selectMilch,Soßenkäse;selectMilch,Streuselkäse;selectMilch,Frischkäse Pur;selectMilch,Frischkäse Kräuter;selectMilch,Parmesan;selectMilch,Eis;selectMilch,gezuckerte Kondensmilch;selectMilch,Feta;selectMilch,Müsliriegel;selectBackwaren,Toast;selectBackwaren,Brötchen;selectBackwaren,Tortillas;selectBackwaren,Mehl;selectBackwaren,passierte Tomaten;selectNudeln,Nudeln;selectNudeln,Oliven;selectNudeln,Tomatenmark;selectNudeln,Balsamicocreme;selectNudeln,Ketchup;selectNudeln,Müsli;selectGenuss,Cornflakes;selectGenuss,Marabou;selectGenuss,Kaffeeschokolade;selectGenuss,Kinderschokolade;selectGenuss,Kaffee;selectGenuss,Espresso;selectGenuss,Pudding;selectGenuss,Krombacher;selectGetranke,Malzbier;selectGetranke,Misch-Masch;selectGetranke,Fritz-Kola;selectGetranke,Saft;selectGetranke,Isostar;selectGetranke,Wasser;selectGetranke,Gaskartusche;selectGetranke,Gingerale Sirup;selectGetranke,Orangen Sirup;selectGetranke,Senf;selectSonst,Kaugummis;selectSonst,Karamellsirup;selectSonst,Öl;selectSonst,Wiener;selectSonst,Zucker;selectSonst,Salz;selectSonst,Pfeffer;selectSonst,Paprika;selectSonst,Kloßteig;selectSonst'
        );
    }

    let submenus = document.getElementsByClassName("container");
    for (let i = 0; i < submenus.length; i++) {
        submenus[i].style.visibility = "hidden";
        submenus[i].style.display = "none";
    }

    let menu = document.getElementById("menu");
    menu.style.visibility = "visible";
    menu.style.display = "block";
    loadList();
}
// ==================================================================================================================================================
function generateList() {

    let list = document.getElementsByClassName("ListButton");
    for (let i = list.length - 1; 0 <= i; i--)
        if (list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
        }

    let boxes = document.getElementsByClassName("checkBox");

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked === true) {
            newButton(boxes[i].value);
        }
    }
}
// ==================================================================================================================================================
function gotoSettings() {
    window.location = "/settings";
}
//eslst