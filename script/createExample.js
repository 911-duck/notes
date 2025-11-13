import ELEMENTS from "../elements.js";

function createExample(event) {
    ELEMENTS.EXAMPLE.style.backgroundImage = `url("${ELEMENTS.OPTION_URL.value}")`;
    ELEMENTS.EXAMPLE.style.backgroundSize = `cover`;
    ELEMENTS.EXAMPLE_HEAD.innerText = ELEMENTS.OPTION_HEAD.value;
    ELEMENTS.EXAMPLE_HEAD.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
    ELEMENTS.EXAMPLE_HEAD.style.fontSize = ELEMENTS.OPTION_HEAD_FS.value + "px";
    ELEMENTS.EXAMPLE_TXT.innerText = ELEMENTS.OPTION_TXT.value;
    ELEMENTS.EXAMPLE_TXT.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
    ELEMENTS.EXAMPLE_TXT.style.fontSize = ELEMENTS.OPTION_TXT_FS.value + "px";
}

export default createExample