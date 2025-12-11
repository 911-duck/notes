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