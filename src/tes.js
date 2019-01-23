"use strict";

class JSON {

}

var scheme = {
    a: String,
    b: {
        date: String
    },
    c: JSON
}

Object.keys(scheme).forEach(key => {
    try {
        console.log(scheme[key].name);
    } catch (e) {
        console.log(e)
    }
});