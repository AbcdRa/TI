
function find2mins(list) {
    if(list.length === 2) {
        return list
    }
    else {
        let minimum1 = {prob:2}
        let minIndex1 = 0
        list.forEach((el, i) => {
            if(el.prob < minimum1.prob) {
                minimum1 = el
                minIndex1 = i
            }
        })
        list = arrayRemove(list, minimum1)
        let minimum2 = {prob:2}
        let minIndex2 = 0
        list.forEach((el, i) => {
            if(el.prob < minimum2.prob) {
                minimum2 = el
                minIndex2 = i
            }
        })
        let targetIndex = Math.min(minIndex2,minIndex1)
        let result = minIndex1 < minIndex2 ? [minimum2, minimum1, targetIndex] : [minimum1, minimum2, targetIndex]
        return result
    }
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function findIndex(arr, value) {
    return arr.findIndex((element, index, array) => element==value)
}