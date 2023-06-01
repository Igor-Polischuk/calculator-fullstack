// function firstFunction(callback) {
//   console.log("Перша функція викликається.");

//   setTimeout(function () {
//     console.log("Виконується перший setTimeout.");
//     callback();
//   }, 2000);
// }

// function secondFunction() {
//   console.log("Друга функція викликається.");
// }

// firstFunction(function () {
//   console.log("Callback функція викликається.");
//   secondFunction();
// });

// ...........................................................

const firstFunction = new Promise((resolve, reject) => {
  console.log("Перша функція викликається.");

  setTimeout(function () {
    console.log("Виконується перший setTimeout.");
    resolve();
  }, 2000);
});

function secondFunction() {
  console.log("Друга функція викликається.");
}

// firstFunction.then(function () {
//   console.log("Callback функція викликається.");
//   secondFunction();
// });

async function test() {
  await firstFunction;
  console.log("Callback функція викликається.");
  secondFunction();
}

test();

// console.log(1);
// Promise.resolve("promise").then(console.log);
// console.log(2);

const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3]).then((results) => {
  console.log(results); // [10, 20, 30]
});

const pr1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise 1");
  }, 2000);
});

const pr2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Promise 2");
  }, 1000);
});

Promise.race([pr1, pr2]).then((result) => {
  console.log(result); // Promise 2
});
