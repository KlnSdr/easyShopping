class InfoScreen implements Component {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            children: [
                {
                    tag: 'img',
                    classes: ['logo'],
                    src: 'favicon.svg',
                },
                {
                    tag: 'p',
                    text: 'v3.0.0',
                },
            ],
        };
    }

    public unload() {}
}
