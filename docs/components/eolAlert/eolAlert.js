"use strict";
class eolAlert {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            children: [
                {
                    tag: 'p',
                    text: 'Diese Version wird nicht mehr weiterentwickelt.',
                },
                {
                    tag: 'p',
                    text: 'Ein neuere und verbesserte Version ist jetzt unter easyshopping.klnsdr.com/ zu finden.',
                },
                {
                    tag: 'button',
                    text: 'zu klnsdr.com wechseln',
                    handler: [
                        {
                            id: 'goToKlnsdrCom',
                            type: 'click',
                            body: (_self) => {
                                window.location.assign('https://klnsdr.com/easyShopping');
                            },
                        },
                    ],
                },
            ],
        };
    }
    unload() { }
    onRendered() { }
}
