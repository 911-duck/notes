//___________________import_________________

import ELEMENTS from "../values/elements.js";
import values from "../values/values.js";
import shortcuts from "../values/shortcuts.js"

import active from "./active.js"
import activeP from "./activeP.js"
import addPicture from "./addPicture.js"
import checkHeaderCount from "./checkHeaderCount.js"
import closeBoard from "./closeBoard.js"
import closeHeader from "./closeHeader.js"
import closeHeaderSettings from "./closeHeaderSettings.js"
import closeNote from "./closeNote.js"
import closeNoteSettings from "./closeNoteSettings.js"
import closePenEditor from "./closePenEditor.js"
import closePictureEditor from "./closePictureEditor.js"
import closeRightBoardEditor from "./closeRightBoardEditor.js"
import closeSettings from "./closeSettings.js"
import closeTextEditor from "./closeTextEditor.js"
import closeTextReeditor from "./closeTextReeditor.js"
import createDraftPicture from "./createDraftPicture.js"
import createExample from "./createExample.js"
import createLine from "./createLine.js"
import createLineStart from "./createLineStart.js"
import createNote from "./createNote.js"
import createNoteCard from "./createNoteCard.js"
import createOval from "./createOval.js"
import createOvalStart from "./createOvalStart.js"
import createPictureBlock from "./createPictureBlock.js"
import createRectangle from "./createRectangle.js"
import createRectangleStart from "./createRectangleStart.js"
import createTextBlock from "./createTextBlock.js"
import default_visual_settings from "./defaultVisualSettings.js"
import deleteActiveBlock from "./deleteActiveBlock.js"
import deleteChild from "./deleteChild.js"
import draftLine from "./draftLine.js"
import draftOval from "./draftOval.js"
import draftRectangle from "./draftRectangle.js"
import drawLine from "./drawLine.js"
import drawOval from "./drawOval.js"
import drawRectangle from "./drawRectangle.js"
import listenerRemoveV1 from "./listenerRemoveV1.js"
import listenerRemoveV2 from "./listenerRemoveV2.js"
import listenerRemoveV3 from "./listenerRemoveV3.js"
import listenerRemoveV4 from "./listenerRemoveV4.js"
import listenerRemoveV5 from "./listenerRemoveV5.js"
import move from "./move.js"
import moveP from "./moveP.js"
import noteHeaderClose from "./noteHeaderClose.js"
import noteHeaderOpen from "./noteHeaderOpen.js"
import openBoard from "./openBoard.js"
import openHeader from "./openHeader.js"
import openHeaderSettings from "./openHeaderSettings.js"
import openLoading from "./openLoading.js"
import openNote from "./openNote.js"
import openNoteSettings from "./openNoteSettings.js"
import openPenEditor from "./openPenEditor.js"
import openRightBoardEditor from "./openRightBoardEditor.js"
import openSettings from "./openSettings.js"
import openTextEditor from "./openTextEditor.js"
import openTextReeditor from "./openTextReeditor.js"
import resetActiveBlock from "./resetActiveBlock.js"
import resetOptions from "./resetOptions.js"
import search from "./search.js"
import searchNote from "./searchNote.js"
import unactive from "./unactive.js"
import unactiveP from "./unactiveP.js"

import editorEvents from "../classes/editorEvents.js"
import TextDeformation from "../classes/TextDeformation.js"
import JsonToggles from "../classes/JsonToggles.js"
import routines from "../classes/routines.js"

//__________________function________________

function createHeader(event) {
    const NOTE_TEMP = document.createElement("div");
    ELEMENTS.HEADERS.appendChild(NOTE_TEMP);
    NOTE_TEMP.classList.add("note-headers_note-header");
    NOTE_TEMP.classList.add("note-header");
    NOTE_TEMP.innerHTML += `
                <div class="note-header_main">
                    <div class="note-header_name">${ELEMENTS.OPTION_HEADER.value}</div>
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
    closeHeaderSettings();
}

export default createHeader