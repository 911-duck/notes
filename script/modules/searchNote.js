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
import createHeader from "./createHeader.js"
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
import unactive from "./unactive.js"
import unactiveP from "./unactiveP.js"

import editorEvents from "../classes/editorEvents.js"
import TextDeformation from "../classes/TextDeformation.js"
import JsonToggles from "../classes/JsonToggles.js"
import routines from "../classes/routines.js"

//__________________function________________

function searchNote(element, str) {
    const elements = element.querySelectorAll(".note-header_note-child")
    if (str != 0) {
        elements.forEach(el => {
            let name = el.querySelector(".note-header_header-child").innerText
            name = name.split("")
            let arr = str.split("")
            let html = name.map(el=>el)

            let result = arr.every(e => {
                if(name.includes(e)){
                    html[name.findIndex(el => el == e)] = `<span class="searchN">${e}</span>`
                }
                return name.includes(e)

            })
            el.querySelector(".note-header_header-child").innerHTML = html.join("")

            if (result == false) el.style.display = "none"
        });
    } else {
        elements.forEach(el => {
            el.style.display = "flex"
            el.querySelector(".note-header_header-child").innerHTML = el.querySelector(".note-header_header-child").innerText
        });
    }
}

export default searchNote