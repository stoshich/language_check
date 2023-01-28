const connectionData = require('../mysql')

class InputController {
    postString = async (req, res) => {
        const date = Date.now()
        const { text } = req.body
        const sql = "insert into input_table(date, text) values(?, ?);"
        await connectionData.query(sql, [date, text])
            .then(result => console.log(result))
            .catch(err => console.log(err))
        res.json(text)
    }
    checkLetters = (req, res) => {
        const { text } = req.body
        const response = this.getLetters(text)
        res.json(response)
    }
    getLetters(str) {
        const eng = []
        const rus = []
        for (let i = 0; i < str.length; i++) {
            if (str.codePointAt(i) > 64 && str.codePointAt(i) < 123) {
                eng.push(i)
            } else if (str.codePointAt(i) > 1024 && str.codePointAt(i) < 1106) {
                rus.push(i)
            }
        }
        if (eng.length > rus.length) {
            return this.changeColor(str, rus)
        } else
            return this.changeColor(str, eng)
    }

    changeColor(str, posArr) {
        const strArr = str.split('')
        posArr.forEach(pos => strArr[pos] = `<span class="custom">${strArr[pos]}</span>`)
        return strArr.join('')
    }
}

module.exports = new InputController()