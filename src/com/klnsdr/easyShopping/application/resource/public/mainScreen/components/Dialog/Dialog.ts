class Dialog implements Component {
    private bodyContent: DialogContentComponent;

    constructor(content: DialogContentComponent) {
        this.bodyContent = content;
    }

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
        this.bodyContent.onRendered();
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['dialogBackground'],
            children: [
                {
                    tag: 'div',
                    classes: ['dialogContainer'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['dialogHead'],
                            children: [
                                {
                                    tag: 'button',
                                    classes: ['fa', 'fa-times', 'squareButton'],
                                    handler: [
                                        {
                                            type: 'click',
                                            id: 'clickCloseDialog',
                                            body: (self: edomElement) =>
                                                Dialog.findParentDialog(
                                                    self
                                                ).delete(),
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tag: 'div',
                            classes: ['dialogBody'],
                            children: [this.bodyContent.instructions()],
                        },
                        {
                            tag: 'div',
                            classes: ['dialogFooter'],
                        },
                    ],
                },
            ],
        };
    }

    public unload() {}

    public static findParentDialog(self: edomElement): edomElement {
        let elm: edomElement | undefined;
        elm = self.parent;
        let i: number = 0;
        const maxIter = 100;

        while (elm !== undefined && !elm.classes.includes('dialogBackground')) {
            elm = elm.parent;

            if (i >= maxIter) {
                elm = undefined;
                break;
            }
        }

        if (elm === undefined) {
            throw new Error('could not find parent dialog');
        }

        return elm!;
    }
}
