import ELEMENTS from "../elements.js";

function defaultVisualSettings(){
    ELEMENTS.OPTION_MAIN_BASE_COLOR.value = window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--menu_color');
    ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.value = window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--notes_color');
    ELEMENTS.OPTION_MAIN_BUTTON_COLOR.value = window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--button_color');
    ELEMENTS.OPTION_MAIN_HEADER_FONT_SIZE.value = window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--header_font-size').slice(0,-2);
    ELEMENTS.OPTION_MAIN_TEXT_FONT_SIZE.value = window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--text_font-size').slice(0,-2);
}

export default defaultVisualSettings