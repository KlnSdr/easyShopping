class eolAlert implements DialogContentComponent {
    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            children: [
                {
                    tag: 'p',
                    text: 'Diese Version wird nicht mehr weiterentwickelt.',
                },
                {
                    tag: 'p',
                    text: 'Ein neuere und verbesserte Version ist jetzt unter klnsdr.com/easyShopping zu finden.',
                },
                {
                    tag: 'button',
                    text: 'zu klnsdr.com wechseln',
                    handler: [
                        {
                            id: 'goToKlnsdrCom',
                            type: 'click',
                            body: (_self: edomElement) => {
                                window.location.assign(
                                    'https://klnsdr.com/easyShopping'
                                );
                            },
                        },
                    ],
                },
            ],
        };
    }

    public unload() {}

    public onRendered() {}
}
