"use strict";
// edomError ========================================================================================
class edomElementNullExeption {
    constructor(message) {
        this.message = message;
        console.error(message);
    }
}
// edom =============================================================================================
class edom {
    static get allElements() {
        return edom._allElements;
    }
    static init() {
        edom._allElements = [];
        edom.body = edom.fromExisting(document.body);
        edom.body.id = 'body';
    }
    static newElement(tagname) {
        switch (tagname.toLowerCase()) {
            case 'input':
                const elmnt = new edomInputElement(false, tagname);
                elmnt.addChange('onInput', (self) => {
                    self.value = self.element.value;
                });
                return elmnt;
            case 'textarea':
                const ta = new edomInputElement(false, tagname);
                ta.addChange('onInput', (self) => {
                    self.value = self.element.value;
                });
                return ta;
            case 'a':
                return new edomAnchorElement(false, tagname);
            case 'ul':
            case 'ol':
                return new edomListElement(false, tagname);
            case 'img':
                return new edomImageElement(false, tagname);
            case 'label':
                return new edomLabelElement(false, tagname);
            default:
                return new edomElement(false, tagname);
        }
    }
    static fromExisting(element) {
        edom.iterateChildren(element);
        return new edomElement(true, '', element);
    }
    static iterateChildren(element) {
        edom.getChildren(element).forEach((child) => {
            console.log(child);
        });
    }
    static getChildren(element) {
        return Array.from(element.children);
    }
    static findById(id) {
        let toReturn = undefined;
        edom.allElements.forEach((element) => {
            if (element.id === id) {
                toReturn = element;
            }
        });
        return toReturn;
    }
    static break() {
        return edom.newElement('br');
    }
    static fromTemplate(template, parent = null) {
        if (parent === null) {
            if (template.classes != undefined) {
                edom.body.applyStyle(...(template.classes || []));
            }
            this.fromTemplate(template.children, edom.body);
        }
        else {
            for (let i = 0; i < template.length; i++) {
                const _template = template[i];
                const currentChild = edom.newElement(_template.tag);
                if (_template.id != undefined) {
                    currentChild.id = _template.id;
                }
                if (_template.text != undefined) {
                    currentChild.text = _template.text;
                }
                if (_template.value != undefined) {
                    currentChild.value = _template.value;
                }
                if (_template.type != undefined) {
                    currentChild.type = _template.type;
                }
                if (_template.checked != undefined) {
                    currentChild.checked =
                        _template.checked;
                    currentChild.addClick('clickChangeState', (self) => {
                        if (self.checked ===
                            self.element.checked) {
                            return;
                        }
                        self.checked = self.element.checked;
                    });
                }
                if (_template.classes != undefined) {
                    currentChild.applyStyle(..._template.classes);
                }
                if (_template.src != undefined) {
                    currentChild.src = _template.src;
                }
                if (_template.for != undefined) {
                    currentChild.for = _template.for;
                }
                if (_template.groupID != undefined) {
                    currentChild.groupID =
                        _template.groupID;
                }
                if (_template.target != undefined) {
                    currentChild.href(_template.target);
                }
                if (_template.handler != undefined) {
                    _template.handler.forEach((handler) => {
                        currentChild.addEvent(handler.type, handler.id, (self) => {
                            handler.body(self);
                        });
                    });
                }
                parent.addChild(currentChild);
                if (_template.children != undefined) {
                    this.fromTemplate(_template.children, currentChild);
                }
            }
        }
    }
}
// edomElement ======================================================================================
class edomElement {
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
        this.element.innerText = this._text;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
        this.element.id = id;
    }
    constructor(fromExisting, tagname, existingElement = null) {
        this.children = [];
        this._text = '';
        this.parent = undefined;
        this.classes = [];
        this.handlers = {};
        this.values = {};
        this._id = Math.random().toString() + Math.random().toString();
        if (fromExisting === true) {
            if (existingElement === null) {
                throw new edomElementNullExeption('Given Element is null');
            }
            else {
                this.element = existingElement;
            }
        }
        else {
            this.element = document.createElement(tagname);
        }
        edom.allElements.push(this);
        this.tag = tagname;
        return this;
    }
    addChild(child) {
        this.children.push(child);
        this.element.appendChild(child.element);
        child.parent = this;
    }
    setProperty(key, value) {
        this.values[key] = value;
    }
    getProperty(key) {
        return this.values[key];
    }
    addClick(identifier, func) {
        this.addEvent('click', identifier, func);
    }
    doClick() {
        this.element.click();
    }
    deleteClick(identifier) {
        this.deleteEvent('click', identifier);
    }
    addEvent(type, identifier, action) {
        const hdlr = () => {
            action(this);
        };
        this.handlers[identifier] = hdlr;
        this.element.addEventListener(type, hdlr);
    }
    deleteEvent(type, identifier) {
        this.element.removeEventListener(type, this.handlers[identifier]);
    }
    applyStyle(...className) {
        className.forEach((_class) => {
            this.element.classList.add(_class);
            this.classes.push(_class);
        });
    }
    removeStyle(...className) {
        className.forEach((_class) => {
            this.element.classList.remove(_class);
            const index = this.classes.indexOf(_class);
            if (index > -1) {
                this.classes.splice(index, 1);
            }
        });
    }
    hasStyle(...className) {
        let hasStyle = true;
        className.forEach((_class) => {
            if (!this.classes.includes(_class)) {
                hasStyle = false;
            }
        });
        return hasStyle;
    }
    swapStyle(oldClass, newClass) {
        this.removeStyle(oldClass);
        this.applyStyle(newClass);
    }
    delete(isChild = false) {
        if (isChild === false) {
            if (this.parent !== undefined) {
                for (let i = 0; i < this.parent.children.length; i++) {
                    if (this.parent.children[i].id === this.id) {
                        this.parent.children.splice(i, 1);
                    }
                }
            }
        }
        for (let i = 0; i < edom.allElements.length; i++) {
            if (edom.allElements[i].id === this.id) {
                edom.allElements.splice(i, 1);
            }
        }
        this.children.forEach((child) => {
            child.delete(true);
        });
        this.element.remove();
        for (let key in this)
            delete this[key];
        return true;
    }
    // TODO programmatischer machen -> nicht über Klasse in css, sondern z.B Eigenschaft von element?
    enable() {
        this.swapStyle('hidden', 'visible');
    }
    // TODO programmatischer machen -> nicht über Klasse in css, sondern z.B Eigenschaft von element?
    disable() {
        this.swapStyle('visible', 'hidden');
    }
    focus() {
        this.element.focus();
    }
}
// edomInputElement =================================================================================
class edomInputElement extends edomElement {
    constructor() {
        super(...arguments);
        this._value = '';
        this._type = 'text';
        this._checked = false;
        this._groupID = '';
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.element.value = val;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
        this.element.type = type;
    }
    get checked() {
        return this._checked;
    }
    set checked(state) {
        this._checked = state;
        this.element.checked = state;
    }
    get groupID() {
        return this._groupID;
    }
    set groupID(id) {
        this._groupID = id;
        this.element.name = this._groupID;
    }
    addChange(identifier, func) {
        this.addEvent('input', identifier, (self) => {
            func(self);
        });
    }
    deleteChange(identifier) {
        this.deleteEvent('input', identifier);
    }
    select() {
        this.element.select();
    }
}
class edomTAElement extends edomInputElement {
    setContent(text) {
        this.element.value = text;
        this.value = text;
    }
}
// edomAnchorElement ================================================================================
class edomAnchorElement extends edomElement {
    constructor() {
        super(...arguments);
        this.target = '';
    }
    href(location) {
        this.target = location;
        this.element.href = this.target;
    }
}
// edomListElement ==================================================================================
class edomListElement extends edomElement {
    addEntry(text) {
        const anstrich = edom.newElement('li');
        anstrich.text = text;
        this.addChild(anstrich);
    }
    addEntryLink(text, doOnClick) {
        const anstrich = edom.newElement('li');
        const link = edom.newElement('a');
        link.text = text;
        if (typeof doOnClick === 'string') {
            link.href(doOnClick);
        }
        else if (typeof doOnClick === 'function') {
            link.addClick('', () => {
                doOnClick(link);
            });
            link.href('javascript:void(0);');
        }
        anstrich.addChild(link);
        this.addChild(anstrich);
    }
}
// edomImageElement ==================================================================================
class edomImageElement extends edomElement {
    constructor() {
        super(...arguments);
        this._src = '';
    }
    get src() {
        return this._src;
    }
    set src(src) {
        this._src = src;
        this.element.src = this.src;
    }
}
// edomLabelElement ==================================================================================
class edomLabelElement extends edomElement {
    constructor() {
        super(...arguments);
        this._for = '';
    }
    get for() {
        return this._for;
    }
    set for(htmlFor) {
        this._for = htmlFor;
        this.element.htmlFor = this._for;
    }
}
