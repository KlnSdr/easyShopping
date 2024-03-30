interface ProductObj {
    n: string;
    s: string;
    sl: boolean;
    c: number;
}

enum MethodShare {
    WhatsApp,
}

class Product {
    private _name: string;
    private _section: string;
    private _selected: boolean;
    private _count: number;
    public set count(value: number) {
        this._count = value;
    }
    public get count(): number {
        return this._count;
    }
    public get section(): string {
        return this._section;
    }
    public get name(): string {
        return this._name;
    }
    public set selected(value: boolean) {
        this._selected = value;
    }
    public get selected(): boolean {
        return this._selected;
    }

    constructor(
        name: string,
        section: string,
        selected: boolean,
        count: number
    ) {
        this._name = name;
        this._section = section;
        this._selected = selected;
        this._count = count;
    }

    public serialize(): ProductObj {
        return {
            n: this.name,
            s: this.section,
            sl: this.selected,
            c: this.count,
        };
    }
}

class List {
    private _name: string;
    private items: Product[];
    public get products(): Product[] {
        return this.items;
    }
    public get name(): string {
        return this._name;
    }

    constructor(name: string, items: ProductObj[]) {
        this._name = name;
        this.items = items.map((item: ProductObj) => {
            return new Product(item.n, item.s, item.sl, item.c);
        });
    }

    public getShoppinglist(): string[] {
        return this.products
            .filter((product: Product) => product.selected)
            .map(
                (product: Product) =>
                    (product.count > 1 ? `${product.count}x ` : '') +
                    product.name
            );
    }

    public serialize(): obj {
        return this.items.map((item: Product) => item.serialize());
    }

    public addProduct(product: Product) {
        this.products.push(product);
    }

    public share(method: MethodShare) {
        switch (method) {
            case MethodShare.WhatsApp:
                const fbId: string = FirebaseConnector.write({
                    name: this.name,
                    data: this.serialize(),
                });

                const payload: string = `https://klnsdr.github.io/easyShopping?list=${encodeURIComponent(
                    fbId
                )}`;
                sendWhatsApp(payload);
                break;
            default:
                break;
        }
    }
}

function sendWhatsApp(payload: string) {
    window.location.assign(
        `whatsapp://send?text=${encodeURIComponent(payload)}`
    );
}
