function createEmptyArray (w, h) {
    let arr = [];

    for (let i = 0 ; i < h ; i++){
        arr.push(new Array(w).fill(0))
    }

    return arr;
}