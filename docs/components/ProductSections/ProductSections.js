"use strict";
class ProductSections {
    render(parent) {
        edom.fromTemplate([this.instructions()], parent);
    }
    instructions() {
        return {
            tag: 'div',
            classes: ['productSectionsContainer'],
            children: Object.keys(ProductSections.sections).map((title) => {
                return {
                    tag: 'button',
                    text: title,
                    handler: [
                        {
                            type: 'click',
                            id: 'clickOpenSection',
                            body: (_self) => {
                                state.context.openSection(title);
                            },
                        },
                    ],
                };
            }),
        };
    }
    unload() { }
}
ProductSections.sections = {
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
