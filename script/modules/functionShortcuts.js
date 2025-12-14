import JsonToggles from "./JsonToggles";
class shortcutsFunction{
    constructor(e){
        this.e = e
    }
    listenerRemoveV1() {
        window.removeEventListener('keydown', listenerRemoveV1);
        OpenSettings = this.e.code;
        let a = new JsonToggles('OpenSettings')
        a.RemoveItem()
        a.SaveItem(OpenSettings)
        ELEMENTS.BUTTON_SHORTCUTSV1.innerText = `текущая настройка: 'Alt + ${this.e.key}'`;
    }
    
    listenerRemoveV2() {
        window.removeEventListener('keydown', listenerRemoveV2);
        OpenShortcuts = this.e.code;
        let a = new JsonToggles('OpenShortcuts')
        a.RemoveItem()
        a.SaveItem(OpenShortcuts)
        ELEMENTS.BUTTON_SHORTCUTSV2.innerText = `текущая настройка: 'Alt + ${this.e.key}'`;
    
    }
    
    listenerRemoveV3() {
        window.removeEventListener('keydown', listenerRemoveV3);
        OpenVisual = this.e.code;
        let a = new JsonToggles('OpenVisual')
        a.RemoveItem()
        a.SaveItem(OpenVisual)
        ELEMENTS.BUTTON_SHORTCUTSV3.innerText = `текущая настройка: 'Alt + ${this.e.key}'`;
    }
    
    listenerRemoveV4() {
        window.removeEventListener('keydown', listenerRemoveV4);
        OpenNoteCreate = this.e.code;
        let a = new JsonToggles('OpenNoteCreate')
        a.RemoveItem()
        a.SaveItem(OpenNoteCreate)
        ELEMENTS.BUTTON_SHORTCUTSV4.innerText = `текущая настройка: 'Alt + ${this.e.key}'`;
    }
    listenerRemoveV5() {
    
        window.removeEventListener('keydown', listenerRemoveV5);
        OpenTechnical = this.e.code;
        let a = new JsonToggles('OpenTechnical')
        a.RemoveItem()
        a.SaveItem(OpenTechnical)
        ELEMENTS.BUTTON_SHORTCUTSV5.innerText = `текущая настройка: 'Alt + ${this.e.key}'`;
    }
    listenerRemoveV6() {
        window.removeEventListener('keydown', listenerRemoveV6);
        DeleteNote = this.e.code;
        let a = new JsonToggles('DeleteNote')
        a.RemoveItem()
        a.SaveItem(DeleteNote)
        ELEMENTS.BUTTON_SHORTCUTSV6.innerText = `текущая настройка: 'навестись + ${this.e.key}'`;
    }
    listenerRemoveV7() {
        window.removeEventListener('keydown', listenerRemoveV7);
        DeleteHeader = this.e.code;
        let a = new JsonToggles('DeleteHeader')
        a.RemoveItem()
        a.SaveItem(DeleteHeader)
        ELEMENTS.BUTTON_SHORTCUTSV7.innerText = `текущая настройка: 'навестись + ${this.e.key}'`;
    }
}
export default shortcutsFunction