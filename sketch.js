//Public==============
let products = 'Obst;selectObstGemuse;0,Salatkräuter;selectObstGemuse;0,Smoothie Purple;selectGetranke;0,Smoothie Yellow;selectGetranke;0,Avocado;selectObstGemuse;0,Gemüse;selectObstGemuse;0,Zwiebeln;selectObstGemuse;0,Kartoffeln;selectObstGemuse;0,Kloßteig;selectSonst;0,Salat;selectObstGemuse;0,Müsli;selectGenuss;0,Cornflakes;selectGenuss;0,Marabou;selectGenuss;0,Kaffeeschokolade;selectGenuss;0,Kinderschokolade;selectGenuss;0,gezuckerte Kondensmilch;selectMilch;0,Kaffee;selectGenuss;0,Espresso;selectGenuss;0,Karamellsirup;selectSonst;0,Müsliriegel;selectBackwaren;0,Toast;selectBackwaren;0,Brötchen;selectBackwaren;0,Pudding;selectGenuss;0,Salz;selectSonst;0,Zucker;selectSonst;0,Mehl;selectBackwaren;0,passierte Tomaten;selectNudeln;0,Nudeln;selectNudeln;0,Nudelsoße;selectNudeln;0,Tomatenmark;selectNudeln;0,Oliven;selectNudeln;0,Senf;selectSonst;0,Tortillas;selectBackwaren;0,Balsamicocreme;selectNudeln;0,Ketchup;selectNudeln;0,Öl;selectSonst;0,Paprika;selectSonst;0,Pfeffer;selectSonst;0,Wiener;selectSonst;0,Kartoffeltaschen;selectTiefgefroren;0,Chicken Wings;selectTiefgefroren;0,Pizza;selectTiefgefroren;0,Piccolinis;selectTiefgefroren;0,Eis;selectMilch;0,Milch;selectMilch;0,Kakaomilch;selectMilch;0,Sahne;selectMilch;0,Schmand;selectMilch;0,Saure Sahne;selectMilch;0,Quark;selectMilch;0,Butter;selectMilch;0,Joghurt;selectMilch;0,Käsebelag;selectMilch;0,Soßenkäse;selectMilch;0,Streuselkäse;selectMilch;0,Feta;selectMilch;0,Frischkäse Pur;selectMilch;0,Frischkäse Kräuter;selectMilch;0,Parmesan;selectMilch;0,Saft;selectGetranke;0,Gaskartusche;selectGetranke;0,Gingerale Sirup;selectGetranke;0,Orangen Sirup;selectGetranke;0,Kaugummis;selectSonst;0,Isostar;selectGetranke;0,Waschmittel;selectHygiene;0,WC-Reiniger;selectHygiene;0,Flüssigwaschmittel;selectHygiene;0,Fensterreiniger;selectHygiene;0,Hygienespüler;selectHygiene;0,Zahnpasta;selectHygiene;0,Deo;selectHygiene;0,Rasierklingen;selectHygiene;0,Rasierschaum;selectHygiene;0,Taschentücher;selectHygiene;0,Kindertaschentücher;selectHygiene;0,Küchenrolle;selectHygiene;0,Einweghandschuhe;selectHygiene;0,Toilettenpapier;selectHygiene;0,Krombacher;selectGetranke;0,Malzbier;selectGetranke;0,Misch-Masch;selectGetranke;0,Fritz-Kola;selectGetranke;0,Wasser;selectGetranke;0';
//Public==============

function checkChanged() {
    //checkbox.value = indexPRODUCT
    //element in localstorage:indexPRODUCT;class;status

    // console.log("==============================================================");
    // console.log(this.value);

    let list = getList();

    let product = this.value;

    let index = "";

    for (i in product) {
        if (product[i] === ";") {
            break;
        } else {
            index += product[i];
        }
    }
    index = parseInt(index);

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
    save(list, false);
}
// ==================================================================================================================================================
function save(list, isRawText) {
    if (isRawText) {
        localStorage.setItem('eslst', list);
    } else {
        let stringList = "";
        for (item in list) {
            stringList += list[item] + ",";
        }
        stringList = stringList.substring(0, stringList.length - 1);
        localStorage.setItem('eslst', stringList);
        // console.log(getList());
    }
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
        let properties = ['', '', '', ''];
        let index = 1;
        let tmp = "";

        properties[0] = item;

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


        newCheckBox(properties[1], properties[2], properties[3], properties[0], list[item].substring(0, list[item].length - 2));
    }
}
// ==================================================================================================================================================
function newButton(name) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let button = document.createElement("button");
    button.addEventListener("click", removeElement);
    button.className = "ListButton button";
    let text = document.createTextNode(name.replace('+', ' '));
    button.appendChild(text);

    td.appendChild(button);
    tr.appendChild(td);

    document.getElementById("ListParent").appendChild(tr);
}
// ==================================================================================================================================================
function newCheckBox(name, group, status, index, rawText) {
    //<label class="selection"><input type="checkbox" onchange="checkChanged()" value="milch">Milch</label>
    let box = document.createElement("input");
    box.type = "checkBox";
    box.className = "checkBox";
    box.value = index + ";" + name;
    box.id = rawText;
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
    let text = document.createTextNode(name.replace('+', ' '));
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

    let param = GetURLParameter("lst");
    if (param !== undefined) {
        // openList(atob(param));
        openList(param);
    } else {
        loadList();
    }
}
// ==================================================================================================================================================
function resetList() {
    localStorage.setItem('eslst', products);

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
        let len = eslst[item].length;
        eslst[item] = eslst[item].substring(0, len - 1) + "0";
    }

    save(eslst, false);

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
        let prod = val;
        prod += ";" + currentClass
        let list = getList();
        list.push(prod + ";1");
        save(list);

        //          name,group,          status, index,      rawText
        newCheckBox(val, currentClass, "1", list.length - 1, prod);
        //===============================================================
        document.getElementById("inCustom").value = "";
        document.getElementById('inCustom').focus();
    }
}
// ==================================================================================================================================================
function shareList() {
    //keep for later
    // let boxes = getList();
    // let text = "";

    // for (let i = 0; i < boxes.length; i++) {
    //     let current = document.getElementById(boxes[i].substring(0, boxes[i].length - 2));
    //     if (boxes[i].includes("customProducts") === false) {
    //         if (current.checked === true) {
    //             text += "1;";
    //         } else {
    //             text += "0;";
    //         }
    //     }
    // }

    // if (text.length > 0) {
    //     text = text.substring(0, text.length - 1);
    //     // text = compress(text);
    //     text = "https://KlnSdr.github.io/easyShopping?lst=" + btoa(text);
    //     sendWhatsApp(text);
    // }
    let text = "";
    let boxes = getList();

    for (let i = 0; i < boxes.length; i++) {
        text += boxes[i] + ",";
    }

    text = text.substring(0, text.length - 1);

    text = "https://KlnSdr.github.io/easyShopping?lst=" + text

    sendWhatsApp(text);
}

//keep for later
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
    // let list = getList();
    // let zettel = [];

    // // text = extract(text);

    // for (let i = 0; i < text.length; i++) {
    //     if (i % 2 === 0) {
    //         zettel.push(text[i]);
    //     }
    // }

    // for (i in zettel) {
    //     list[i] = list[i].substring(0, list[i].length - 1) + zettel[i];
    // }

    // save(list), false;

    // list = document.getElementsByClassName("checkBox");
    // for (let i = list.length - 1; 0 <= i; i--) {
    //     list[i].remove();
    // }

    // list = document.getElementsByClassName("selection");
    // for (let i = list.length - 1; 0 <= i; i--) {
    //     list[i].remove();
    // }

    // loadList();

    save(decodeURIComponent(text), true);
    window.location = "https://KlnSdr.github.io/easyShopping";
}

//keep for later
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
    // console.log("whatsapp://send?text=" + encodeURIComponent(message));
}
// ==================================================================================================================================================
function generateList() {

    let list = document.getElementsByClassName("ListButton");
    for (let i = list.length - 1; 0 <= i; i--) {
        list[i].parentElement.parentElement.remove();
    }

    let boxes = getList();

    for (let i = 0; i < boxes.length; i++) {
        let current = document.getElementById(boxes[i].substring(0, boxes[i].length - 2));
        if (current.checked === true) {
            let text = current.value;
            let boolean = false;
            let tmp = "";

            for (j in text) {
                if (boolean === true) {
                    tmp += text[j];
                } else {
                    if (text[j] === ';') {
                        boolean = true;
                    }
                }
            }
            text = tmp;

            newButton(text);
        }
    }
}
// ==================================================================================================================================================
function toggleDD() {
    let dd = document.getElementById('dropdown');
    if (dd.style.display === 'none') {
        dd.style.display = 'block';
    } else {
        dd.style.display = 'none';
    }
}
// ========================================================================================================================================
let currentClass = "selectSelf";

function otherClass() {
    document.getElementById('current').innerText = event.target.parentElement.innerText;
    currentClass = event.target.id;
    toggleDD();
}
// ==================================================================================================================================================
function download(filename) {
    let text = '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Einkaufszettel</title><style>html,body {font-family: "Arial";background-color: black;height: 100%;margin: 0px;padding: 0px;}table {width: calc(100% - 10px);/* border-spacing: 5px; */}.button {display: block;width: 100%;height: 50px;/* margin-top: 2.5px; */border: 0;border-radius: 5px;text-decoration: none;background-color: rgb(0, 51, 192);color: white;font-size: large;margin-left: 5px;}.header {color: white;font-size: 27px;display: block;width: 100%;text-align: center;padding-top: 15px;padding-bottom: 15px;}</style></head><body><label class="header">Einkaufszettel</label><table>';

    let boxes = getList();

    for (let i = 0; i < boxes.length; i++) {
        let current = document.getElementById(boxes[i].substring(0, boxes[i].length - 2));
        if (current.checked === true) {
            let innerText = "";
            let boolean = false;

            for (j in current.value) {
                if (boolean === true) {
                    innerText += current.value[j];
                } else {
                    if (current.value[j] === ";") {
                        boolean = true;
                    }
                }
            }

            text += "<tr><td><button onclick='this.parentElement.parentElement.remove();this.parentElement.remove();this.remove()' class='button'>" + innerText + "</button></td></tr>";
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