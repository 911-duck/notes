//___________________import_________________

import ELEMENTS from "../values/elements.js";
import shortcuts from "../values/shortcuts.js";
import values from "../values/values.js";

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
import defaultVisualSettings from "../modules/defaultVisualSettings.js"
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

//________________local values__________________ 

const errorsCodes = {
    "100": "ошибка: название уже занято.",
    "101": "ошибка: укажите название.",
    "102": "ошибка: выделите блок который вам нужен.",
    "103": "нажмите клавишу для события.",
    "104": "ошибка: введите параметр.",
    "105": "выберите начальную точку и протяните до конечной точки.",
    "106": "ошибка: URL не действителен.",
    "107": "ошибка: z индекс должен быть < 30.",
    "108": "ошибка: z индекс должен быть положительным.",
    "109": "ошибка: поворот должен быть положительным.",
    "110": "ошибка: ширина должна быть положительной.",
    "111": "ошибка: высота должна быть положительной.",
    "112": "ошибка: закругление должно быть положительным.",
}

//___________________class______________________

class errorCheck {
    // get error
    static getError(code) {
        ELEMENTS.ERROR_BLOCK.innerText = errorsCodes[String(code)]
        ELEMENTS.ERROR_BLOCK.style.transform = "translateX(0px)"
        setTimeout(() => {
            ELEMENTS.ERROR_BLOCK.style.transform = "translateX(calc(100% + 40px))"
        }, 5000);
    }
    // check headers names
    static checkHeaders(name) {
        let errorCode = 0

        const headers = Object.keys(values.notes)
        const result = headers.every(el => el != name)
        console.log(name)
        console.log(headers)
        console.log(result)

        if (!result) errorCode = 100

        const arr = name.split("")

        if (!arr.some(el => el != " ")) errorCode = 101

        if (errorCode) this.getError(errorCode)

        console.log(errorCode)

        return errorCode
    }
    // check notes names  
    static checkNotes(name, activeHeaderN) {
        let errorCode = 0

        const notes = Object.keys(values.notes[activeHeaderN])
        const result = notes.every(el => el != name)

        console.log(name)
        console.log(notes)
        console.log(result)
        if (!result) errorCode = 100

        const arr = name.split("")

        if (!arr.some(el => el != " ")) errorCode = 101

        if (errorCode) this.getError(errorCode)

        return errorCode
    }
    // any element select?
    static checkHaveAnySelectElement(a) {
        let errorCode = 0

        if (a == 0) errorCode = 102
        if (errorCode) this.getError(errorCode)

        return errorCode
    }
    // check url
    static checkURL(url) {
        let result = false
        let errorCode = 0

        try {
            new URL(url);
            result = true;
        } catch (e) {
            result = false;
        }

        if (!result) {
            errorCode = 106
            this.getError(errorCode)
        }
        return errorCode
    }
    // check z index
    static checkZIndex(n) {
        let errorCode = 0

        if (n > 29) errorCode = 107
        if (n < 0) errorCode = 108

        if (errorCode) this.getError(errorCode)

        return errorCode
    }
    // check rotate
    static checkRotate(n) {
        let errorCode = 0

        if (n < 0) errorCode = 109

        if (errorCode) this.getError(errorCode)

        return errorCode
    }
    // check width and height
    static checkWidthAndHeight(w,h){
        let errorCode = 0

        if(w < 0) errorCode = 110
        if(h < 0) errorCode = 111

        if(errorCode) this.getError(errorCode)

        return errorCode
    }
    // check border radius
    static checkBorderRadius(r){
        let errorCode = 0

        if(r < 0) errorCode = 112
    
        if(errorCode) this.getError(errorCode)

        return errorCode
    }
    // check headers names
    static checkHeadersE(name) {
        let errorCode = 0

        const headers = Object.keys(values.notes)
        const result = headers.every(el => el != name)
        console.log(name)
        console.log(headers)
        console.log(result)

        if (!result) errorCode = 100

        const arr = name.split("")

        if (!arr.some(el => el != " ")) errorCode = 101

        // if (errorCode) this.getError(errorCode)

        console.log(errorCode)

        return errorCode
    }
}

export default errorCheck