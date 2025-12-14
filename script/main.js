//___________________import_________________

import ELEMENTS from "./values/elements.js";
import shortcuts from "./values/shortcuts.js";
import values from "./values/values.js";

import active from "./modules/active.js"
import activeP from "./modules/activeP.js"
import addPicture from "./modules/addPicture.js"
import checkHeaderCount from "./modules/checkHeaderCount.js"
import closeBoard from "./modules/closeBoard.js"
import closeHeader from "./modules/closeHeader.js"
import closeHeaderSettings from "./modules/closeHeaderSettings.js"
import closeNote from "./modules/closeNote.js"
import closeNoteSettings from "./modules/closeNoteSettings.js"
import closePenEditor from "./modules/closePenEditor.js"
import closePictureEditor from "./modules/closePictureEditor.js"
import closeRightBoardEditor from "./modules/closeRightBoardEditor.js"
import closeSettings from "./modules/closeSettings.js"
import closeTextEditor from "./modules/closeTextEditor.js"
import closeTextReeditor from "./modules/closeTextReeditor.js"
import createDraftPicture from "./modules/createDraftPicture.js"
import createExample from "./modules/createExample.js"
import createHeader from "./modules/createHeader.js"
import createLine from "./modules/createLine.js"
import createLineStart from "./modules/createLineStart.js"
import createNote from "./modules/createNote.js"
import createNoteCard from "./modules/createNoteCard.js"
import createOval from "./modules/createOval.js"
import createOvalStart from "./modules/createOvalStart.js"
import createPictureBlock from "./modules/createPictureBlock.js"
import createRectangle from "./modules/createRectangle.js"
import createRectangleStart from "./modules/createRectangleStart.js"
import createTextBlock from "./modules/createTextBlock.js"
import default_visual_settings from "./modules/defaultVisualSettings.js"
import deleteActiveBlock from "./modules/deleteActiveBlock.js"
import deleteChild from "./modules/deleteChild.js"
import draftLine from "./modules/draftLine.js"
import draftOval from "./modules/draftOval.js"
import draftRectangle from "./modules/draftRectangle.js"
import drawLine from "./modules/drawLine.js"
import drawOval from "./modules/drawOval.js"
import drawRectangle from "./modules/drawRectangle.js"
import listenerRemoveV1 from "./modules/listenerRemoveV1.js"
import listenerRemoveV2 from "./modules/listenerRemoveV2.js"
import listenerRemoveV3 from "./modules/listenerRemoveV3.js"
import listenerRemoveV4 from "./modules/listenerRemoveV4.js"
import listenerRemoveV5 from "./modules/listenerRemoveV5.js"
import move from "./modules/move.js"
import moveP from "./modules/moveP.js"
import noteHeaderClose from "./modules/noteHeaderClose.js"
import noteHeaderOpen from "./modules/noteHeaderOpen.js"
import openBoard from "./modules/openBoard.js"
import openHeader from "./modules/openHeader.js"
import openHeaderSettings from "./modules/openHeaderSettings.js"
import openLoading from "./modules/openLoading.js"
import openNote from "./modules/openNote.js"
import openNoteSettings from "./modules/openNoteSettings.js"
import openPenEditor from "./modules/openPenEditor.js"
import openRightBoardEditor from "./modules/openRightBoardEditor.js"
import openSettings from "./modules/openSettings.js"
import openTextEditor from "./modules/openTextEditor.js"
import openTextReeditor from "./modules/openTextReeditor.js"
import resetActiveBlock from "./modules/resetActiveBlock.js"
import resetOptions from "./modules/resetOptions.js"
import search from "./modules/search.js"
import searchNote from "./modules/searchNote.js"
import unactive from "./modules/unactive.js"
import unactiveP from "./modules/unactiveP.js"

import editorEvents from "./classes/editorEvents.js"
import TextDeformation from "./classes/TextDeformation.js"
import JsonToggles from "./classes/JsonToggles.js"
import routines from "./classes/routines.js"

//______________________start___________________

document.addEventListener('DOMContentLoaded', e => {
    // app start
    routines.appStart()
    // start api
    routines.startApi()
    ELEMENTS.LOADER[1].style.display = "none"
})
        document.addEventListener('DOMContentLoaded', (e) => {
    ELEMENTS.BUTTON_SHORTCUTSV1.innerText = `текущая настройка: 'Alt + ${values.OpenSettings}'`
    ELEMENTS.BUTTON_SHORTCUTSV6.innerText = `текущая настройка: 'навестись + ${values.DeleteNote}'`;
    ELEMENTS.BUTTON_SHORTCUTSV7.innerText = `текущая настройка: 'навестись + ${values.DeleteHeader}'`;
    ELEMENTS.BUTTON_SHORTCUTSV5.innerText = `текущая настройка: 'Alt + ${values.OpenNoteCreate}'`;
    ELEMENTS.BUTTON_SHORTCUTSV4.innerText = `текущая настройка: 'Alt + ${values.OpenTechnical}'`;
    ELEMENTS.BUTTON_SHORTCUTSV3.innerText = `текущая настройка: 'Alt + ${values.OpenVisual}'`;
    ELEMENTS.BUTTON_SHORTCUTSV2.innerText = `текущая настройка: 'Alt + ${values.OpenShortcuts}'`;
    const a = localStorage.getItem('notes')
    for(const key in JSON.parse(a)){
        console.log(key, JSON.parse(a)[key]);
        const NOTE_TEMP = document.createElement("div");
        ELEMENTS.HEADERS.appendChild(NOTE_TEMP);
        NOTE_TEMP.classList.add("note-headers_note-header");
        NOTE_TEMP.classList.add("note-header");
        NOTE_TEMP.innerHTML += `
                    <div class="note-header_main">
                        <div class="note-header_name">${key}</div>
                        <div class="note-header_headers">0 заметок</div>
                    </div>
                    <div class="note-header_note-list">
                        <div class="note-header_note-add">+ добавить </div><input type="text" placeholder="поиск..." class="note-header_search menu_search"></input>
                    </div>
        `;
        NOTE_TEMP.querySelector(".note-header_main").addEventListener('click', openHeader);

        NOTE_TEMP.querySelector(".note-header_search").addEventListener("input", e => {
            searchNote(NOTE_TEMP.querySelector(".note-header_note-list"), NOTE_TEMP.querySelector(".note-header_search").value);
        })

        ELEMENTS.BUTTON_ADD_NOTE.forEach(el => el.removeEventListener('click', openNoteSettings));
        ELEMENTS.BUTTON_ADD_NOTE = document.querySelectorAll(".note-header_note-add");
        ELEMENTS.BUTTON_ADD_NOTE.forEach(el => el.addEventListener('click', openNoteSettings));

        ELEMENTS.MAIN.style.backgroundImage = "none";
        values.notes[NOTE_TEMP.querySelector(".note-header_main").querySelector(".note-header_name").innerText] = [];
    }
})