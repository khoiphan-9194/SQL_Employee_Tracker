async function myDisplay() {
    try{
    const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
    const json = await res.json();
    console.log(json.joke);
    } catch (error) {
        console.log('Something went wrong!');
        
      }
  }
  

  async function init() {
    await myDisplay();
    console.log('Finished fetching data');
  }

// myDisplay();
// console.log('Finished fetching data');
  

  init();