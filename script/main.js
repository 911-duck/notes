const settingIconBlock = document.querySelector('.menu_settings-icon')
const settings = document.querySelector('.setting')
settingIconBlock.onclick = ()=> {
    settingIconBlock.classList.toggle('false')
    settings.classList.toggle('settings')
    settings.style.left = '0px'
}