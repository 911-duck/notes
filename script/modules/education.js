//___________________import_________________

import ELEMENTS from "../values/elements.js";
import shortcuts from "../values/shortcuts.js"
import values from "../values/values.js";

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
import searchNote from "./searchNote.js"
import unactive from "./unactive.js"
import unactiveP from "./unactiveP.js"

import editorEvents from "../classes/editorEvents.js"
import TextDeformation from "../classes/TextDeformation.js"
import JsonToggles from "../classes/JsonToggles.js"
import routines from "../classes/routines.js"
import errorCheck from "../classes/errorCheck.js";

// _____________value____________

const message = {
    "0": "обучение:",
    "1": "обучение: чтобы создать папку для заметок, нажмите на эту кнопку.",
    "2": "обучение: дальше укажите название и нажмите на кнопку 'создать'.",
    "3": "обучение: чтобы открыть папку, нажмите на папку.",
    "4": "обучение: чтобы создать заметку, нажмите на кнопку '+ добавить'.",
    "5": "обучение: сдесь вы должны обязательно указать название и нажать на кнопку 'создать'.",
    "6": "обучение: чтобы открыть, нажмите на заметку.",
    "7": "обучение: чтобы добавить текст, нажмите на эту кнопку.",
    "8": "обучение: а чтобы отредоктировать, нажмите на эту кнопку.",
    "9": "обучение: чтобы добавить изображение, нажмите на эту кнопку.",
    "10": "обучение: чтобы нарисовать фигуру, нажмите на эту кнопку, протяните фигуру от начальной, до конечной точки.",
    "11": "обучение: а чтобы удалить элемент, нажмите на эту кнопку.",
    "12": "обучение: чтобы изменить свойства элемента, нажмите на эту кнопку и откроется таблица.",
    "13": "обучение: и чтобы выйти, нажмите крестик.",
}

let name = "education"

// _____________functions______________

function closeE() {
    ELEMENTS.BLACK_SCREEN_EDUCATION.style.display = "none"
    ELEMENTS.MESSAGE_ARROW_EDUCATION.style.display = "none"
    ELEMENTS.MESSAGE_ARROW_EDUCATION.style.display = "none"

    ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.right = "200px"
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.top = "140px"
    closeNote()
    document.removeEventListener("click", closeE)
    values.block.parentElement.remove()
    delete values.notes[name]
    document.querySelector(".menu_search-m").value = ""
    values.education_debug = 0
    const elements = document.querySelectorAll(".note-headers_note-header")

    elements.forEach(el => {
        el.style.display = "flex"
    });
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.transform = "translateX(calc(100% + 40px))"
    ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = " translateX(500%) rotate(0deg) "
}

function openEClose() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["13"]
    document.removeEventListener("click", openEClose)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(115deg)"

        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector("body").offsetWidth - 120 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `${getComputedStyle(document.querySelector(".open-note_open-right-board")).top}`
        document.addEventListener("click", closeE)

    }, 1);
}

function openEP() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["12"]
    document.removeEventListener("click", openEP)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(-105deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = 120 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `${getComputedStyle(document.querySelector(".open-note_open-right-board")).top}`

        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.transform = "translateX(0px)"
        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.right = "40px"
        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.bottom = "40px"

        document.addEventListener("click", openEClose)

    }, 1);
}

function openEC() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["11"]
    document.removeEventListener("click", openEC)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(0deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector(".edit").offsetLeft - document.querySelector(".edit").offsetWidth / 2 + (document.querySelector(".edit_text").offsetWidth + 1 * getComputedStyle(document.querySelector(".edit")).gap.slice(0, -2)) * 2 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `calc(90% - 150px - ${getComputedStyle(document.querySelector(".edit")).height})`
        document.addEventListener("click", openEP)

    }, 1);
}

function openED() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["10"]
    document.removeEventListener("click", openED)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(0deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector(".edit").offsetLeft - document.querySelector(".edit").offsetWidth / 2 + (document.querySelector(".edit_text").offsetWidth + 1 * getComputedStyle(document.querySelector(".edit")).gap.slice(0, -2)) * 3 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `calc(90% - 150px - ${getComputedStyle(document.querySelector(".edit")).height})`
        document.addEventListener("click", openEC)

    }, 1);
}

function openEI() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["9"]
    document.removeEventListener("click", openEI)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(0deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector(".edit").offsetLeft - document.querySelector(".edit").offsetWidth / 2 + (document.querySelector(".edit_text").offsetWidth + 1 * getComputedStyle(document.querySelector(".edit")).gap.slice(0, -2)) * 0 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `calc(90% - 150px - ${getComputedStyle(document.querySelector(".edit")).height})`
        document.addEventListener("click", openED)

    }, 1);
}

function openER() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["8"]
    document.removeEventListener("click", openER)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(0deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector(".edit").offsetLeft - document.querySelector(".edit").offsetWidth / 2 + (document.querySelector(".edit_text").offsetWidth + 1 * getComputedStyle(document.querySelector(".edit")).gap.slice(0, -2)) * 4 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `calc(90% - 150px - ${getComputedStyle(document.querySelector(".edit")).height})`
        document.addEventListener("click", openEI)

    }, 1);
}

function openENote() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["7"]
    console.log(name,values.notes)
    openNote(values.notes[name]["lesson"],values.active_header)
    document.removeEventListener("click", openENote)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(0deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = document.querySelector(".edit").offsetLeft - document.querySelector(".edit").offsetWidth / 2 + (document.querySelector(".edit_text").offsetWidth + 1 * getComputedStyle(document.querySelector(".edit")).gap.slice(0, -2)) * 1 + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = `calc(90% - 150px - ${getComputedStyle(document.querySelector(".edit")).height})`

        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.right = "50%"
        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.bottom = "25%"

        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.transform = "translateX(50%) translateY(-50%)"

        console.log(getComputedStyle(document.querySelector(".edit")).height)
        document.addEventListener("click", openER)

    }, 1);
}

function createENote() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["6"]
    values.active_header = values.block
    createNoteCard()
    closeNoteSettings()
    document.removeEventListener("click", createENote)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(-45deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + document.querySelector(".main").offsetWidth) + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = document.querySelector(".menu").offsetHeight - 80 + "px"
        document.addEventListener("click", openENote)

    }, 1);
}

function openENoteS() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["5"]
    values.active_header = values.block
    openNoteSettings()
    ELEMENTS.OPTION_HEAD.value = "lesson"

    document.removeEventListener("click", openENoteS)
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(-45deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + document.querySelector(".main").offsetWidth) + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = 0 + "px"

        document.addEventListener("click", createENote)

    }, 1);
}

function openEHead() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["4"]
    document.removeEventListener("click", openEHead)

    values.height = noteHeaderOpen(values.block.parentElement);
    values.block.parentElement.addEventListener('click', closeHeader);

    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(-45deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + document.querySelector(".main").offsetWidth) + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = document.querySelector(".menu").offsetHeight - 80 + "px"
        document.addEventListener("click", openENoteS)
    }, 1);
}

function createEHeader() {
    let number = 0
    while (errorCheck.checkHeadersE(name)) {
        name = "education"
        number++
        name = name.split("")
        name.push(number)
        name = name.join("")
    }

    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["3"]
    ELEMENTS.OPTION_HEADER.value = name
    document.removeEventListener("click", createEHeader)
    const elements = document.querySelectorAll(".note-headers_note-header")

    elements.forEach(el => {
        el.style.display = "none"
    });
    document.querySelector(".menu_search-m").value = name
    values.block = createHeader();
    closeHeaderSettings();
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(-20deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + document.querySelector(".main").offsetWidth - 80) + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = document.querySelector(".menu").offsetHeight - 80 + "px"
        document.addEventListener("click", openEHead)
    }, 1);
}

function openEHeader() {
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["2"]
    document.removeEventListener("click", openEHeader)

    openHeaderSettings();
    setTimeout(() => {
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(50%) rotate(-20deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + document.querySelector(".main").offsetWidth / 2) + "px"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.top = document.querySelector(".menu").offsetHeight + 80 + "px"
        document.addEventListener("click", createEHeader)
    }, 1);
}

function education(event) {
    ELEMENTS.BLACK_SCREEN_EDUCATION.style.display = "flex"
    ELEMENTS.MESSAGE_ARROW_EDUCATION.style.display = "flex"
    ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.display = "flex"

    values.education_debug = 1

    ELEMENTS.MESSAGE_WINDOW_EDUCATION.innerText = message["1"]
    setTimeout(() => {
        ELEMENTS.MESSAGE_WINDOW_EDUCATION.style.transform = "translateX(0px)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.transform = "translateX(0%) rotate(185deg)"
        ELEMENTS.MESSAGE_ARROW_EDUCATION.style.right = ((document.querySelector("body").offsetWidth - document.querySelector(".main").offsetWidth) / 2 + 1 * getComputedStyle(document.querySelector(".menu")).paddingRight.slice(0, -2)) + "px"
        document.addEventListener("click", openEHeader)
    }, 1);
}

export default education