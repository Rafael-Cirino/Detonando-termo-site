var tentativa = -1
var c_break = [0, 1, 2, 3]
var allText
var word_partial = ["01234", "01234", "01234", "01234"]
var list_in = [[], [], [], []]
var list_in_id = [[], [], [], []]
var list_block = [[], [], [], []]
var list_words = []

//Resolver o b.o que não deixa travar as colunas

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
    let word = word_select()
    if (tentativa == 1) {
        writeBox_4(word, 0)
    } else {
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
    for (let k of c_break) {
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

function word_rigth(word_aux) {
    let reg

    for (id in word_aux) {
        if (!isNaN(word_aux[id])) {
            return false
        } else {
            reg = true
        }
    }

    return reg
}

function word_select() {
    let word = "XXXXX"
    let id_sel = 0
    let aux = 10 ** 5
    let list_remove = []


    for (let k of c_break) {
        let list_len = list_words[k].length

        console.log(list_len)
        if (word_rigth(word_partial[k])) {
            console.log(list_len, "passou aqui")
            list_remove.push(k)
        } else if ((list_len < aux) && (list_len > 0)) {
            id_sel = k
            aux = list_words[k].length
        }
    }

    for (let k of list_remove) {
        if (c_break.indexOf(k) > -1) {
            c_break.splice(c_break.indexOf(k), 1)
        }
    }

    console.log(aux, "aux select")
    if (aux == 1) {
        return list_words[id_sel][0]
    }

    let i = 0
    let point = 0
    while (i <= 20) {
        let point_aux = 0
        word = list_words[id_sel][Math.floor(Math.random() * list_words[id_sel].length)]

        for (let k of c_break) {
            if ([word].includes(list_words[k])) {
                point_aux += 1
            }
        }

        if (point_aux > point) {
            point = point_aux
        } else if (point_aux >= 2) {
            console.log(word)
            return word
        }
        i += 1
    }

    return word
}

function enter_main_4() {
    var word = "BARCO"

    if (tentativa == -1) {
        writeBox_4(word, 0)

        for (var k = 0; k < 4; k++) {
            let list_aux = readjson("./json_words.json")
            list_words.push(list_aux)

            let log = document.getElementById(`div_log_${k}`)
            log.innerHTML = "<p>Banco de palavras:</p>"
            log.innerHTML += `<p>${list_words[k].length}</p>`
        }

        console.log(list_words)


        tentativa = 1
    } else if (tentativa <= 9) {
        closeBox(tentativa - 1)

        for (let k of c_break) {
            list_words[k] = found_words(list_words[k], list_in[k], list_in_id[k], list_block[k], word_partial[k])

            let log = document.getElementById(`div_log_${k}`)
            log.innerHTML = "<p>Banco de palavras:</p>"
            log.innerHTML += `<p>${list_words[k].length}</p>`
        }

        word = word_select()
        writeBox_4(word, tentativa)

        tentativa += 1
    }

}

