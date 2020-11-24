let out, afterOut

function parse() {
    let prob1num = document.getElementById("num").value
    let prob1denum = document.getElementById("denum").value
    let length = document.getElementById("length").value
    let code = document.getElementById("code").value
    if(isNaN(prob1num) || isNaN(prob1denum) || isNaN(length)) {
        alert("Ало бля че за хуйню ввел, вводи цифры в поля а не залупу" +
        ", Думаешь мне интересно это чекать ? ")
        return false
    }
    if(prob1denum < 1) {
        alert("Ало бля знаменатель не может быть 0 или меньше")
        return false
    }
    if(length < 1) {
        alert("Ало бля длина не может быть меньше 1 ты че бля раскодировать пытаешься")
        return false
    }
    if(!/^[1,0]*$/.test(code)) {
        alert("Ало бля код должен состоять из 1 и 0 удали лишнее")
        return false
    }
    return [prob1num, prob1denum, length, code]
}

function main() {
    out = document.getElementById("out")
    afterOut = document.getElementById("result")

    out.innerHTML = ""
    afterOut.innerHTML = ""
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let parseOut = parse()
    if(!parseOut) {
        return 0
    }
    let [prob1num, prob1denum, length, code] = parseOut
    const prob1 = new Frac(prob1num, prob1denum)
    //Упрощаем дробь если это возможно
    prob1.easy()
    let target = bin2frac(code)  
    target.easy()
    let prob0 = new Frac(1,1).minus(prob1)
    draw(prob0, target)
    let hlp = []
    let decode = ""
    hlp = drawNext(new Frac(1,1), new Frac(0,1), prob0, 1, target, prob0)
    decode += hlp[3]
    for(let i=2; i < length; i++) {
        hlp = drawNext(hlp[0], hlp[1], hlp[2], i, target, prob0)
        decode += hlp[3]
    }
    decode += target.lower(hlp[2]) ? "0" : "1"
    afterOut.innerHTML = `Декодированное сообщение: ${decode}`
}

function bin2frac(code) {
    let result = `Преобразуем двоичное представление 0.${code} в дробь.`
    result += `Определим знаменатель дроби, он равен 2^(число разрядов+1).`
    const denum = Math.pow(2,code.length+1)
    result += `Число разрядов равно ${code.length}, значит знаментаель равен 2^${code.length+1} = ${denum} <br>`
    const [explain, num] = bin2dec(code)
    result += `Определим числитель для этого просто переведем ${code} в десятичное число ${explain} <br>`
    result += `Получаем дробь ${num}/${denum}`
    out.innerHTML = result
    return new Frac(num, denum)
}


function bin2dec(code) {
    let result = ""
    let dec = 0
    for (let i=0; i<code.length; i++) {
        result += `${code[i]}*2^${code.length-1-i}+`
        dec += code[i]*Math.pow(2,code.length-1-i)
    }
    result = result.substr(0, result.length-1)
    result += ` = ${dec}`
    return [result, dec]
}

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

const FX = 60
const FY = 20

function draw(prob, target) {
    FS = (100+FY)-100/prob.denum*prob.num
    drawLine(FX, FY, FX, FS, 3, "rgb(255, 0, 0)")
    drawLine(FX, FS, FX, FY+100, 3, "rgb(0, 0, 255)")
    drawText("1", FX-5, FY-10)
    drawText("0", FX-5, FY+110)
    drawLine(FX-5, FS, FX+5, FS, 2)
    drawText(prob.toStr(),FX-50, FS)
    FT = (100+FY)-100/target.denum*target.num
    drawLine(FX-5,FT,FX+5,FT,1)
    drawText(target.toStr(),FX+10, FT)
}


function drawNext(high, low, prob, i, target, prob0) {
    FS = (100+FY)-100/prob0.denum*prob0.num
    fx = FX+2*FX*i
    let high_n, low_n, prob_n, decode
    //Выбран 0
    if(target.lower(prob)) {
        high_n = prob
        low_n = low
        decode = 0
    //Выбрана 1
    } else {
        high_n = high
        low_n = prob
        decode = 1
    }
    prob_n = high_n.minus(low_n).mul(prob0).plus(low_n)



    drawLine(fx, FY, fx, FS, 3, "rgb(255, 0, 0)")
    drawLine(fx, FS, fx, FY+100, 3, "rgb(0, 0, 255)")
    drawText(high_n.toStr(), fx-5, FY-10)
    drawText(low_n.toStr(), fx-5, FY+110)
    drawLine(fx-5, FS, fx+5, FS, 2)
    drawText(prob_n.toStr(),fx-50, FS)
    FT = 100+FY-target.minus(low_n).div(high_n.minus(low_n)).toNum() * 100
    drawLine(fx-5,FT,fx+5,FT,1)
    drawText(target.toStr(),fx+10, FT)
    return [high_n, low_n, prob_n, decode]
}


function drawLine(x1, y1, x2, y2, width=3, color="rgb(0,0,0)") {
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
} 

function drawText(text, x, y, px=10) {
    ctx.font = `${px}px serif`
    ctx.fillText(text,x,y)
}