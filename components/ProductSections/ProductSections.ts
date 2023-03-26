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
            tag: 'table',
            classes: ['productSectionsTable'],
            children: Object.keys(ProductSections.sections)
                .map((title: string, index: number, array: string[]) => {
                    if (index % 2 === 0 && index + 1 < array.length) {
                        return {
                            tag: 'tr',
                            children: [
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'button',
                                            text: title,
                                            handler: [
                                                {
                                                    type: 'click',
                                                    id: 'clickOpenSection',
                                                    body: (
                                                        self: edomElement
                                                    ) => {
                                                        state.context.openSection(
                                                            title
                                                        );
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    tag: 'td',
                                    children: [
                                        {
                                            tag: 'button',
                                            text: array[index + 1],
                                            handler: [
                                                {
                                                    type: 'click',
                                                    id: 'clickOpenSection',
                                                    body: (
                                                        self: edomElement
                                                    ) => {
                                                        state.context.openSection(
                                                            array[index + 1]
                                                        );
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        };
                    } else {
                        return null;
                    }
                })
                .filter((elm) => elm !== null) as edomTemplate[],
        };
    }

    public unload() {}
}
