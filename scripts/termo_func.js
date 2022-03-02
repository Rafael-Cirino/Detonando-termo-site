var allText

function readjson(path_json) {
    readTextFile(path_json)
    allText = JSON.parse(allText)
    return allText
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                //alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function create_regex_or(list_or, condition) {
    let word_regex_in = ""

    if (condition == "or") {
        word_regex_in = `(`

        for (id in list_or) {
            if (id == (list_or.length - 1)) {
                word_regex_in += `${list_or[id]})`
                break
            }

            word_regex_in += `${list_or[id]}|`
        }
    } else {
        for (id in list_or) {
            word_regex_in += `(?=.*${list_or[id]})`
        }
    }

    //console.log(word_regex_in)
    return word_regex_in
}

function regex_list(reg, list_words) {
    // Regex
    return list_words.filter(function (word) {
        return reg.test(word)
    })
}

function remove_item(list_remove, list_words) {
    list_remove.filter(function (word) {
        let index = list_words.indexOf(word)
        list_words.splice(index, 1)
    })

    return list_words
}

function found_words(list_words, list_in, list_in_id, list_block, word_partial) {
    let reg = ""

    if (true) {
        for (id in word_partial) {
            if (!isNaN(word_partial[id])) {
                reg += "[a-z]{1}"
            } else {
                reg += word_partial[id]
            }
        }

        list_words = regex_list(RegExp(reg), list_words)
    }



    if (list_block.length > 0) {
        reg = create_regex_or(list_block, "or")
        list_remove = regex_list(RegExp(reg), list_words)

        list_words = remove_item(list_remove, list_words)

        //console.log(list_remove)
    }

    if (list_in.length > 0) {
        //Letra sem posição
        reg = create_regex_or(list_in, "and")
        list_words = regex_list(RegExp(reg), list_words)

        //Letra com posição
        let list_remove = []
        for (palavra in list_words) {
            for (id in list_in_id) {
                let aux = list_in_id[id].split(":")

                if (list_words[palavra].includes(aux[0])) {
                    for (l_id in list_words[palavra]) {
                        if ((list_words[palavra][l_id] == aux[0]) && (l_id == Number.parseInt(aux[1]))) {
                            list_remove.push(list_words[palavra])
                            break
                        }
                    }
                }
            }
        }

        list_words = remove_item(list_remove, list_words)
        //console.log(list_in_id)
        //console.log(list_remove)
    }

    console.log(list_words)

    return list_words
}