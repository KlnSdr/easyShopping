class ProductSections implements Component {
    public static sections: obj = {
        'Obst&Gemüse': 'selectObstGemuse',
        Hygiene: 'selectHygiene',
        Tiefgefroren: 'selectTiefgefroren',
        Milchprodukte: 'selectMilch',
        Backwaren: 'selectBackwaren',
        Nudeln: 'selectNudeln',
        Genussmittel: 'selectGenuss',
        Getränke: 'selectGetranke',
        Sonstiges: 'selectSonst',
        Eigene: 'selectSelf',
    };

    public render(parent: edomElement) {
        edom.fromTemplate([this.instructions()], parent);
    }

    public instructions(): edomTemplate {
        return {
            tag: 'div',
            classes: ['productSectionsContainer'],
            children: Object.keys(ProductSections.sections).map(
                (title: string) => {
                    return {
                        tag: 'button',
                        text: title,
                        handler: [
                            {
                                type: 'click',
                                id: 'clickOpenSection',
                                body: (_self: edomElement) => {
                                    state.context.openSection(title);
                                },
                            },
                        ],
                    };
                }
            ),
        };
    }

    public unload() {}
}
