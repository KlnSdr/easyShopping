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

  constructor(name: string, section: string, selected: boolean, count: number) {
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
          (product.count > 1 ? `${product.count}x ` : "") + product.name
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
        new Dialog(new uploadListProgess()).render(edom.body);
        RemoteStoreConnector.write({
          name: this.name,
          products: this.serialize()
        }).then((id: string) => {
            console.log(id);
            this.createLink(id);
        });
        break;
      default:
        break;
    }
  }

  private createLink(id: string) {
    const payload: string = `https://easyshopping.klnsdr.com/share/?list=${encodeURIComponent(
      id
    )}`;
    uploadListProgess.setShareLink(payload);
  }
}
