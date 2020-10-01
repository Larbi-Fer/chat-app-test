function toggleClass(className, classToggle) {
    document.querySelector(className).classList.toggle(classToggle);
}

function toggleClassList(className, classToggle, toog) {
    try {
        if (toog == "toogle")
            document.querySelector(className).classList.toggle(classToggle);
        else if (toog == "add") {
            var clN = document.querySelector(className)
            if (clN != null)
                clN.classList.add(classToggle);
        } else if (toog == "del") {
            var clN = document.querySelector(className)
            if (clN != null)
                clN.classList.remove(classToggle);
        }
    } catch (error) {

    }
}