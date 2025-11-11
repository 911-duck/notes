// !code here 

// ________________create-note________________

const MAIN = document.querySelector(".main");
const HEADER_SETTINGS = document.querySelector(".note-header-settings-screen");
const EXAMPLE = document.querySelector(".example");
const EXAMPLE_HEAD = document.querySelector(".example_head");
const EXAMPLE_TXT = document.querySelector(".example_txt");

const OPTION_URL = document.querySelector(".option_backGround-url");
const OPTION_HEAD = document.querySelector(".option_header-txt");
const OPTION_TXT = document.querySelector(".option_description-txt");
const OPTION_HEAD_FS = document.querySelector(".option_header-font-size");
const OPTION_TXT_FS = document.querySelector(".option_description-font-size");
const OPTION_TXT_COLOR = document.querySelector(".option_txt-color");

const BUTTON_ADD_NOTE_HEADER = document.querySelector(".menu_add-note-header");
const BUTTON_RESET_NOTE_HEADER = document.querySelector(".note-header_exit");
const BUTTON_CREATE_EXAMPLE = document.querySelector(".note-header_create-example");

function createExample(url,header,txt,colorTxt,fontSH,fontST){
    EXAMPLE.style.backgroundImage = `url("${url}")`;
    EXAMPLE.style.backgroundSize = `cover`;
    EXAMPLE_HEAD.innerText = header;
    EXAMPLE_HEAD.style.color = colorTxt;
    EXAMPLE_HEAD.style.fontSize = fontSH+"px";
    EXAMPLE_TXT.innerText = txt;
    EXAMPLE_TXT.style.color = colorTxt;
    EXAMPLE_TXT.style.fontSize = fontST+"px";
}

function closeNoteSettings(event){
    BUTTON_RESET_NOTE_HEADER.removeEventListener('click',closeNoteSettings);
    MAIN.style.transform = `translateY(0%)`;
    HEADER_SETTINGS.style.transform = `translateY(120%)`;
    BUTTON_ADD_NOTE_HEADER.addEventListener('click',openNoteSettings);
}

function openNoteSettings(event){
    BUTTON_ADD_NOTE_HEADER.removeEventListener('click',openNoteSettings);
    MAIN.style.transform = `translateY(-${MAIN.offsetHeight}px)`;
    HEADER_SETTINGS.style.transform = `translateY(0px)`;
    BUTTON_RESET_NOTE_HEADER.addEventListener('click',closeNoteSettings);
    
    BUTTON_CREATE_EXAMPLE.addEventListener('click',e=>{
        createExample(OPTION_URL.value,OPTION_HEAD.value,OPTION_TXT.value,OPTION_TXT_COLOR.value,OPTION_HEAD_FS.value,OPTION_TXT_FS.value);
    });
}

BUTTON_ADD_NOTE_HEADER.addEventListener('click',openNoteSettings);