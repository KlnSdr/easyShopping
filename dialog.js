// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let dialogContent = document.getElementById("dialogContent");

function openDialog(text = "", yesAction, noAction, yesText = "Ja", noText = "Nein", showInput = false, defaultText = "", inputType = "text", doOnStartup = () => {}, startupParam = "") {
    console.log("start dial");
    modal.style.display = "block";
    dialogContent.innerText = text;

    document.getElementById("dialogInputContainer").classList = (showInput) ? "dialogInputContainer show" : "dialogInputContainer hide";
    if (showInput == true) {
        document.getElementById("dialogInput").type = inputType;
    }
    document.getElementById("dialogInput").value = defaultText;

    const fun = (callback, ...params) => {
        console.log("cb");
        callback(params);
    };

    fun(doOnStartup, startupParam);

    document.getElementById("dialogYes").innerText = yesText;
    document.getElementById("dialogNo").innerText = noText;

    document.getElementById("dialogYes").onclick = () => {
        closeDialog();
        if (showInput) {
            yesAction(document.getElementById("dialogInput").value);
        } else {
            yesAction();
        }
    };
    document.getElementById("dialogNo").onclick = () => {
        closeDialog();
        if (showInput) {
            noAction(document.getElementById("dialogInput").value);
        } else {
            noAction();
        }
    };
}

span.onclick = () => {
    closeDialog();
};

function closeDialog() {
    modal.style.display = "none";
}