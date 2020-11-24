function NOD(first, second) {
    let a = Math.max(first, second)
    let b = Math.min(first, second)

    let r_past1 = a
    let r_past2 = b
    let r_now = r_past1%r_past2

    while(r_now !== 0) {
        r_past1 = r_past2
        r_past2 = r_now
        r_now = r_past1%r_past2
    }

    return r_past2
}

class Frac {
    constructor(num, denum) {
        this.num = num
        this.denum = denum
    }

    easy() {
        let nod = NOD(Math.abs(this.num), this.denum)
        this.num = this.num/nod
        this.denum = this.denum/nod
        if(this.denum === 0) {
            this.denum = 1
            this.num = 0
        }
        if(this.denum < 0) {
            this.num = -this.num
        }
    }

    plus(oth) {
        const result = new Frac(this.num*oth.denum+this.denum*oth.num, this.denum*oth.denum)
        result.easy()
        return result
    }

    neg() {
        const result = new Frac(this.num, this.denum)
        result.num = -result.num
        return result
    }

    minus(oth) {
        const result = new Frac(this.num*oth.denum-this.denum*oth.num, this.denum*oth.denum)
        result.easy()
        return result
    }

    mul(oth) {
        const result = new Frac(this.num*oth.num, this.denum*oth.denum)
        result.easy()
        return result
    }


    div(oth) {
        const result = new Frac(this.num*oth.denum, this.denum*oth.num)
        result.easy()
        return result
    }

    toStr() {
        if(this.denum===1) return this.num
        return this.num+"/"+this.denum
    }


    toNum() {
        return this.num/this.denum
    }

    lower(oth) {
        return this.num*oth.denum<oth.num*this.denum
    }
} 


