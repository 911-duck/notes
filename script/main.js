const setBlock = document.querySelector('.settings-block')
const settings = document.querySelector('.setting')
setBlock.onclick = ()=> {
    settings.style.animation = 'animation: ToLeft 0.5s linear forwards;'
    setBlock.classList.replace('settings-block', 'false')
    settings.classList.replace('false', 'settings')
    settings.style.left = '0px'
}
settings.onclick = ()=> {
    settings.style.animation = 'animation: ToRight 0.5s linear forwards;'
    setBlock.classList.replace('false', 'settings-block')
    settings.classList.replace('settings', 'false')
    settings.style.left = '-200px'
}