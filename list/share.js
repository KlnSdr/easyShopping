function shareList() {
    let list = getList();
    let id = writeToDatabase({
        name: currentList,
        content: JSON.stringify(list)
    });

    let text = "https://KlnSdr.github.io/easyShopping?lst=" + encodeURIComponent(id);
    sendWhatsApp(text);
}
// =========================================================================================================================
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
// =========================================================================================================================
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
// =========================================================================================================================
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
// =========================================================================================================================
function sendWhatsApp(message) {
    window.location = "whatsapp://send?text=" + encodeURIComponent(message);
}