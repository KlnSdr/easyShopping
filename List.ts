interface ProductObj {
    n: string;
    s: string;
    sl: string;
    c: string;
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
            sl: this.selected ? '1' : '0',
            c: this.count.toString(),
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
            return new Product(
                item.n,
                item.s,
                item.sl === '1' ? true : false,
                parseInt(item.c)
            );
        });
    }

    public serialize(): obj {
        return this.items.map((item: Product) => item.serialize());
    }
}
