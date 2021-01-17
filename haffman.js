const inverse = ["0", "1"]

function haffman_prestart() {
    const fCh = document.getElementById("fastCh").value
    const fPr = document.getElementById("fastPr").value
    let chArray = fCh.split(" ")
    let prArray = fPr.replaceAll(",",".").split(" ")
    let leaves = []
    for(let i in chArray) {
        leaves.push({name: chArray[i], prob:prArray[i]})
    }
    leaves = leaves.sort((a,b)=>Number(b.prob)-Number(a.prob))
    list = []
    for(let i in chArray) {
        list.push(new Leaf(leaves[i].name, leaves[i].prob))
    }
    haffman_main(list.sort((a,b)=>Number(b.prob)-Number(a.prob)))
}


function haffman_main(list) {
    let Inleaves = list.sort((a,b)=>Number(b.prob)-Number(a.prob))
    // create an array with nodes
    let nodes = []
    for(const i in Inleaves) {
        nodes.push(leafToNode(Inleaves[i],0))
    }

    let leaves = Inleaves.slice()
    let connections = []
    while(leaves.length>1) {
        let mins = find2mins(leaves)
        let target_index = mins[2]
        mins = mins.slice(0,2)

        let newLeaf = new Leaf(mins[0].name+mins[1].name,Number(mins[0].prob)+Number(mins[1].prob))
        mins[0].addCodeChAll(inverse[0])
        mins[1].addCodeChAll(inverse[1])
        newLeaf.connect(mins[0])
        newLeaf.connect(mins[1])
        leaves[target_index] = newLeaf

        leaves = arrayRemove(leaves,mins[0])
        leaves = arrayRemove(leaves,mins[1])

        nodes.push(leafToNode(newLeaf, newLeaf.getDepth()) )
        connections.push({ from: mins[0].id, to: newLeaf.id, label:inverse[0] })
        connections.push({ from: mins[1].id, to: newLeaf.id, label:inverse[1] })
    }

    nodes = new vis.DataSet(nodes);
    // create an array with edges
    var edges = new vis.DataSet(connections);

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
    nodes: nodes,
    edges: edges
    };
    var options = {
        autoResize: true,
        height: "500px",
        edges: {
          smooth: {
            type: "cubicBezier",
            forceDirection:"horizontal",
            roundness: 0.1,
          },
        },
        layout: {
          hierarchical: {
            direction: "LR",
            nodeSpacing: 70,
            treeSpacing: 95,
            levelSeparation: 120,
            parentCentralization: false,
            blockShifting: true,
            edgeMinimization: true,
            sortMethod: 'directed'
          },
        },
        nodes: {
            scaling: {
                min: 50,
            },
            color: {
                border: '#2B7CE9',
                background: '#FFFFFF',
            }
        },
        physics: false,
      };
    var network = new vis.Network(container, data, options);



    out.innerHTML = generateFinalTable(Inleaves)
    if(document.getElementById("code").value) {
        out.innerHTML += "<br><br><br>" + decoding(Inleaves)
    }
    out.innerHTML += "<br><br><br>" + average(Inleaves)
}


function leafToNode(leaf, level) {
    return { id: leaf.id, label: '"' + leaf.name + '"\n' + Number(leaf.prob).toString(), level:level,}
}



function decoding(els) {
    let code = document.getElementById("code").value
    let decode = ""
    while(code.length > 0) {
        for(el of els) {
            if(code.startsWith(el.code)) {
                decode += el.name
                code = code.substring(el.code.length)
            }
        }
    }
    return decode

}


function average(els) {
    let text = "Средняя длина кодового слова = ("
    let sum = 0
    for(el of els) {
        text += `${el.code.length}+`
        sum += el.code.length
    }
    text = text.substr(0, text.length-1)
    let result = sum/els.length
    text += ")/" + els.length + " = " + result.toFixed(4)
    return text
}


function generateFinalTable(elements) {
    let html = "<table>"
    html += "<tr>"
    for(el of elements) {
        html += "<td>"+ el.name +"</td>"
    }
    html += "</tr>"
    html += "<tr>"
    for(el of elements) {
        html += "<td>"+ el.code +"</td>"
    }
    html += "</tr>"
    return html
}