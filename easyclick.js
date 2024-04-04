// Custom easyclick script for easier user interaction!
// This function is the "draw" function of the script and works at 60fps. It is advised to merge it with your draw() function given that it operates at a minimum of 24fps. (Using requestAnimationFrame also works!)
var frame = 0
function updateEasyclick() {
    var newTime = Date.now()

    // updateOtherStuffHere("do your own stuff here")

    // Add additional conditions to this part of the script in order to prevent certain buttons from being easyclicked.
    if (easyButton !== null && easyTime <= newTime) {
        easyButton.click()
        easyTime += 50
        alreadyClicked = false
    }

    alreadyClicked = false
    setTimeout(updateEasyclick, (++frame % 3 === 0 ? 16 : 17) - Date.now() + newTime)
}


// This part of the script is not necessary ONLY IF you do not use the alert, prompt, and confirm functions.
var _oldAlert = alert
alert = function () {
    easyButton = null
    _oldAlert()
}
var _oldPrompt = prompt
prompt = function () {
    easyButton = null
    _oldPrompt()
}
var _oldConfirm = confirm
confirm = function () {
    easyButton = null
    _oldConfirm()
}
var mouseDown, mouseX, mouseY, noTouching = true, hovered = null, spaceDown = false, enterDown = false
document.addEventListener("mousedown", function (e) {
    if (noTouching) {
        mouseDown = true
        mouseX = e.clientX
        mouseY = e.clientY
        var target = e.target
        easyButton = target
        easyTime = Date.now() + 500

        hovered = target.getAttribute ? target : null
    }
})

document.addEventListener("mousemove", function (e) {
    if (noTouching) {
        mouseX = e.clientX
        mouseY = e.clientY
    }
})

document.addEventListener("mouseup", function (e) {
    mouseDown = false
    if (noTouching) {
        easyButton = null
    }
})

document.addEventListener("touchstart", function (e) {
    updateTouch(e)
    noTouching = false
})
document.addEventListener("touchmove", updateTouch)
document.addEventListener("touchend", function (e) {
    noTouching = e.touches.length === 0
    easyButton = null
})

function updateTouch(e) {
    if (e.touches.length === 1) {
        var touch = e.touches[0]
        var target = document.elementFromPoint(touch.clientX, touch.clientY)

        if (target !== null && target.getAttribute) {
            hovered = target
            easyButton = target
            easyTime = Date.now() + 500
        } else {
            hovered = null
        }
    } else {
        hovered = null
    }
}

document.addEventListener("keyup", function (e) {
    if (e.keyCode === 32) {
        spaceDown = false
    } else if (e.keyCode === 13) {
        enterDown = false
    }
    if (!spaceDown && !enterDown) {
        easyButton = null
    }
})

document.addEventListener("keydown", function (e) {
    var target = e.target
    if (!(["INPUT", "SELECT", "TEXTAREA", "U"]).includes(target.tagName)) {
        if (e.repeat) {
            if (e.keyCode === 32 || e.keyCode === 13) {
                e.preventDefault()
                e.stopPropagation()
            }
        } else if (!e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (e.keyCode === 32 || e.keyCode === 13) {
                if (e.keyCode === 32) {
                    spaceDown = true
                } else {
                    enterDown = true
                }
                if (target.parentElement) {
                    easyButton = target
                    easyTime = Date.now() + 500
                    target.click()
                }

                e.preventDefault()
                e.stopPropagation()
            }
        }
    }
})

updateEasyclick()
