class listHub implements Component {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return new uiSkeleton().instructions();
    }

    public unload() {}
}
edomRouter.addRoute('/', new listHub());
