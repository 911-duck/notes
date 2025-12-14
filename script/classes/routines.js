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
import listenerRemoveV6 from "../modules/listenerRemoveV6.js"
import listenerRemoveV7 from "../modules/listenerRemoveV7.js"
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
import education from "../modules/education.js"
import recovery from "../modules/recovery.js";

//___________________class______________________

class routines {
    // constructor
    constructor(text) {
        this.text = text
    }
    // search max x
    static maxX() {
        let max = 0  // x,y
        let elements = ELEMENTS.OPEN_NOTE_SCREEN.querySelectorAll("*")
        elements.forEach(el => {
            if (max < el.offsetWidth + el.offsetLeft + 40) max = el.offsetHeight + el.offsetLeft + 40
        })
        return max
    }
    // get angle
    static getAngle(values) {
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
    // make object key
    static makeObj(notes, activeHeader) {
        let note_txt = {
            header: ELEMENTS.OPTION_HEAD.value,
            txt: ELEMENTS.OPTION_TXT.value
        };
        let note_styles = {
            header_fontSize: ELEMENTS.OPTION_HEAD_FS.value,
            txt_color: ELEMENTS.OPTION_TXT_COLOR.value,
            picture_url: ELEMENTS.OPTION_URL.value
        };

        notes[activeHeader.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value] = {};
        notes[activeHeader.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_txt"] = note_txt
        notes[activeHeader.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_styles"] = note_styles
        notes[activeHeader.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["innerHtml"] = 0
        notes[activeHeader.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["screen"] = [0, 0]

        return notes
    }
    // make mini obj
    static makeMiniObj() {
        let note_txt = {
            header: ELEMENTS.OPTION_HEAD.value,
            txt: ELEMENTS.OPTION_TXT.value
        };
        let note_styles = {
            header_fontSize: ELEMENTS.OPTION_HEAD_FS.value,
            txt_color: ELEMENTS.OPTION_TXT_COLOR.value,
            picture_url: ELEMENTS.OPTION_URL.value
        };

        let miniObj = {
            note_txt: note_txt,
            note_styles: note_styles,
            innerHtml: 0,
        }
        return miniObj
    }
    // start Api
    static startApi() {
        const quill = new Quill('#editor', {
            modules: {
                syntax: true,
                toolbar: '#toolbar-container',
            },
            placeholder: 'Compose an epic...',
            theme: 'snow',
        });
    }
    // delete fonts
    static deleteFonts(element) {
        const fontsClasses = [
            "none",
            "noto-sans",
            "playfair-display",
            "pacifico-regular",
            "science-gothic",
            "ibm-plex-mono-regular",
            "great-vibes-regular",
            "Rubik Wet Paint",
            "rubik-wet-paint-regular",
            "press-start-2p-regular",
            "playfair-display-sc-regular",
            "el-messiri",
            "montserrat-underline",
            "rubik-bubbles-regular",
            "rampart-one-regular"
        ]
        fontsClasses.forEach(el => { if (element.classList.contains(el) == true) element.classList.remove(el) })
    }
    // add start note
    static createStartNote(obj) {
        ELEMENTS.OPEN_NOTE.style.right = "0px"
        if (obj.note_txt.header != "") {
            let header = document.createElement("div")
            let header2 = document.createElement(obj.note_styles.header_fontSize)

            header.style = `
        top: 30px;
        left: ${ELEMENTS.OPEN_NOTE_SCREEN.offsetWidth / 2}px;
        transform: translateX(-50%);
        position: absolute;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        `
            header2.innerText = obj.note_txt.header
            header.appendChild(header2);
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
            header.classList.add(`move-block`)
            header.addEventListener('mousedown', active)
        } else {
            let header = document.createElement("div")
            let header2 = document.createElement("h3")
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
            header.style = `
        font-size: 40px;
        top: 30px;
        left: ${ELEMENTS.OPEN_NOTE_SCREEN.offsetWidth / 2}px;
        transform: translateX(-50%);
        position: absolute;
        color: black;
        z-index: 1;
        `
            header2.innerText = obj.note_txt.header
            header.appendChild(header2);
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
            header.classList.add(`move-block`)
            header.addEventListener('mousedown', active)
        }
        if (obj.note_txt.txt != "") {
            let text = document.createElement("p")
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.style = `
        top: calc(100px);
        left: 80px;
        width: auto;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        `
            text.innerText = obj.note_txt.txt
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.classList.add(`move-block`)
            text.addEventListener('mousedown', active)
        } else {
            let text = document.createElement("p");
            text.classList.add("move-block");
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.style = `
        top: calc(100px);
        left: 30px;
        width: auto;
        color: black;
        z-index: 1;
        `
            text.innerText = obj.note_txt.txt
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.addEventListener('mousedown', active)
        }
        if (obj.note_styles.picture_url != "") {
            ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `url("${obj.note_styles.picture_url}")`
        }
    }
    // app start
    static appStart() {
        recovery()

        let version = '6.41';
        let developers = 'Бирюк Евгений, Шитенков Кирилл';
        let data = 'Nov 9, 2025';

        ELEMENTS.OPEN_EDUCATION.addEventListener('click', education)

        // ELEMENTS.LOADER[0].style.display = "none"
        document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings));
        ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);

        ELEMENTS.OPTION_BOARD_HEIGHT.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_HEIGHT.value == "") errorCheck.getError(104)
            else if (!errorCheck.checkWidthAndHeight(1, ELEMENTS.OPTION_BOARD_HEIGHT.value)) values.editEl.style.height = ELEMENTS.OPTION_BOARD_HEIGHT.value + "px"
        })

        ELEMENTS.OPTION_BOARD_X.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_X.value == "") errorCheck.getError(104)
            else values.editEl.style.left = ELEMENTS.OPTION_BOARD_X.value + "px"
        })

        ELEMENTS.OPTION_BOARD_WIDTH.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_WIDTH.value == "") errorCheck.getError(104)
            else if (!errorCheck.checkWidthAndHeight(ELEMENTS.OPTION_BOARD_WIDTH.value, 1)) values.editEl.style.width = ELEMENTS.OPTION_BOARD_WIDTH.value + "px"
        })

        ELEMENTS.OPTION_BOARD_Y.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_Y.value == "") errorCheck.getError(104)
            else values.editEl.style.top = ELEMENTS.OPTION_BOARD_Y.value + "px"
        })

        ELEMENTS.OPTION_ROTATE.addEventListener("input", e => {
            if (ELEMENTS.OPTION_ROTATE.value == "") errorCheck.getError(104)
            else if (!errorCheck.checkRotate(Math.round(ELEMENTS.OPTION_ROTATE.value))) values.editEl.style.transform = `rotate(${Math.round(ELEMENTS.OPTION_ROTATE.value)}deg)`
        })

        ELEMENTS.OPTION_BOARD_Z_INDEX.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_Z_INDEX.value == "") errorCheck.getError(104)
            else if (!errorCheck.checkZIndex(ELEMENTS.OPTION_BOARD_Z_INDEX.value)) values.editEl.style.zIndex = ELEMENTS.OPTION_BOARD_Z_INDEX.value
        })

        ELEMENTS.OPTION_BOARD_BORDER_RADIUS.addEventListener("input", e => {
            if (ELEMENTS.OPTION_BOARD_BORDER_RADIUS.value == "") errorCheck.getError(104)
            else if (!errorCheck.checkBorderRadius(ELEMENTS.OPTION_BOARD_BORDER_RADIUS.value)) values.editEl.style.borderRadius = ELEMENTS.OPTION_BOARD_BORDER_RADIUS.value + "px"
        })

        ELEMENTS.OPTION_BOARD_FONT.addEventListener("input", e => {
            routines.deleteFonts(values.editEl);
            values.editEl.classList.add(`${ELEMENTS.OPTION_BOARD_FONT.value}`)
        })

        ELEMENTS.OPTION_BOARD_BACKGROUND_COLOR.addEventListener("input", e => {
            values.editEl.style.backgroundColor = ELEMENTS.OPTION_CHECK_BOX_BACKGROUND_COLOR.checked == true ? ELEMENTS.OPTION_BOARD_BACKGROUND_COLOR.value : "#ffffff00"

        })

        ELEMENTS.OPTION_CHECK_BOX_BACKGROUND_COLOR.addEventListener("input", e => {
            values.editEl.style.backgroundColor = ELEMENTS.OPTION_CHECK_BOX_BACKGROUND_COLOR.checked == true ? ELEMENTS.OPTION_BOARD_BACKGROUND_COLOR.value : "#ffffff00"

        })

        document.querySelector(".menu_search-m").addEventListener("input", e => {
            if (document.querySelector(".menu_search").value.length > 0) search(document.querySelector(".menu_search").value)
            else search("0")
        })

        ELEMENTS.BUTTON_OPEN_BOARD.addEventListener('click', openBoard)
        ELEMENTS.DELETE_ACTIVE_BLOCK.addEventListener('click', deleteActiveBlock)
        ELEMENTS.OPEN_NOTE_SCREEN.addEventListener('dblclick', resetActiveBlock)

        ELEMENTS.PENCIL.addEventListener('click', openPenEditor)
        ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
        ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)


        ELEMENTS.OPTION_BG_C.addEventListener("input", e => {
            ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundColor = ELEMENTS.OPTION_BG_C.value
        })

        ELEMENTS.OPTION_BG_I.addEventListener("input", e => {
            if (ELEMENTS.OPTION_CHECK_BOX_I.checked == true) {
                if (!errorCheck.checkURL(ELEMENTS.OPTION_BG_I.value)) ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `url("${ELEMENTS.OPTION_BG_I.value}")`
            } else ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `none`
        })

        ELEMENTS.OPTION_CHECK_BOX_I.addEventListener("input", e => {
            if (ELEMENTS.OPTION_CHECK_BOX_I.checked == true) {
                if (!errorCheck.checkURL(ELEMENTS.OPTION_BG_I.value)) ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `url("${ELEMENTS.OPTION_BG_I.value}")`
            } else ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `none`
        })


        ELEMENTS.SETTINGS_ICON.addEventListener('click', openSettings)

        if (values.vs.bcolor) document.querySelector(':root').style.setProperty("--menu_color", ` ${values.vs.bcolor}`);
        ELEMENTS.OPTION_MAIN_BASE_COLOR.addEventListener("input", e => {
            document.querySelector(':root').style.setProperty("--menu_color", ` ${ELEMENTS.OPTION_MAIN_BASE_COLOR.value}`);
            localStorage.setItem("userStyle", JSON.stringify(values.vs))
            values.vs.bcolor = ELEMENTS.OPTION_MAIN_BASE_COLOR.value
        })

        document.querySelector(':root').style.setProperty("--fontFamily", ` ${values.vs.font}`);
        document.querySelector(".right-board_font-input-vs").addEventListener("input", e => {
            document.querySelector(':root').style.setProperty("--fontFamily", `${document.querySelector(".right-board_font-input-vs").value}`);
            localStorage.setItem("userStyle", JSON.stringify(values.vs))
            values.vs.font = document.querySelector(".right-board_font-input-vs").value
        })

        if (values.vs.bbcolor) document.querySelector(':root').style.setProperty("--notes_color", ` ${values.vs.bbcolor}`);
        ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.addEventListener("input", e => {
            document.querySelector(':root').style.setProperty("--notes_color", ` ${ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.value}`);
            values.vs.bbcolor = ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.value
            localStorage.setItem("userStyle", JSON.stringify(values.vs))

        })

        if (values.vs.bbtncolor) document.querySelector(':root').style.setProperty("--button_color", ` ${values.vs.bbtncolor}`);
        ELEMENTS.OPTION_MAIN_BUTTON_COLOR.addEventListener("input", e => {
            document.querySelector(':root').style.setProperty("--button_color", ` ${ELEMENTS.OPTION_MAIN_BUTTON_COLOR.value}`);
            values.vs.bbtncolor = ELEMENTS.OPTION_MAIN_BUTTON_COLOR.value
            localStorage.setItem("userStyle", JSON.stringify(values.vs))

        })

        if (values.vs.bimage) document.querySelector("body").style.backgroundImage = `url('${values.vs.bimage}')`
        document.querySelector(".option_url-main").addEventListener("input", e => {
            document.querySelector("body").style.backgroundImage = `url('${document.querySelector(".option_url-main").value}')`
            values.vs.bimage = document.querySelector(".option_url-main").value
            localStorage.setItem("userStyle", JSON.stringify(values.vs))

        })

        if (values.vs.tcolor) document.querySelector(':root').style.setProperty("--txt_color", ` ${values.vs.tcolor}`);

        ELEMENTS.OPTION_MAIN_TXT_COLOR.addEventListener("input", e => {
            document.querySelector(':root').style.setProperty("--txt_color", ` ${ELEMENTS.OPTION_MAIN_TXT_COLOR.value}`);
            values.vs.tcolor = ELEMENTS.OPTION_MAIN_TXT_COLOR.value
            localStorage.setItem("userStyle", JSON.stringify(values.vs))

        })

        ELEMENTS.BUTTON_VISUAL_SETTINGS.addEventListener('click', e => {
            ELEMENTS.MAIN.style.transform = `translateY(${ELEMENTS.MAIN.offsetHeight}px)`;
            ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(0)"
            closeSettings();
            openLoading(0);
            defaultVisualSettings();
        })

        ELEMENTS.BUTTON_RESET_VISUAL_SETTINGS.addEventListener('click', e => {
            ELEMENTS.MAIN.style.transform = `translateY(0)`;
            ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(-120%)"
            openLoading(0);
        })



        ELEMENTS.OPTION_URL.addEventListener("input", e => {
            if (!errorCheck.checkURL(ELEMENTS.OPTION_URL.value)) ELEMENTS.EXAMPLE.style.backgroundImage = `url("${ELEMENTS.OPTION_URL.value}")`;
        }
        )

        ELEMENTS.OPTION_HEAD.addEventListener("input", e => {
            ELEMENTS.EXAMPLE_HEAD.innerText = ELEMENTS.OPTION_HEAD.value;
        }
        )

        ELEMENTS.OPTION_TXT_COLOR.addEventListener("input", e => {
            ELEMENTS.EXAMPLE_HEAD.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
        }
        )

        ELEMENTS.OPTION_HEAD_FS.addEventListener("input", e => {
            switch (ELEMENTS.OPTION_HEAD_FS.value) {
                case "h1":
                    ELEMENTS.EXAMPLE_HEAD.style.fontSize = 40 + "px";
                    break;
                case "h2":
                    ELEMENTS.EXAMPLE_HEAD.style.fontSize = 30 + "px";
                    break;
                case "h3":
                    ELEMENTS.EXAMPLE_HEAD.style.fontSize = 20 + "px";
                    break;
                case "h4":
                    ELEMENTS.EXAMPLE_HEAD.style.fontSize = 10 + "px";
                    break;

                default:
                    break;
            }
        }
        )

        ELEMENTS.OPTION_TXT.addEventListener("input", e => {
            ELEMENTS.EXAMPLE_TXT.innerText = ELEMENTS.OPTION_TXT.value;
        }
        )

        ELEMENTS.OPTION_TXT_COLOR.addEventListener("input", e => {
            ELEMENTS.EXAMPLE_TXT.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
        }
        )


        ELEMENTS.BUTTON_SHORTCUTS_SETTINGS.addEventListener('click', (e) => {
            openLoading(1);
            ELEMENTS.MAIN.style.transform = `translateX(-${document.querySelector("body").offsetWidth}px)`;
            ELEMENTS.SHORTCUTS.style.transform = "translateX(0%)"
        })
        ELEMENTS.SHORTCUTS_EXIT.addEventListener('click', (e) => {
            ELEMENTS.MAIN.style.transform = `translateX(0px)`;
            openLoading(1);
            ELEMENTS.SHORTCUTS.style.transform = "translateX(130%)"
        })

        ELEMENTS.BUTTON_SHORTCUTSV1.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV1);
        });

        ELEMENTS.BUTTON_SHORTCUTSV2.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV2);
        });

        ELEMENTS.BUTTON_SHORTCUTSV3.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV3);
        });

        ELEMENTS.BUTTON_SHORTCUTSV4.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV4);
        });
        ELEMENTS.BUTTON_SHORTCUTSV5.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV5);
        });
                ELEMENTS.BUTTON_SHORTCUTSV6.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV6);
            ELEMENTS.BUTTON_SHORTCUTSV7.addEventListener('click', () => {
            errorCheck.getError(103);
            window.addEventListener('keydown', listenerRemoveV7);
        });
        });
        window.addEventListener('keydown', (ev) => {
            if (values.OpenSettings === ev.code && ev.altKey) {
                ev.preventDefault();
                ELEMENTS.SETTINGS.style.transform = "translateX(0px)";
            }
            else if (values.OpenShortcuts === ev.code && ev.altKey) {
                ev.preventDefault();
                ELEMENTS.SHORTCUTS.style.transform = "translateX(0px)";
            }
            else if (values.OpenVisual === ev.code && ev.altKey) {
                ev.preventDefault();
                ELEMENTS.MAIN.style.transform = `translateY(${ELEMENTS.MAIN.offsetHeight}px)`;
                ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(0)"
            }
            else if (values.OpenNoteCreate === ev.code && ev.altKey) {
                ev.preventDefault();
                ELEMENTS.HEADER_SETTINGS.style.transform = "translateY(-50%)";
            }
            else if (values.OpenTechnical === ev.code && ev.altKey) {
                ev.preventDefault();
                ELEMENTS.TECHNICAL.style.transform = "translateY(0px)";
            }
        });
        ELEMENTS.BUTTON_TECHNICAL_SETTINGS.addEventListener('click', (e) => {
            openLoading(2);

            ELEMENTS.MAIN.style.transform = `translateY(-${ELEMENTS.MAIN.offsetHeight}px)`;
            ELEMENTS.TECHNICAL.style.transform = "translateY(0%)"
        })
        ELEMENTS.TECHNICAL_EXIT.addEventListener('click', (e) => {
            ELEMENTS.MAIN.style.transform = `translateX(0px)`;
            openLoading(2);

            ELEMENTS.TECHNICAL.style.transform = "translateY(130%)"
        })
        ELEMENTS.BUTTON_TECHNICALV1.addEventListener('click', () => {
            ELEMENTS.TECHNICAL_SCREEN.innerText = version
            ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '55px'
            ELEMENTS.TECHNICAL_SCREEN.style.right = '50%';
            ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(50%)';
            setTimeout(() => {
                ELEMENTS.TECHNICAL_SCREEN.style.right = '0%';

                ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(100%)';
            }, 2000);
        });
        ELEMENTS.BUTTON_TECHNICALV2.addEventListener('click', () => {
            ELEMENTS.TECHNICAL_SCREEN.innerText = developers
            ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '35px'
            ELEMENTS.TECHNICAL_SCREEN.style.right = '50%';
            ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(50%)';
            setTimeout(() => {
                ELEMENTS.TECHNICAL_SCREEN.style.right = '0%';

                ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(100%)';
            }, 2000);
        });
        ELEMENTS.BUTTON_TECHNICALV3.addEventListener('click', () => {
            ELEMENTS.TECHNICAL_SCREEN.innerText = data
            ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '55px'
            ELEMENTS.TECHNICAL_SCREEN.style.right = '50%';
            ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(50%)';
            setTimeout(() => {
                ELEMENTS.TECHNICAL_SCREEN.style.right = '0%';

                ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(100%)';
            }, 2000);
        });
    }
}

export default routines