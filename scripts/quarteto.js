var log = document.getElementById("log")
var tentativa = -1
var allText, list_words
var word_partial = "01234"
var list_in = []
var list_in_id = []
var list_block = []

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
                    btn.style.height = `3.2vw`
                    btn.style.width = `3.2vw`
                }
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
                btn.style.left = `${42}%`
            }
            btn.setAttribute('onclick', 'random_word()')
        }
        btn.style.top = `86%`
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
