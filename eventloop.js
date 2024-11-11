// console. log('0')
// setTimeout (function(){
//     console.log('1')
// })
// new Promise(function(res, rej) {
//     console.log('2')
//     res(3)
// }).then(function(val) {
//     console.log(val)
// }).then(function() {
//     console.log('then...1')
// })

// async function bdb() { 
//     console.log('async')
//     setTimeout(() => {
//         console.log('setTime async')
//     })
// }
// bdb()

// new Promise(function(res, rej) {
//     console.log('4')
//     res(5)
// }).then(function(val) {
//     console.log(val)
// }).then(function() {
//     console.log('then...1')
// })

// console.log('6')

/*
0 2 async 4 6 3 5 then...1 then...1 1 setTime async
*/

// setTimeout(function() {
//    console.log(9)
//    setTimeout(function() {
//       console.log(8)
//       setTimeout(function() {
//          console.log(7)
//          setTimeout(function() {
//             console.log(6)
//             setTimeout(function() {
//                console.log(5)
//             }, 1000)
//          }, 1000)
//       }, 1000)
//    }, 1000)
// }, 1000)

// setTimeout(() => {
//     console.log(1)
//     setTimeout(() => {
//         console.log(2)
//     }, 1000)
// }, 3000)


// var color1 = {name: 'kk', hex: {val: 'red'}}

// var color2 = {...color1}
// console.log(color2)

let a = 1;
let b = 2;

[b, a] = [a, b];

console.log(a, b); // 2 1

