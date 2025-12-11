//___________________import_________________

import ELEMENTS from "../values/elements.js";
import values from "../values/values.js";
import shortcuts from "../values/shortcuts.js";

import active from "../modules/active.js"
import activeP from "../modules/activeP.js"
import addPicture from "../modules/addPicture.js"
import checkHeaderCount from "../modules/checkHeaderCount.js"
import closeBoard from "../modules/closeBoard.js"
import closeHeader from "../modules/closeHeader.js"
import closeHeaderSettings from "../modules/closeHeaderSettings.js"
import closeNote from "../modules/closeNote.js"
import closeNoteSettings from "../modules/closeNoteSettings.js"
import closePenEditor from "../modules/closePenEditor.js"
import closePictureEditor from "../modules/closePictureEditor.js"
import closeRightBoardEditor from "../modules/closeRightBoardEditor.js"
import closeSettings from "../modules/closeSettings.js"
import closeTextEditor from "../modules/closeTextEditor.js"
import closeTextReeditor from "../modules/closeTextReeditor.js"
import createDraftPicture from "../modules/createDraftPicture.js"
import createExample from "../modules/createExample.js"
import createHeader from "../modules/createHeader.js"
import createLine from "../modules/createLine.js"
import createLineStart from "../modules/createLineStart.js"
import createNote from "../modules/createNote.js"
import createNoteCard from "../modules/createNoteCard.js"
import createOval from "../modules/createOval.js"
import createOvalStart from "../modules/createOvalStart.js"
import createPictureBlock from "../modules/createPictureBlock.js"
import createRectangle from "../modules/createRectangle.js"
import createRectangleStart from "../modules/createRectangleStart.js"
import createTextBlock from "../modules/createTextBlock.js"
import default_visual_settings from "../modules/defaultVisualSettings.js"
import deleteActiveBlock from "../modules/deleteActiveBlock.js"
import deleteChild from "../modules/deleteChild.js"
import draftLine from "../modules/draftLine.js"
import draftOval from "../modules/draftOval.js"
import draftRectangle from "../modules/draftRectangle.js"
import drawLine from "../modules/drawLine.js"
import drawOval from "../modules/drawOval.js"
import drawRectangle from "../modules/drawRectangle.js"
import listenerRemoveV1 from "../modules/listenerRemoveV1.js"
import listenerRemoveV2 from "../modules/listenerRemoveV2.js"
import listenerRemoveV3 from "../modules/listenerRemoveV3.js"
import listenerRemoveV4 from "../modules/listenerRemoveV4.js"
import listenerRemoveV5 from "../modules/listenerRemoveV5.js"
import move from "../modules/move.js"
import moveP from "../modules/moveP.js"
import noteHeaderClose from "../modules/noteHeaderClose.js"
import noteHeaderOpen from "../modules/noteHeaderOpen.js"
import openBoard from "../modules/openBoard.js"
import openHeader from "../modules/openHeader.js"
import openHeaderSettings from "../modules/openHeaderSettings.js"
import openLoading from "../modules/openLoading.js"
import openNoteSettings from "../modules/openNoteSettings.js"
import openPenEditor from "../modules/openPenEditor.js"
import openRightBoardEditor from "../modules/openRightBoardEditor.js"
import openSettings from "../modules/openSettings.js"
import openTextEditor from "../modules/openTextEditor.js"
import openTextReeditor from "../modules/openTextReeditor.js"
import resetActiveBlock from "../modules/resetActiveBlock.js"
import resetOptions from "../modules/resetOptions.js"
import search from "../modules/search.js"
import searchNote from "../modules/searchNote.js"
import unactive from "../modules/unactive.js"
import unactiveP from "../modules/unactiveP.js"
import errorCheck from "./errorCheck.js";

//__________________class_________________

class editorEvents {
    // constractor
    constructor() {
    }
    // delete
    static deleteBlock() {
        if (values.activeBlock != 0) {
            values.activeBlock.remove()
        }else if (values.activePBlock != 0) {
            values.activePBlock.remove()
        }else{
            errorCheck.checkHaveAnySelectElement(0)
        }
    }
    // reset
    static reset() {
        values.activeBlock = 0;
        values.activePBlock = 0;
        document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
        document.querySelectorAll(".move-p-block").forEach(el => el.style.border = "none")
        closeRightBoardEditor();
    }
    // create text block
    static createText(TEXT) {
        const TEXT_BLOCK = document.createElement("div");
        TEXT_BLOCK.innerHTML = TEXT;
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(TEXT_BLOCK);
        TEXT_BLOCK.classList.add(`move-block`)
        TEXT_BLOCK.style.top = "80px"
        TEXT_BLOCK.style.left = "80px"
        TEXT_BLOCK.addEventListener('mousedown', active)
    }
    // open text editor
    static textEdit() {
        if (!errorCheck.checkHaveAnySelectElement(values.activeBlock)) {
            document.querySelector('.ql-editor').innerHTML = values.activeBlock.innerHTML

        ELEMENTS.PENCIL.removeEventListener('click', openPenEditor)
            ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
            ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
            ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
            ELEMENTS.EDIT_TEXT.addEventListener('click', closeTextReeditor)

            ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
            ELEMENTS.TEXT_EDITOR.style.top = "70%"
        }
    }
    // close text editor
    static endTextEditor() {
        ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
        ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
        ELEMENTS.PENCIL.addEventListener('click', openPenEditor)
        ELEMENTS.EDIT_TEXT.removeEventListener('click', closeTextReeditor)

        ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
        ELEMENTS.TEXT_EDITOR.style.top = "150%"
        values.activeBlock.innerHTML = document.querySelector('.ql-editor').innerHTML
    }
    // create picture
    static createPicture(url) {
        const PICTURE_BLOCK = document.createElement("div");
        PICTURE_BLOCK.style.backgroundImage = `url("${url}")`
        PICTURE_BLOCK.style.backgroundSize = `contain`
        PICTURE_BLOCK.style.backgroundPosition = `50% 50%`
        PICTURE_BLOCK.style.backgroundRepeat = `no-repeat`
        PICTURE_BLOCK.style.width = `${100}px`
        PICTURE_BLOCK.style.height = `${100}px`
        PICTURE_BLOCK.classList.add(`move-p-block`)
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(PICTURE_BLOCK);
        PICTURE_BLOCK.style.top = "100px"
        PICTURE_BLOCK.style.left = "100px"
        PICTURE_BLOCK.addEventListener('mousedown', activeP)
    }
    static draftPicture(url) {
        document.querySelector('.test_picture').style.backgroundImage = `url("${url}")`
    }
    // create end rectangle
    static createRectangleEnd(obj) {
        values.rectangleStartAndEnd.end_X = obj.clientX
        values.rectangleStartAndEnd.end_Y = obj.clientY

        let rectangle = document.createElement("div")
        rectangle.style.width = Math.abs(values.rectangleStartAndEnd.start_X - values.rectangleStartAndEnd.end_X) + "px"
        rectangle.style.height = Math.abs(values.rectangleStartAndEnd.start_Y - values.rectangleStartAndEnd.end_Y) + "px"

        rectangle.classList.add("move-p-block")
        rectangle.addEventListener('mousedown', activeP)

        if (values.rectangleStartAndEnd.start_X < values.rectangleStartAndEnd.end_X) rectangle.style.left = values.rectangleStartAndEnd.start_X + "px"
        else rectangle.style.left = values.rectangleStartAndEnd.end_X + "px"
        if (values.rectangleStartAndEnd.start_Y < values.rectangleStartAndEnd.end_Y) rectangle.style.top = values.rectangleStartAndEnd.start_Y + "px"
        else rectangle.style.top = values.rectangleStartAndEnd.end_Y + "px"

        rectangle.style.backgroundColor = "black"
        document.removeEventListener("mousemove", draftRectangle)
        document.removeEventListener("mouseup", createRectangle)
        values.draftRectangleblock.remove()
        values.draftRectangleblock = 0

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(rectangle)
    }
    // start rectangel
    static createRectangleStart(obj) {
        document.removeEventListener("mousedown", createRectangleStart)
        values.rectangleStartAndEnd.start_X = obj.clientX
        values.rectangleStartAndEnd.start_Y = obj.clientY

        document.addEventListener("mousemove", draftRectangle)
        document.addEventListener("mouseup", createRectangle)
    }
    // draw draft
    static drawDraftRectangle(obj) {
        if (values.draftRectangleblock != 0) values.draftRectangleblock.remove()

        values.rectangleStartAndEnd.end_X = obj.clientX
        values.rectangleStartAndEnd.end_Y = obj.clientY

        values.draftRectangleblock = document.createElement("div")
        values.draftRectangleblock.style.width = Math.abs(values.rectangleStartAndEnd.start_X - values.rectangleStartAndEnd.end_X) + "px"
        values.draftRectangleblock.style.height = Math.abs(values.rectangleStartAndEnd.start_Y - values.rectangleStartAndEnd.end_Y) + "px"

        values.draftRectangleblock.classList.add("move-p-block")

        if (values.rectangleStartAndEnd.start_X < values.rectangleStartAndEnd.end_X) values.draftRectangleblock.style.left = values.rectangleStartAndEnd.start_X + "px"
        else values.draftRectangleblock.style.left = values.rectangleStartAndEnd.end_X + "px"
        if (values.rectangleStartAndEnd.start_Y < values.rectangleStartAndEnd.end_Y) values.draftRectangleblock.style.top = values.rectangleStartAndEnd.start_Y + "px"
        else values.draftRectangleblock.style.top = values.rectangleStartAndEnd.end_Y + "px"

        values.draftRectangleblock.style.backgroundColor = "grey"

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(values.draftRectangleblock)
    }
    // create oval
    static createOvalEnd(event) {
        values.ovalStartAndEnd.end_X = event.clientX
        values.ovalStartAndEnd.end_Y = event.clientY

        let oval = document.createElement("div")
        oval.style.width = Math.abs(values.ovalStartAndEnd.start_X - values.ovalStartAndEnd.end_X) + "px"
        oval.style.height = Math.abs(values.ovalStartAndEnd.start_Y - values.ovalStartAndEnd.end_Y) + "px"

        oval.classList.add("move-p-block")
        oval.addEventListener('mousedown', activeP)

        if (values.ovalStartAndEnd.start_X < values.ovalStartAndEnd.end_X) oval.style.left = values.ovalStartAndEnd.start_X + "px"
        else oval.style.left = values.ovalStartAndEnd.end_X + "px"
        if (values.ovalStartAndEnd.start_Y < values.ovalStartAndEnd.end_Y) oval.style.top = values.ovalStartAndEnd.start_Y + "px"
        else oval.style.top = values.ovalStartAndEnd.end_Y + "px"

        oval.style.borderRadius = "50%"
        oval.style.backgroundColor = "black"
        document.removeEventListener("mousemove", draftOval)
        document.removeEventListener("mouseup", createOval)
        values.draftOvalblock.remove()
        values.draftOvalblock = 0

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(oval)
    }
    // create draft
    static createDraftOval(event) {
        if (values.draftOvalblock != 0) values.draftOvalblock.remove()

        values.ovalStartAndEnd.end_X = event.clientX
        values.ovalStartAndEnd.end_Y = event.clientY

        values.draftOvalblock = document.createElement("div")
        values.draftOvalblock.style.width = Math.abs(values.ovalStartAndEnd.start_X - values.ovalStartAndEnd.end_X) + "px"
        values.draftOvalblock.style.height = Math.abs(values.ovalStartAndEnd.start_Y - values.ovalStartAndEnd.end_Y) + "px"

        values.draftOvalblock.classList.add("move-p-block")

        if (values.ovalStartAndEnd.start_X < values.ovalStartAndEnd.end_X) values.draftOvalblock.style.left = values.ovalStartAndEnd.start_X + "px"
        else values.draftOvalblock.style.left = values.ovalStartAndEnd.end_X + "px"
        if (values.ovalStartAndEnd.start_Y < values.ovalStartAndEnd.end_Y) values.draftOvalblock.style.top = values.ovalStartAndEnd.start_Y + "px"
        else values.draftOvalblock.style.top = values.ovalStartAndEnd.end_Y + "px"

        values.draftOvalblock.style.backgroundColor = "grey"
        values.draftOvalblock.style.borderRadius = "50%"

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(values.draftOvalblock)
    }
    // create start oval
    static ovalStart(event) {
        document.removeEventListener("mousedown", createOvalStart)
        values.ovalStartAndEnd.start_X = event.clientX
        values.ovalStartAndEnd.start_Y = event.clientY

        document.addEventListener("mousemove", draftOval)
        document.addEventListener("mouseup", createOval)
    }
    // create end line
    static createLineEnd(event) {
        values.lineStartAndEnd.end_X = event.clientX
        values.lineStartAndEnd.end_Y = event.clientY

        let line = document.createElement("div")
        line.style.height = 2 + "px"
        line.style.width = Math.abs(values.lineStartAndEnd.start_X - values.lineStartAndEnd.end_X) + "px"

        line.classList.add("move-p-block")
        line.addEventListener('mousedown', activeP)

        line.style.left = values.lineStartAndEnd.start_X + "px"

        line.style.top = values.lineStartAndEnd.end_Y + "px"

        line.style.backgroundColor = "black"
        document.removeEventListener("mousemove", draftLine)
        document.removeEventListener("mouseup", createLine)
        values.draftLineblock.remove()
        values.draftLineblock = 0

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(line)
    }
    // draft line
    static createDraftLine(event) {
        if (values.draftLineblock != 0) values.draftLineblock.remove()

        values.lineStartAndEnd.end_X = event.clientX
        values.lineStartAndEnd.end_Y = event.clientY

        values.draftLineblock = document.createElement("div")
        values.draftLineblock.style.height = 2 + "px"
        values.draftLineblock.style.width = Math.abs(values.lineStartAndEnd.start_X - values.lineStartAndEnd.end_X) + "px"

        values.draftLineblock.classList.add("move-p-block")

        values.draftLineblock.style.left = values.lineStartAndEnd.start_X + "px"
        values.draftLineblock.style.top = values.lineStartAndEnd.end_Y + "px"

        values.draftLineblock.style.backgroundColor = "grey"

        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(values.draftLineblock)
    }
    // line start
    static lineStart(event) {
        document.removeEventListener("mousedown", createLineStart)
        values.lineStartAndEnd.start_X = event.clientX
        values.lineStartAndEnd.start_Y = event.clientY

        document.addEventListener("mousemove", draftLine)
        document.addEventListener("mouseup", createLine)
    }
    // 
    static openEditorText(event) {
    ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
    ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
        ELEMENTS.PENCIL.removeEventListener('click', openPenEditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
    ELEMENTS.TEXT_EDITOR.style.top = "70%"
}
static closeEditorText(event){
    ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
    ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
        ELEMENTS.PENCIL.addEventListener('click', openPenEditor)

    ELEMENTS.ADD_TEXT.removeEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.TEXT_EDITOR.style.top = "150%"
    createTextBlock();
}
}

export default editorEvents