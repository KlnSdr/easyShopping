//Public==============
let products = '000Obst;selectObstGemuse;0,001Salatkräuter;selectObstGemuse;0,002Gemüse;selectObstGemuse;0,003Zwiebeln;selectObstGemuse;0,004Kartoffeln;selectObstGemuse;0,005Kloßteig;selectSonst;0,006Salat;selectObstGemuse;0,007Müsli;selectGenuss;0,008Cornflakes;selectGenuss;0,009Marabou;selectGenuss;0,010Kaffeeschokolade;selectGenuss;0,011Kinderschokolade;selectGenuss;0,012gezuckerte Kondensmilch;selectMilch;0,013Kaffee;selectGenuss;0,014Espresso;selectGenuss;0,015Karamellsirup;selectSonst;0,016Müsliriegel;selectBackwaren;0,017Toast;selectBackwaren;0,018Brötchen;selectBackwaren;0,019Pudding;selectGenuss;0,020Salz;selectSonst;0,021Zucker;selectSonst;0,022Mehl;selectBackwaren;0,023passierte Tomaten;selectNudeln;0,024Nudeln;selectNudeln;0,025Tomatenmark;selectNudeln;0,026Oliven;selectNudeln;0,027Senf;selectSonst;0,028Tortillas;selectBackwaren;0,029Balsamicocreme;selectNudeln;0,030Ketchup;selectNudeln;0,031Öl;selectSonst;0,032Paprika;selectSonst;0,033Pfeffer;selectSonst;0,034Wiener;selectSonst;0,035Kartoffeltaschen;selectTiefgefroren;0,036Chicken Wings;selectTiefgefroren;0,037Pizza;selectTiefgefroren;0,038Piccolinis;selectTiefgefroren;0,039Eis;selectMilch;0,040Milch;selectMilch;0,041Kakaomilch;selectMilch;0,042Sahne;selectMilch;0,043Schmand;selectMilch;0,044Saure Sahne;selectMilch;0,045Quark;selectMilch;0,046Butter;selectMilch;0,047Joghurt;selectMilch;0,048Käsebelag;selectMilch;0,049Soßenkäse;selectMilch;0,050Streuselkäse;selectMilch;0,051Feta;selectMilch;0,052Frischkäse Pur;selectMilch;0,053Frischkäse Kräuter;selectMilch;0,054Parmesan;selectMilch;0,055Saft;selectGetranke;0,056Gaskartusche;selectGetranke;0,057Gingerale Sirup;selectGetranke;0,058Orangen Sirup;selectGetranke;0,059Kaugummis;selectSonst;0,060Isostar;selectGetranke;0,061Waschmittel;selectHygiene;0,062WC-Reiniger;selectHygiene;0,063Flüssigwaschmittel;selectHygiene;0,064Fensterreiniger;selectHygiene;0,065Hygienespüler;selectHygiene;0,066Zahnpasta;selectHygiene;0,067Deo;selectHygiene;0,068Rasierklingen;selectHygiene;0,069Rasierschaum;selectHygiene;0,070Taschentücher;selectHygiene;0,071Kindertaschentücher;selectHygiene;0,072Küchenrolle;selectHygiene;0,073Einweghandschuhe;selectHygiene;0,074Toilettenpapier;selectHygiene;0,075Krombacher;selectGetranke;0,076Malzbier;selectGetranke;0,077Misch-Masch;selectGetranke;0,078Fritz-Kola;selectGetranke;0,079Wasser;selectGetranke;0';
//Public==============

function checkChanged() {
    //checkbox.value = indexPRODUCT
    //element in localstorage:indexPRODUCT;class;status

    // console.log("==============================================================");
    // console.log(this.value);

    let list = getList();

    let product = this.value.substring(3, this.value.length);
    let rawIndex = this.value.substring(0, 3);
    let index = parseInt(rawIndex);
    let status = "";


    // console.log(product);
    // console.log(index);
    // console.log(list[index]);

    if (this.checked === true) {
        status = "1";
    } else {
        status = "0";
    }

    list[index] = list[index].substring(0, list[index].length - 1) + status;

    // console.log(list[index]);
    save(list);
}
// ==================================================================================================================================================
function save(list) {
    let stringList = "";
    for (item in list) {
        stringList += list[item] + ",";
    }
    stringList = stringList.substring(0, stringList.length - 1);
    localStorage.setItem('eslst', stringList);
    // console.log(getList());
}
// ==================================================================================================================================================
function getList() {
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
    return list;
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
    list = getList();
    // console.log(list);

    for (const item in list) {
        //                  name    group   status
        let properties = ['', '', ''];
        let index = 0;
        let tmp = "";

        for (let i = 0; i < list[item].length; i++) {
            if (list[item][i] === ';') {
                properties[index] = tmp;
                tmp = "";
                index++;
            } else {
                tmp += list[item][i];
            }
        }
        properties[index] = tmp;


        newCheckBox(properties[0], properties[1], properties[2]);
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
function newCheckBox(name, group, status) {
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
    label.className = "selection";
    label.appendChild(box);
    let text = document.createTextNode(name.substring(3, name.length));
    label.appendChild(text);

    document.getElementById(group).appendChild(label);
}
// ==================================================================================================================================================
function setup() {
    if (localStorage.getItem("eslst") === null) {
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
            newButton(boxes[i].value.substring(3, boxes[i].length));
        }
    }
}
// ==================================================================================================================================================
function download(filename) {
    let text = '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Einkaufszettel</title><style>html,body {font-family: "Arial";background-color: black;height: 100%;margin: 0px;padding: 0px;}table {width: calc(100% - 10px);/* border-spacing: 5px; */}.button {display: block;width: 100%;height: 50px;/* margin-top: 2.5px; */border: 0;border-radius: 5px;text-decoration: none;background-color: rgb(0, 51, 192);color: white;font-size: large;margin-left: 5px;}.header {color: white;font-size: 27px;display: block;width: 100%;text-align: center;padding-top: 15px;padding-bottom: 15px;}</style></head><body><label class="header">Einkaufszettel</label><table>';

    let boxes = document.getElementsByClassName("checkBox");
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked === true) {
            text += "<tr><td><button onclick='this.parentElement.parentElement.remove();this.parentElement.remove();this.remove()' class='button'>" + boxes[i].value.substring(3, boxes[i].length) + "</button></td></tr>";
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
    alert("Downloaded!");
}
//eslst