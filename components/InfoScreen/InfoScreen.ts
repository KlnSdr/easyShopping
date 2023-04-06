class InfoScreen implements Component {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'p',
            text: 'v2.0.0',
        };
    }

    public unload() {}
}
