var log = document.getElementById("log")
var tentativa = -1
var allText, list_words
var word_partial = "01234"
var list_in = []
var list_in_id = []
var list_block = []

function buttons() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 5; j++) {
            let btn = document.createElement("button")
            let text_box = `${i}${j}`
            let text_id = `id:${i}:${j}`

            btn.setAttribute("class", "box")
            btn.disabled = true

            btn.setAttribute("value", text_box)
            btn.textContent = text_box

            btn.setAttribute("id", text_id)
            btn.setAttribute("name", text_id)
            //btn.style.top = `${55 + (i + 1) * 50}px`
            //btn.style.left = `${20 + (j + 1) * 50}px`
            if (window.innerWidth < 640) {
                btn.style.top = `${9 + (i + 1) * 9}%`
                btn.style.left = `${18 + (j + 1) * 9}%`
            } else {
                btn.style.top = `max(${4 + (i + 1) * 4.8}%, ${3 + (i + 1) * 4.8}vw)`
                btn.style.left = `max(${(j + 2) * 4.8}%, ${33.5 + (j + 1) * 4.8}vw)`
            }
            console.log(window.innerWidth)


            btn.setAttribute('onclick', 'color_box("' + text_id + '")')
            document.body.appendChild(btn)
        }
    }

    let list_b = ["TROCA PALAVRA", "ENTER"]
    for (var b_name in list_b) {
        let btn = document.createElement("button")
        let text_box = list_b[b_name]
        let text_id = list_b[b_name]

        btn.setAttribute("class", "box enter")
        btn.setAttribute("value", text_box)
        btn.textContent = text_box

        btn.setAttribute("id", text_id)

        if (list_b[b_name] == "ENTER") {
            btn.setAttribute('onclick', "enter_main()")
            if (window.innerWidth < 640) {
                btn.style.left = `${55}%`
            } else {
                btn.style.left = `${53}%`
            }
        } else {
            if (window.innerWidth < 640) {
                btn.style.left = `${30}%`
            } else {
                btn.style.left = `${38}%`
            }
            btn.setAttribute('onclick', 'random_word()')
        }
        document.body.appendChild(btn)
    }
}

function color_box(id_box) {
    let box = document.getElementById(id_box)

    if (["edit", "wrong"].includes(box.classList[1])) {
        box.setAttribute("class", "box yellow")
    } else if (box.classList[1] == "yellow") {
        box.setAttribute("class", "box right")
    } else {
        box.setAttribute("class", "box wrong")
    }
}

function writeBox(word, i) {
    for (var letra in word) {
        let id_box = `id:${i}:${letra}`
        let box = document.getElementById(id_box)

        box.setAttribute("class", "box edit")
        box.setAttribute("value", word[letra])
        box.textContent = word[letra]
        box.disabled = false
    }

}

function closeBox(i) {
    for (var j = 0; j < 5; j++) {
        let id_box = `id:${i}:${j}`
        let box = document.getElementById(id_box)
        let box_class = box.classList[1]
        let box_letter = box.value.toLowerCase()

        let letra_in = `${box_letter}:${j}`
        if ((box_class == "edit") || (box_class == "wrong")) {
            box.setAttribute("class", "box wrong")
            if (!list_block.includes(box_letter) && !list_in.includes(box_letter) && !word_partial.includes(box_letter)) {
                list_block.push(box_letter)
            }
        } else if ((box_class == "yellow") && !list_in_id.includes(letra_in)) {
            list_in_id.push(letra_in)

            if (!list_in.includes(box_letter)) {
                list_in.push(box_letter)
            }
        }
        else if (box_class == "right") {
            word_partial = word_partial.replace(String(j), box_letter)
        }

        box.disabled = true
    }
}

function random_word() {
    if (tentativa == 1) {
        word = list_words[Math.floor(Math.random() * list_words.length)]
        writeBox(word, 0)
    } else {
        word = list_words[Math.floor(Math.random() * list_words.length)]
        writeBox(word, tentativa - 1)
    }

}

function enter_main() {
    var word = "BARCO"

    if (tentativa == -1) {
        writeBox(word, 0)
        list_words = readjson("./json_words.json")

        tentativa = 1
    } else if (tentativa <= 5) {
        closeBox(tentativa - 1)

        list_words = found_words(list_words, list_in, list_in_id, list_block, word_partial)
        word = list_words[Math.floor(Math.random() * list_words.length)]
        writeBox(word, tentativa)

        log.innerHTML = "<p>Banco de palavras:</p>"
        log.innerHTML += `<p>${list_words.length}</p>`

        tentativa += 1
    }

}
