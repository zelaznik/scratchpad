function swap(store, x, y) {
    var temp = store[x];
    store[x] = store[y];
    store[y] = temp;
}

function parent(i) {
    return Math.floor((i-1) / 2);
}

function largestChild(i, store, heapSize) {
    var left =  2*i + 1,
        right = 2*i + 2;

    if (left >= heapSize) {
        return null;
    } else if (right >= heapSize) {
        return left;
    } else if (store[left] > store[right]) {
        return left;
    } else {
        return right;
    }
}

function heapifyUp(store, heapSize) {
    var i = heapSize - 1;
    while (i > 0) {
        var p = parent(i);
        if (store[i] > store[p]) {
            swap(store, i, p);
            i = p;
        } else {
            break;
        }
    }
}

function heapifyDown(store, heapSize) {
    var i = 0;
    while (i < heapSize) {
        var c = largestChild(i, store, heapSize);
        if (c === null)
            break;
        if (store[i] < store[c])
            swap(store, i, c);
        i = c;
    }
}

function heapSort(store) {
    var heapSize,
        n = store.length;

    /* Build Heap */
    heapSize = 0;
    while (heapSize < n) {
        heapSize++;
        heapifyUp(store, heapSize);
    }

    /* Clear Heap */
    heapSize = n;
    while (heapSize > 0) {
        heapSize--;
        swap(store, 0, heapSize);
        heapifyDown(store, heapSize);
    }

    return store;
};