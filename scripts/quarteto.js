var tentativa = -1
var allText
var word_partial = ["01234", "01234", "01234", "01234"]
var list_in = [[], [], [], []]
var list_in_id = [[], [], [], []]
var list_block = [[], [], [], []]
var list_words = []

function buttons_4() {
    for (var k = 0; k < 4; k++) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 5; j++) {
                let btn = document.createElement("button")
                let text_box = `${i}${j}`
                let text_id = `id:${k}:${i}:${j}`

                btn.setAttribute("class", "box")
                btn.disabled = true

                btn.setAttribute("value", text_box)
                btn.textContent = text_box

                btn.setAttribute("id", text_id)
                btn.setAttribute("name", text_id)

                if (window.innerWidth <= 641) {
                    btn.style.top = `${6 + (i + 1) * 8}vh`
                    btn.style.left = `${(j + 0.8) * 16}vw`
                } else {
                    btn.style.top = `max(${4 + (i + 1) * 4.8}%, ${6.6 + (i + 1) * 3.4}vw)`
                    btn.style.left = `${(j + (k * 6.8) + 2) * 3.4}vw`

                }
                btn.style.height = `3.2vw`
                btn.style.width = `3.2vw`
                console.log(window.innerWidth)


                btn.setAttribute('onclick', 'color_box("' + text_id + '")')
                document.body.appendChild(btn)
            }
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
            btn.setAttribute('onclick', "enter_main_4()")
            if (window.innerWidth < 640) {
                btn.style.left = `${55}%`
            } else {
                btn.style.left = `${53}%`
            }
        } else {
            if (window.innerWidth < 640) {
                btn.style.left = `${30}%`
            } else {
                btn.style.left = `${40}%`
            }
            btn.setAttribute('onclick', 'random_word_4()')
        }
        btn.style.top = `85%`
        btn.style.height = `38pt`
        btn.style.font = `normal 12pt Arial`
        document.body.appendChild(btn)
    }

    for (var i = 0; i < 4; i++) {
        let sec = document.createElement("SECTION")
        let id_sec = `sec_log_${i}`
        sec.setAttribute("id", id_sec)

        sec.style.top = `4.5vw`
        sec.style.left = `${11 + i * 23}vw`
        sec.style.font = "normal 0.8vw Arial"
        sec.style.width = "8vw"
        sec.style.padding = "0.3vw"
        document.body.appendChild(sec)

        let get_sec = document.getElementById(id_sec)
        let div = document.createElement('div')
        let id_div = `div_log_${i}`
        div.setAttribute("id", id_div)
        div.innerHTML = "<p>Banco de palavras:</p>"
        div.innerHTML += "<p>0</p>"

        get_sec.appendChild(div)
    }
}

function random_word_4() {
    if (tentativa == 1) {
        word = list_words[0][Math.floor(Math.random() * list_words.length)]
        writeBox_4(word, 0)
    } else {
        word = list_words[0][Math.floor(Math.random() * list_words.length)]
        writeBox_4(word, tentativa - 1)
    }

}

function closeBox(i) {
    for (var k = 0; k < 4; k++) {
        for (var j = 0; j < 5; j++) {
            let id_box = `id:${k}:${i}:${j}`
            let box = document.getElementById(id_box)
            let box_class = box.classList[1]
            let box_letter = box.value.toLowerCase()

            let letra_in = `${box_letter}:${j}`
            if ((box_class == "edit") || (box_class == "wrong")) {
                box.setAttribute("class", "box wrong")
                if (!list_block[k].includes(box_letter) && !list_in[k].includes(box_letter) && !word_partial[k].includes(box_letter)) {
                    list_block[k].push(box_letter)
                }
            } else if ((box_class == "yellow") && !list_in_id[k].includes(letra_in)) {
                list_in_id[k].push(letra_in)

                if (!list_in[k].includes(box_letter)) {
                    list_in[k].push(box_letter)
                }
            }
            else if (box_class == "right") {
                word_partial[k] = word_partial[k].replace(String(j), box_letter)
            }

            box.disabled = true
        }
    }
    //console.log(list_block)
    //console.log(list_in)
    //console.log(word_partial)
}

function writeBox_4(word, i) {
    for (var k = 0; k < 4; k++) {
        for (var letra in word) {
            let id_box = `id:${k}:${i}:${letra}`
            let box = document.getElementById(id_box)

            box.setAttribute("class", "box edit")
            box.setAttribute("value", word[letra])
            box.textContent = word[letra]
            box.disabled = false
        }
    }
}


function enter_main_4() {
    var word = "BARCO"

    if (tentativa == -1) {
        writeBox_4(word, 0)

        for (var k = 0; k < 4; k++) {
            let list_aux = readjson("./json_words.json")
            list_words.push(list_aux)
        }

        console.log(list_words)


        tentativa = 1
    } else if (tentativa <= 5) {
        closeBox(tentativa - 1)

        for (var k = 0; k < 4; k++) {
            console.log(k)
            console.log(list_words)
            list_words[k] = found_words(list_words[k], list_in[k], list_in_id[k], list_block[k], word_partial[k])

            let log = document.getElementById(`div_log_${k}`)
            log.innerHTML = "<p>Banco de palavras:</p>"
            log.innerHTML += `<p>${list_words[k].length}</p>`
        }

        word = list_words[0][Math.floor(Math.random() * list_words.length)]
        writeBox_4(word, tentativa)

        tentativa += 1
    }

}

