// console.log("first")

// async function getTIme()
// {await setTimeout(() => {
//    console.log("second");
// }, 2000)
// };






// console.log("third")




// async function printMe() {
//     console.log("First")
//     await new Promise (resolve => {setTimeout(() => {
//       console.log("Async!!!")
//       resolve()
//     }, 3000)})

    
//     console.log("Last")
//   }
  
//   printMe();


// const asyncTask =  () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject('done');
//       }, 1000);
//     });
//   }
  
//   const foo = async () => {
//     try{
//     const res = await asyncTask();
//     console.log(res);
//     }catch (err) {
//         console.log(err);
//       };

//   }
  

//   foo();
//   console.log('After Foo Call');
  
//   console.log('Before Foo Call');
  
// async function runProcess() {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   runProcess();
//   console.log("DONE");
  