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
    private readonly _name: string;
    private readonly _section: string;
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
    private readonly _name: string;
    private readonly items: Product[];
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

    public serializePage(pageNumber: number): obj | null {
        const products: obj = {};
        const pageSize: number = 40;

        for (let i = pageNumber * pageSize; i < pageSize * (pageNumber + 1); i++) {
            if (i >= this.items.length) {
                break;
            }
            products["product" + i] = this.items[i].serialize();
            products["product" + i].sl= this.items[i].selected ? "true" : "false";
        }

        return Object.keys(products).length == 0 ? null : products;
    }

    public addProduct(product: Product) {
        this.products.push(product);
    }

    public share(method: MethodShare) {
        switch (method) {
            case MethodShare.WhatsApp:
                let hasPage: boolean = true;
                let pageNumber: number = 0;
                const pages: obj[] = [];

                while (hasPage) {
                    let page: obj | null = this.serializePage(pageNumber);
                    if (page === null) {
                        hasPage = false;
                    } else {
                        pageNumber++;
                        pages.push(page);
                    }
                }

                if (pages.length === 0) {
                    // todo display error message using dialog
                    return;
                }

                const promiseId: Promise<string> = RemoteStoreConnector.writePage(null, {
                    products: pages[0],
                    name: this._name
                });

                promiseId.then((id: string) => {
                    this.storePage(id, 1, pages);
                });
                break;
            default:
                break;
        }
    }

    private storePage(listId: string, index: number, pages: obj[]) {
        if (index >= pages.length) {
            this.createLinkAndSend(listId);
            return;
        }

        RemoteStoreConnector.writePage(listId, {
            products: pages[index]
        }, index).then((_id: string) => {
            if (index < pages.length) {
                this.storePage(listId, ++index, pages);
            } else {
                this.createLinkAndSend(listId);
            }
        });
    }

    private createLinkAndSend(id: string) {
        const payload: string = `https://klnsdr.github.io/easyShopping?list=${encodeURIComponent(id)}`;
        sendWhatsApp(payload);
    }
}

function sendWhatsApp(payload: string) {
    // window.location.assign(
    //     `whatsapp://send?text=${encodeURIComponent(payload)}`
    // );
}
