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
import closeNoteSettings from "./closeNoteSettings.js"
import closePenEditor from "./closePenEditor.js"
import closePictureEditor from "./closePictureEditor.js"
import closeRightBoardEditor from "./closeRightBoardEditor.js"
import closeSettings from "./closeSettings.js"
import closeTextEditor from "./closeTextEditor.js"
import closeTextReeditor from "./closeTextReeditor.js"
import createDraftPicture from "./createDraftPicture.js"
import createExample from "./createExample.js"
import closeNote from "./closeNote.js";
import createHeader from "./createHeader.js"
import createLine from "./createLine.js"
import createLineStart from "./createLineStart.js"
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
import deletNote from "./deleteNote.js";
import editorEvents from "../classes/editorEvents.js"
import TextDeformation from "../classes/TextDeformation.js"
import JsonToggles from "../classes/JsonToggles.js"
import routines from "../classes/routines.js"
import errorCheck from "../classes/errorCheck.js";

//__________________function________________



function createNote(note, h, n) {
    const NOTE_TEMP = document.createElement("div");
    values.active_header.appendChild(NOTE_TEMP);
    if (values.education_debug || values.recovery) values.active_header.parentElement.querySelector(".note-header_note-list").appendChild(NOTE_TEMP);
    NOTE_TEMP.classList.add("note-header_note-child");
    NOTE_TEMP.innerHTML += `
        <div class="note-header_header-child">${values.notes[values.active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_txt"].header}</div>
        <div class="note-header_delete-child">+</div>
    `;

    let name = ELEMENTS.OPTION_HEAD.value;
    checkHeaderCount(values.active_header);
    values.active_note = name

    console.log(note)
    NOTE_TEMP.addEventListener('click', e => {
        let el = NOTE_TEMP
        values.active_header = NOTE_TEMP.parentElement
        console.log("obj :",values.notes[NOTE_TEMP.parentElement.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerHTML][h])
        openNote(values.notes[NOTE_TEMP.parentElement.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerHTML][h])
        ELEMENTS.BUTTON_RESET_OPEN_NOTE.addEventListener('click', closeNote)
    })

    NOTE_TEMP.querySelector(".note-header_delete-child").addEventListener('click', e => {
        delete values.notes[values.active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][name];
        deleteChild(e);
        checkHeaderCount(values.active_header);
    });

    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings));


    resetOptions();
    if(!values.recovery)localStorage.setItem("userData", JSON.stringify(values.notes));
    
}

export default createNote