"use strict";
class Store {
    static deleteList(name) {
        Store.initStore();
        let content = Store.read();
        delete content[name];
        Store.write(content);
    }
    static getList(name) {
        const optProductObj = Store.getObj(name);
        return new List(name, optProductObj.isPresent
            ? optProductObj.value
            : []);
    }
    static writeList(list) {
        Store.writeObj(list.name, list.serialize());
    }
    static getObj(key) {
        let content = Store.read();
        if (content[key] === undefined) {
            return { isPresent: false };
        }
        return { isPresent: true, value: content[key] };
    }
    static getString(key) {
        let content = Store.read();
        if (content[key] === undefined) {
            return { isPresent: false };
        }
        return { isPresent: true, value: content[key] };
    }
    static writeObj(key, value) {
        let content = Store.read();
        content[key] = value;
        Store.write(content);
    }
    static writeString(key, value) {
        let content = Store.read();
        content[key] = value;
        Store.write(content);
    }
    static initStore() {
        if (localStorage.getItem(Store.storeKey) === null) {
            Store.write({ currentList: '' });
        }
    }
    static getListNames() {
        let content = Store.read();
        return Object.keys(content).filter((key) => key != 'currentList');
    }
    static read() {
        Store.initStore();
        return JSON.parse(localStorage.getItem(Store.storeKey));
    }
    static write(data) {
        localStorage.setItem(Store.storeKey, JSON.stringify(data));
    }
}
Store.storeKey = 'easyShopping';
class FirebaseConnector {
    static write(data) {
        //@ts-ignore
        const id = FirebaseConnector.database
            .ref('lists')
            .push(data).key;
        return id;
    }
    static read(id) {
        return new Promise((resolve) => {
            FirebaseConnector.database
                .ref(`lists/${id}`)
                .once('value', (data) => {
                resolve(data.val());
            });
        });
    }
    static initConnection() {
        //@ts-ignore
        firebase.initializeApp({
            databaseURL: FirebaseConnector.fbUrl,
        });
        //@ts-ignore
        FirebaseConnector.database = firebase.database();
    }
    static closeConnection() {
        //@ts-ignore
        firebase.database().goOffline();
    }
}
FirebaseConnector.fbUrl = 'https://easyshopping-ac502.firebaseio.com';
