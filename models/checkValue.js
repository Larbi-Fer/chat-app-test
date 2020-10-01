module.exports.checkVal = (val) => {

    var errors = []
    var x = 0

    function check(c = val, str = "") {
        if (c.notEmpty) {
            //not empty     غير فارغة
            if (typeof c.notEmpty.value != undefined) {
                // not empty
                if (c.notEmpty.value === "") {
                    if (typeof c.notEmpty.msg != undefined)
                        errors[x] = c.notEmpty.msg
                    else errors[x] = "value is Empty"
                    x++
                }
            }
        }

        if (c.isEmpty) {
            //not empty     غير فارغة
            if (typeof c.notEmpty.value != undefined) {
                // not empty
                if (c.notEmpty.value !== "") {
                    if (typeof c.notEmpty.msg != undefined)
                        errors[x] = c.notEmpty.msg
                    else errors[x] = "value is not Empty"
                    x++
                }
            }
        }

        // custum   التحقق من قيمتين
        if (c.custum) {
            if (str == "") {
                if (typeof c.custum.value1 != undefined && typeof c.custum.value2 != undefined) {

                    if (c.custum.value1 !== c.custum.value2) {
                        if (typeof c.custum.msg != undefined)
                            errors[x] = c.custum.msg
                        else errors[x] = c.custum.value1 + " != " + c.custum.value2
                        x++
                    }
                }
            } else {
                if (typeof str != undefined && typeof c.custum.value2 != undefined) {

                    if (str !== c.custum.value) {
                        if (typeof c.custum.msg != undefined)
                            errors[x] = c.custum.msg
                        else errors[x] = str + " != " + c.custum.value
                        x++
                    }
                }
            }
        }

        // max
        if (c.max) {
            if (typeof c.max.value != undefined) {
                if (str == "") {
                    if (c.max.value.length > c.max.max) {
                        if (typeof c.max.msg != undefined)
                            errors[x] = c.max.msg
                        else errors[x] = "max value is " + c.max.max
                        x++
                    }
                } else {
                    if (str.length > c.max.max) {

                        if (typeof c.max.msg != undefined)
                            errors[x] = c.max.msg
                        else errors[x] = "max value is " + c.max.max
                        x++
                    }
                }
            }
        }

        // min
        if (c.min) {
            if (typeof c.min.value != undefined) {
                if (str == "") {
                    if (c.min.value.length < c.min.min) {

                        if (typeof c.min.msg != undefined)
                            errors[x] = c.min.msg
                        else errors[x] = "min value is " + c.min.min
                        x++
                    }
                } else {
                    if (str.length < c.min.min) {

                        if (typeof c.min.msg != undefined)
                            errors[x] = c.min.msg
                        else errors[x] = "min value is " + c.min.min
                        x++
                    }
                }
            }
        }

    }

    if (typeof val.v != undefined)
        check(val.v[1], val.v[0])
    check()

    return errors
}

exports.ArrayToString = (array, c) => {
    var str = ""
    for (let x = 0; x < array.length; x++) {
        const element = array[x];
        str += element + c
    }
    return str
}

/*declare namespace this.checkVal{

}*/
//Test


/*checkVal({
    v1: "1"
})*/
/* checkVal([
    ["Test", "notEmpty", "Test is Empty"]
    ["f123", ["notEmpty", "email"]]
]) */

/*let c = checkVal({
    max: {
        value: "123456799999898",
        max: 9,
        msg: "max value is 9  !!!"
    },
    min: {
        value: "123",
        min: 5,
        msg: "min value is 5  !!!"
    },
    custum: {
        value1: "t",
        value2: "t",
        msg: "t != t"
    },
    notEmpty: {
        value: "",
        msg: "value is empty"
    },
    v: ["value", {
        max: {
            max: 9,
            msg: "max is 9"
        }
    }]
})*/

/* let c = checkVal({
    v: [
        "valuedcsd",
        {
            max: {
                max: 5,
                msg: "max"
            },
            custum: {
                value: "value",
                msg: "custum"
            }
        }
    ],
    custum: {
        value1: "vvv",
        value2: "vvv2",
        msg: "custum Normal"
    }
})

console.log(c) */