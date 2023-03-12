interface obj {
  [key: string]: any;
}

interface Optional<T> {
  isPresent: boolean;
  value?: T;
}

class Store {
  public static storeKey: string = "easyShopping";

  public static deleteList(name: string) {
    console.log(name);
  }

  public static getList(name: string) {}

  public static writeList(name: string) {}

  public static getObj(key: string): Optional<obj> {
    Store.initStore();

    let content: obj = JSON.parse(localStorage.getItem(Store.storeKey)!);

    if (content[key] === undefined) {
      return { isPresent: false };
    }
    return { isPresent: true, value: content[key] };
  }

  public static getString(key: string): Optional<string> {
    Store.initStore();

    let content: obj = JSON.parse(localStorage.getItem(Store.storeKey)!);

    if (content[key] === undefined) {
      return { isPresent: false };
    }
    return { isPresent: true, value: content[key] };
  }

  public static writeObj(key: string, value: obj) {
    Store.initStore();
    let content: obj = JSON.parse(localStorage.getItem(Store.storeKey)!);
    content[key] = value;
    localStorage.setItem(Store.storeKey, JSON.stringify(content));
  }

  public static writeString(key: string, value: string) {
    Store.initStore();
    let content: obj = JSON.parse(localStorage.getItem(Store.storeKey)!);
    content[key] = value;
    localStorage.setItem(Store.storeKey, JSON.stringify(content));
  }

  public static initStore() {
    if (localStorage.getItem(Store.storeKey) === null) {
      localStorage.setItem(
        Store.storeKey,
        JSON.stringify({
          currentList: "",
        })
      );
    }
  }
}
