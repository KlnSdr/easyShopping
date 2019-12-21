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
function removeElement() {
    this.parentElement.parentElement.remove();
    this.parentElement.remove();
    this.remove();
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
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let button = document.createElement("button");
    button.addEventListener("click", removeElement);
    button.className = "ListButton button";
    let text = document.createTextNode(name);
    button.appendChild(text);

    td.appendChild(button);
    tr.appendChild(td);

    document.getElementById("ListParent").appendChild(tr);
}
// ==================================================================================================================================================
function newCheckBox(name, group) {
    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let box = document.createElement("input");
    box.type = "checkBox";
    box.className = "checkBox";
    box.value = name;
    box.addEventListener("change", checkChanged);

    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let label = document.createElement("label");
    label.className = "selection";
    label.appendChild(box);
    let text = document.createTextNode(name);
    label.appendChild(text);

    document.getElementById(group).appendChild(label);
}
// ==================================================================================================================================================
function setup() {
    let products = 'Obst;selectObstGemuse,Gemüse;selectObstGemuse,Kartoffeln;selectObstGemuse,Salat;selectObstGemuse,Salatkräuter;selectObstGemuse,Zwiebeln;selectObstGemuse,Waschmittel;selectHygiene,Flüssigwaschmittel;selectHygiene,Zahnpasta;selectHygiene,Taschentücher;selectHygiene,Kindertaschentücher;selectHygiene,Küchenrolle;selectHygiene,Toilettenpapier;selectHygiene,Fensterreiniger;selectHygiene,Hygienespüler;selectHygiene,Deo;selectHygiene,Rasierklingen;selectHygiene,Rasierschaum;selectHygiene,Einweghandschuhe;selectHygiene,WC-Reiniger;selectHygiene,Kartoffeltaschen;selectTiefgefroren,Chicken Wings;selectTiefgefroren,Pizza;selectTiefgefroren,Piccolinis;selectTiefgefroren,Milch;selectMilch,Kakaomilch;selectMilch,Sahne;selectMilch,Schmand;selectMilch,Saure Sahne;selectMilch,Quark;selectMilch,Butter;selectMilch,Joghurt;selectMilch,Käsebelag;selectMilch,Soßenkäse;selectMilch,Streuselkäse;selectMilch,Frischkäse Pur;selectMilch,Frischkäse Kräuter;selectMilch,Parmesan;selectMilch,Eis;selectMilch,gezuckerte Kondensmilch;selectMilch,Feta;selectMilch,Müsliriegel;selectBackwaren,Toast;selectBackwaren,Brötchen;selectBackwaren,Tortillas;selectBackwaren,Mehl;selectBackwaren,passierte Tomaten;selectNudeln,Nudeln;selectNudeln,Oliven;selectNudeln,Tomatenmark;selectNudeln,Balsamicocreme;selectNudeln,Ketchup;selectNudeln,Müsli;selectGenuss,Cornflakes;selectGenuss,Marabou;selectGenuss,Kaffeeschokolade;selectGenuss,Kinderschokolade;selectGenuss,Kaffee;selectGenuss,Espresso;selectGenuss,Pudding;selectGenuss,Krombacher;selectGetranke,Malzbier;selectGetranke,Misch-Masch;selectGetranke,Fritz-Kola;selectGetranke,Saft;selectGetranke,Isostar;selectGetranke,Wasser;selectGetranke,Gaskartusche;selectGetranke,Gingerale Sirup;selectGetranke,Orangen Sirup;selectGetranke,Senf;selectSonst,Kaugummis;selectSonst,Karamellsirup;selectSonst,Öl;selectSonst,Wiener;selectSonst,Zucker;selectSonst,Salz;selectSonst,Pfeffer;selectSonst,Paprika;selectSonst,Kloßteig;selectSonst,Avocado;selectObstGemuse,Smoothie Yellow;selectGetranke,Smoothie Purple;selectGetranke'
    if (localStorage.getItem("eslst") !== products) {
        localStorage.setItem('eslst', products);
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
function resetList() {
    let products = 'Obst;selectObstGemuse,Gemüse;selectObstGemuse,Kartoffeln;selectObstGemuse,Salat;selectObstGemuse,Salatkräuter;selectObstGemuse,Zwiebeln;selectObstGemuse,Waschmittel;selectHygiene,Flüssigwaschmittel;selectHygiene,Zahnpasta;selectHygiene,Taschentücher;selectHygiene,Kindertaschentücher;selectHygiene,Küchenrolle;selectHygiene,Toilettenpapier;selectHygiene,Fensterreiniger;selectHygiene,Hygienespüler;selectHygiene,Deo;selectHygiene,Rasierklingen;selectHygiene,Rasierschaum;selectHygiene,Einweghandschuhe;selectHygiene,WC-Reiniger;selectHygiene,Kartoffeltaschen;selectTiefgefroren,Chicken Wings;selectTiefgefroren,Pizza;selectTiefgefroren,Piccolinis;selectTiefgefroren,Milch;selectMilch,Kakaomilch;selectMilch,Sahne;selectMilch,Schmand;selectMilch,Saure Sahne;selectMilch,Quark;selectMilch,Butter;selectMilch,Joghurt;selectMilch,Käsebelag;selectMilch,Soßenkäse;selectMilch,Streuselkäse;selectMilch,Frischkäse Pur;selectMilch,Frischkäse Kräuter;selectMilch,Parmesan;selectMilch,Eis;selectMilch,gezuckerte Kondensmilch;selectMilch,Feta;selectMilch,Müsliriegel;selectBackwaren,Toast;selectBackwaren,Brötchen;selectBackwaren,Tortillas;selectBackwaren,Mehl;selectBackwaren,passierte Tomaten;selectNudeln,Nudeln;selectNudeln,Oliven;selectNudeln,Tomatenmark;selectNudeln,Balsamicocreme;selectNudeln,Ketchup;selectNudeln,Müsli;selectGenuss,Cornflakes;selectGenuss,Marabou;selectGenuss,Kaffeeschokolade;selectGenuss,Kinderschokolade;selectGenuss,Kaffee;selectGenuss,Espresso;selectGenuss,Pudding;selectGenuss,Krombacher;selectGetranke,Malzbier;selectGetranke,Misch-Masch;selectGetranke,Fritz-Kola;selectGetranke,Saft;selectGetranke,Isostar;selectGetranke,Wasser;selectGetranke,Gaskartusche;selectGetranke,Gingerale Sirup;selectGetranke,Orangen Sirup;selectGetranke,Senf;selectSonst,Kaugummis;selectSonst,Karamellsirup;selectSonst,Öl;selectSonst,Wiener;selectSonst,Zucker;selectSonst,Salz;selectSonst,Pfeffer;selectSonst,Paprika;selectSonst,Kloßteig;selectSonst,Avocado;selectObstGemuse,Smoothie Yellow;selectGetranke,Smoothie Purple;selectGetranke'
    localStorage.setItem('eslst', products);
}
// ==================================================================================================================================================
function generateList() {

    let list = document.getElementsByClassName("ListButton");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].parentElement.parentElement.remove();
    }

    let boxes = document.getElementsByClassName("checkBox");

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked === true) {
            newButton(boxes[i].value);
        }
    }
}
// ==================================================================================================================================================
function download(filename) {
    let text = '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Einkaufszettel</title><style>html,body {font-family: "Arial";background-color: black;height: 100%;margin: 0px;padding: 0px;}table {width: calc(100% - 10px);/* border-spacing: 5px; */}.button {display: block;width: 100%;height: 50px;/* margin-top: 2.5px; */border: 0;border-radius: 5px;text-decoration: none;background-color: rgb(0, 51, 192);color: white;font-size: large;margin-left: 5px;}.header {color: white;font-size: 27px;display: block;width: 100%;text-align: center;padding-top: 15px;padding-bottom: 15px;}</style></head><body><label class="header">Einkaufszettel</label><table>';

    let boxes = document.getElementsByClassName("checkBox");
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked === true) {
            text += "<tr><td><button onclick='this.parentElement.parentElement.remove();this.parentElement.remove();this.remove()' class='button'>" + boxes[i].value + "</button></td></tr>";
        }
    }

    text += '</table></body></html>'

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
//eslst