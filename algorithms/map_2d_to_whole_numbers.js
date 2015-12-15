// Create a function f(x,y) that accepts two integers and returns a third integer.
// Now create a function that accepts this integer and returns the original x, y 
// coordinates.  This whould work for all integers -intfinity < x, y < infinity

function to_index(x, y) {
    var abs_x = Math.abs(x);
    var abs_y = Math.abs(y);

    var abs_n = abs_x + abs_y;
    var abs_q = abs_n * (abs_n+1) / 2;
    var abs_id = abs_q + abs_x;

    var neg_x  = 1 * (x < 0);
    var neg_y  = 1 * (y < 0);
    var offset = 2 * neg_x + neg_y;

    var id = 4 * abs_id + offset;
    return id;
};

function from_index(id) {
    var abs_id = Math.floor(id/4);
    var offset = id % 4;

    var abs_nf = 0.5 * (Math.sqrt(1 + 8*abs_id) - 1);
    var abs_ni = Math.floor(abs_nf);
    var abs_di = abs_ni * (abs_nf - abs_ni);

    var abs_y = abs_ni - Math.ceil(abs_di);
    var abs_x = abs_ni - abs_y;

    var neg_y = offset % 2;
    var neg_x = Math.floor(offset / 2);

    if (neg_y) {
        var y = abs_y * -1;
    } else {
        var y = abs_y;
    }

    if (neg_x) {
        var x = abs_x * -1;
    } else {
        var x = abs_x;
    }

    return {x: x, y: y};
};

function run_tests() {
    // Run every combination of -1000 <= x, y < 1000
    var taken = {};
    for (var x =-1000; x<1000; x++) {
        for (var y =-1000; y<1000; y++) {
            var d = {x: x, y: y};
            var i = to_index(x, y);
            if (taken[i]) {
                throw "Uniqueness Error at " + JSON.stringify(d);
            }
            var p = from_index(i);
            if (p.x !== x || p.y !== y) {
                throw "Reversed Error at " + JSON.stringify(d);
            }
            taken[i] = d;
        }
    }
    console.log("All tests passed!");
}
