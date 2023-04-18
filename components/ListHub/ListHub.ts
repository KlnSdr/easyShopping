class ListHub implements Component {
    private listNames: string[];
    constructor(listNames: string[]) {
        this.listNames = listNames.sort();
    }
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        if (this.listNames.length === 0) {
            return new frownie().instructions();
        }
        return {
            tag: 'ul',
            classes: ['listHub'],
            id: 'listButtons',
            children: this.listNames.map((name: string) => {
                return {
                    tag: 'li',
                    children: [new ListButton(name).instructions()],
                };
            }),
        };
    }

    public unload() {}
}
