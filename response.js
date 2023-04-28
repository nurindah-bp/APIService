// const response = (statusCode, data, message, res) => {
//     res.json(statusCode, [
//         {
//             payload: data,
//             message,
//             metadata: {
//                 prev: "",
//                 next: "",
//                 current: "",
//             },
//         },
//     ])
// }
const response = (statusCode, data, res) => {
    // res.json(statusCode, data)

    res.status(statusCode).json(data)
}

module.exports = response