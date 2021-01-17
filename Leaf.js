class Leaf {
    static id = 0

    constructor(name, prob) {
        this.name = name
        this.id = Leaf.id++
        this.prob = Number(prob).toFixed(6)
        this._down = []
        this.code = ""
        this.meta = []
    }

    connect(oth) {
        this._down.push(oth)
    }


    getChilds() {
        return this._down
    }

    addCodeCh(ch) {
        this.code = ch + this.code
    }

    addCodeChAll(ch) {
        if(this._down.length===0) {
            this.addCodeCh(ch)
        }
        else {
            for(let leaf of this._down) {
                leaf.addCodeChAll(ch)
            }
        }
    }

    setCode(code) {
        this.code = code
    }


    getAllElementary() {
        let simples = [] 
        if(this._down.length == 0) {
            simples.push(this)
        } 
        else {
            for(let dl of this._down) {
                simples = simples.concat(dl.getAllElementary())
            }
        }
        return simples
    }

    getDepth() {
        if(this._down.length==0) {
            return 0
        }
        else {
            let maxDepth = 0
            let depth = 0
            for(const leaf of this._down) {
                depth = leaf.getDepth()
                if(maxDepth < depth) maxDepth = depth
            }
            return 1+maxDepth
        }
    }
} 
