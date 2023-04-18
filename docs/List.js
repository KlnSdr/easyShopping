"use strict";
var MethodShare;
(function (MethodShare) {
    MethodShare[MethodShare["WhatsApp"] = 0] = "WhatsApp";
})(MethodShare || (MethodShare = {}));
class Product {
    set count(value) {
        this._count = value;
    }
    get count() {
        return this._count;
    }
    get section() {
        return this._section;
    }
    get name() {
        return this._name;
    }
    set selected(value) {
        this._selected = value;
    }
    get selected() {
        return this._selected;
    }
    constructor(name, section, selected, count) {
        this._name = name;
        this._section = section;
        this._selected = selected;
        this._count = count;
    }
    serialize() {
        return {
            n: this.name,
            s: this.section,
            sl: this.selected,
            c: this.count,
        };
    }
}
class List {
    get products() {
        return this.items;
    }
    get name() {
        return this._name;
    }
    constructor(name, items) {
        this._name = name;
        this.items = items.map((item) => {
            return new Product(item.n, item.s, item.sl, item.c);
        });
    }
    getShoppinglist() {
        return this.products
            .filter((product) => product.selected)
            .map((product) => (product.count > 1 ? `${product.count}x ` : '') +
            product.name);
    }
    serialize() {
        return this.items.map((item) => item.serialize());
    }
    addProduct(product) {
        this.products.push(product);
    }
    share(method) {
        switch (method) {
            case MethodShare.WhatsApp:
                const fbId = FirebaseConnector.write({
                    name: this.name,
                    data: this.serialize(),
                });
                const payload = `https://klnsdr.github.io/easyShopping?list=${encodeURIComponent(fbId)}`;
                sendWhatsApp(payload);
                break;
            default:
                break;
        }
    }
}
function sendWhatsApp(payload) {
    window.location.assign(`whatsapp://send?text=${encodeURIComponent(payload)}`);
}
