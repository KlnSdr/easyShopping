class Headline implements Component {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['top'],
            children: [
                {
                    tag: 'h1',
                    id: 'headline',
                    text: 'Meine Einkaufszettel',
                },
            ],
        };
    }

    public unload() {}
}
