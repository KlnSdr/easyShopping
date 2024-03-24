class frownie implements Component {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['frownie'],
            children: [{ tag: 'p', classes: ['fa', 'fa-frown-o'] }],
        };
    }

    public unload() {}
}
