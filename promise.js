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
