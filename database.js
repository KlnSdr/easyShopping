var firebaseConfig = {
    databaseURL: "https://easyshopping-ac502.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

window.onbeforeunload = () => {
    firebase.database().goOffline();
}

function writeToDatabase(data) {
    let ref = database.ref('lists');
    return ref.push(JSON.stringify(data)).key;
}

function readDatabase(id, callback) {
    let ref = database.ref('lists/' + id);
    ref.once('value', (data) => {
        callback(data.val());
    });
}