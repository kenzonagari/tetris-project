function createEmptyArray (w, h) {
    let arr = [];

    for(let i = 0 ; i < h ; i++){
        arr.push([]);
        for(let j = 0 ; j < w ; j++){
          arr[i].push(0);
      }
    }

    return arr;
}

