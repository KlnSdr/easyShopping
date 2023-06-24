const baseListProducts: ProductObj[] = [
    { n: 'Erdinger', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Paulaner', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Krombacher', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Heinecke', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Kola', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Misch Masch', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Limo Orange', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Limo Zitrone', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Gösser', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Obst', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Knoblauch', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Gemüse', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Apfel', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Salatkräuter', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Kartoffeln', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Zwiebeln', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Avocado', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Salat', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Spargel', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Smoothie Yellow', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Smoothie Purple', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Pilze', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Brötchen', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Brot', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Brezel', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Marmelade-Bio', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Haferflocken', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Nudelsoße-Bio', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Tomatenmark', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Passierte Tomaten', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Reiswaffeln', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Toast', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Tortillas', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Aufbackbrötchen', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Finnbröd', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Pumpernickel', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Sonnenkernbrot', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Finn-Crisp', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Kaffeesahne', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Gezuckerte Kondensmilch', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Kaffe', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Espresso', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Malzkaffee', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Chai-Latte', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Roibostee', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Pfefferminztee', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Kakao', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Eiskaffe', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Cappuccino', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Chokocème', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Marmelade', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Honig', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Corny-Riegel', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Isostar', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Köllnflocken', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Müsli', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Cornflakes', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Mehl', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Wolke', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Pudding', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Zucker', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Salz', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Stärke', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Kokosflocken', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Vanillezucker', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Backpulver', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Trockenhefe', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Marabou', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Cadburry', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Kinderschokolade', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Fred Ferkel', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Peace&Love', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Smarties', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Kekse', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Kaugummies', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Maggi', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Sauce Hollondaise', s: 'selectSonst', sl: false, c: 1 },
    { n: 'vegane Remoulade', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Senf', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Ketchup', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Himalayareis', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Currypaste', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Kokosmilch', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Oliven', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Lasagneplatten', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Nudeln', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Barilla Nudelsoße', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Pesto', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Öl', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Balsmicocrème', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Pizzagewürz', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Pfeffer', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Paprika', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Veganer Speck', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Vegane Schnitzel', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Valessschnitzel', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Vegane Wiener', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Schupfnudeln', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Spätzle', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Streuselkäse', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Käsebelag', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Soßenkäse', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Frischkäsescheiben', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Frischkäse Pur', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Frischkäse Kräuter', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Käsetaler', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Feta', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Haloumi', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Grillkäse', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Raclettekäse', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Obazda', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Kakao', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Hafermilch', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Parmigiano', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Milch', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Buttermilch', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Mozzarella', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Crème Vega', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Schlagsahne', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Kräuterquark', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Quark', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Crème Fraîche', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Saure Sahne', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Schmand', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Joghurt', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Butter', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Frische Hefe', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Kloßteig', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Gnocci', s: 'selectNudeln', sl: false, c: 1 },
    { n: 'Saft', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Ingwershot', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Sirup', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Sekt', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Bundaberg', s: 'selectGetranke', sl: false, c: 1 },
    { n: 'Eier', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Bake Rolls', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Salzstangen', s: 'selectGenuss', sl: false, c: 1 },
    { n: 'Rotkraut', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Sauerkraut', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Mais', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Saure Gurken', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Apfelmus', s: 'selectObstGemuse', sl: false, c: 1 },
    { n: 'Geschirrspülmittel', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Klarspüler', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Geschirrspülsalz', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Einweghandschuhe', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Sportwaschmittel', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Waschmittel', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'WC-Reiniger', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Glasreiniger', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Essigreiniger', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'VISS', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Backtrennpapier', s: 'selectBackwaren', sl: false, c: 1 },
    { n: 'Gefrierbeutel', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Küchenrolle', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Toilettenpapier', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Taschentücher', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Kinder-TaTü', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Wattestäbchen', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Vitamine', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Cistusblocker', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Nasenspray', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Haarwaschmittel', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Lippenpflege', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Zahnbürste', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Zahnpasta', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Deo', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Rasierklingen', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Duschbad', s: 'selectHygiene', sl: false, c: 1 },
    { n: 'Geburtsagskarten', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Batterien', s: 'selectSonst', sl: false, c: 1 },
    { n: 'Eis', s: 'selectMilch', sl: false, c: 1 },
    { n: 'Kartoffeltaschen', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Kartoffelrösti', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Spinat', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Pizza', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Piccolinis', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Dinonuggets', s: 'selectTiefgefroren', sl: false, c: 1 },
    { n: 'Blubbsticks', s: 'selectTiefgefroren', sl: false, c: 1 },
];
