interface obj {
    [key: string]: any;
}

interface Optional<T> {
    isPresent: boolean;
    value?: T;
}

class Store {
    public static storeKey: string = 'easyShopping';

    public static deleteList(name: string) {
        Store.initStore();
        let content: obj = Store.read();
        delete content[name];
        Store.write(content);
    }

    public static getList(name: string): List {
        const optProductObj: Optional<obj> = Store.getObj(name);
        return new List(
            name,
            optProductObj.isPresent
                ? (optProductObj.value! as ProductObj[])
                : []
        );
    }

    public static writeList(list: List) {
        Store.writeObj(list.name, list.serialize());
    }

    public static getObj(key: string): Optional<obj> {
        let content: obj = Store.read();

        if (content[key] === undefined) {
            return { isPresent: false };
        }
        return { isPresent: true, value: content[key] };
    }

    public static getString(key: string): Optional<string> {
        let content: obj = Store.read();

        if (content[key] === undefined) {
            return { isPresent: false };
        }
        return { isPresent: true, value: content[key] };
    }

    public static writeObj(key: string, value: obj) {
        let content: obj = Store.read();
        content[key] = value;
        Store.write(content);
    }

    public static writeString(key: string, value: string) {
        let content: obj = Store.read();
        content[key] = value;
        Store.write(content);
    }

    private static initStore() {
        if (localStorage.getItem(Store.storeKey) === null) {
            Store.write({ currentList: '' });
        }
    }

    public static getListNames(): string[] {
        let content: obj = Store.read();

        return Object.keys(content).filter(
            (key: string) => key != 'currentList'
        );
    }

    private static read(): obj {
        Store.initStore();
        return JSON.parse(localStorage.getItem(Store.storeKey)!);
    }

    private static write(data: obj) {
        localStorage.setItem(Store.storeKey, JSON.stringify(data));
    }
}
