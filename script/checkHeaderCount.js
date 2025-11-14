function checkHeaderCount(active_header){
    let Objectlength = active_header.querySelectorAll(".note-header_note-child").length;
    active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_headers").innerText = Objectlength + (Objectlength >= 1 ? Objectlength > 1 ? " заметки" : " заметка" : " заметок");        
}

export default checkHeaderCount