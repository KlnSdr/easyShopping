class uiSkeleton implements Component {
    private content: edomTemplate | undefined;
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            children: [
                new Headline().instructions(),
                new Content().instructions(),
                new Navbar().instructions(),
            ],
        };
    }

    public setContent(content: edomTemplate) {
        this.content = content;
    }

    public unload() {}
}
