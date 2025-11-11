// !code here 

// _______________create-header_______________

let headers = [];

const MAIN = document.querySelector(".main");
const HEADERS = document.querySelector(".note-headers")
const HEADER_SETTINGS = document.querySelector(".add-header-screen");

const OPTION_HEADER = document.querySelector(".add-header-screen_input");

const BUTTON_ADD_HEADER = document.querySelector(".menu_add-note-header");
const BUTTON_RESET_HEADER = document.querySelector(".add-header-screen_exit");
const BUTTON_SUBMIT_HEADER_CREATE = document.querySelector(".add-header-screen_submit")

function createHeader(event){
    HEADERS.innerHTML += `
    <div class="note-headers_note-header note-header note-header-javaScript">
        <div class="note-header_name">${OPTION_HEADER.value}</div>
        <div class="note-header_headers">0 headers</div>
    </div>
    `;
    closeHeaderSettings();
}

function closeHeaderSettings(event){
    HEADER_SETTINGS.style.transform = `translateY(-${MAIN.offsetHeight}px)`;
    
    BUTTON_SUBMIT_HEADER_CREATE.removeEventListener('click',createHeader);
    BUTTON_ADD_HEADER.addEventListener('click',openHeaderSettings);
    BUTTON_RESET_HEADER.removeEventListener('click',closeHeaderSettings);
}

function openHeaderSettings(event){
    HEADER_SETTINGS.style.transform = "translateY(-50%)";

    BUTTON_SUBMIT_HEADER_CREATE.addEventListener('click',createHeader);
    BUTTON_ADD_HEADER.removeEventListener('click',openHeaderSettings);
    BUTTON_RESET_HEADER.addEventListener('click',closeHeaderSettings);
}

BUTTON_ADD_HEADER.addEventListener('click',openHeaderSettings);

// ________________create-note________________

let nodes = [];

const NODE_SETTINGS = document.querySelector(".note-settings-screen");
const EXAMPLE = document.querySelector(".example");
const EXAMPLE_HEAD = document.querySelector(".example_head");
const EXAMPLE_TXT = document.querySelector(".example_txt");

const OPTION_URL = document.querySelector(".option_backGround-url");
const OPTION_HEAD = document.querySelector(".option_header-txt");
const OPTION_HEAD_FS = document.querySelector(".option_header-font-size");
const OPTION_TXT = document.querySelector(".option_description-txt");
const OPTION_TXT_FS = document.querySelector(".option_description-font-size");
const OPTION_TXT_COLOR = document.querySelector(".option_txt-color");

const BUTTON_SUBMIT = document.querySelector(".note_submit");
const BUTTON_ADD_NOTE = document.querySelector(".menu_add-note");
const BUTTON_RESET_NOTE = document.querySelector(".note_exit");
const BUTTON_CREATE_EXAMPLE = document.querySelector(".note_create-example");

function createExample(event){
    EXAMPLE.style.backgroundImage = `url("${OPTION_URL.value}")`;
    EXAMPLE.style.backgroundSize = `cover`;
    EXAMPLE_HEAD.innerText = OPTION_HEAD.value;
    EXAMPLE_HEAD.style.color = OPTION_TXT_COLOR.value;
    EXAMPLE_HEAD.style.fontSize = OPTION_HEAD_FS.value+"px";
    EXAMPLE_TXT.innerText = OPTION_TXT.value;
    EXAMPLE_TXT.style.color = OPTION_TXT_COLOR.value;
    EXAMPLE_TXT.style.fontSize = OPTION_TXT_FS.value+"px";
}

function createNode(event){
    let node_txt = {
        header: OPTION_HEAD.value,
        txt: OPTION_TXT.value
    };
    let node_styles = {
        header_fontSize: OPTION_HEAD_FS.value,
        txt_fontSize: OPTION_TXT_FS.value,
        txt_color: OPTION_TXT_COLOR.value,
        picture_url: OPTION_URL.value
    };

    nodes.push({node_txt,node_styles});
    console.log(nodes)
}

function closeNoteSettings(event){
    MAIN.style.transform = `translateY(0%)`;
    NODE_SETTINGS.style.transform = `translateY(120%)`;

    BUTTON_SUBMIT.removeEventListener('click',createNode);
    BUTTON_RESET_NOTE.removeEventListener('click',closeNoteSettings);
    BUTTON_ADD_NOTE.addEventListener('click',openNoteSettings);
    BUTTON_CREATE_EXAMPLE.removeEventListener('click',createExample);
}

function openNoteSettings(event){
    MAIN.style.transform = `translateY(-${MAIN.offsetHeight}px)`;
    NODE_SETTINGS.style.transform = `translateY(0px)`;
    
    BUTTON_SUBMIT.addEventListener('click',createNode);
    BUTTON_ADD_NOTE.removeEventListener('click',openNoteSettings);
    BUTTON_RESET_NOTE.addEventListener('click',closeNoteSettings);
    BUTTON_CREATE_EXAMPLE.addEventListener('click',createExample);
}

BUTTON_ADD_NOTE.addEventListener('click',openNoteSettings);