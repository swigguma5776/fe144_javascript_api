// CALLBACKS

// function greet(name, callback, callback2) {
//     const message = document.getElementById('greetMessage')
//     message.innerText = "Hello " + name;
//     callback(callback2)
// }

// function farewell(callback) {
//     const message = document.getElementById('farewellMessage')
//     message.innerText = "Goodbye";
//     callback()
// }

// function comeback() {
//     const anotherMessage = document.createElement('div')
//     anotherMessage.innerText = "Come back!" 
//     const div = document.getElementsByClassName('container')[0]
//     div.appendChild(anotherMessage); 
// }

// const button = document.getElementById('greetBtn')

// button.addEventListener('click', ()=> {
//     greet('Raymond', farewell, comeback);
// })

// CALLBACK HELL ^^^^




// PROMISES (NEW & BETTER FROM CALLBACKS)

// a new Promise object which will resolve
// const greetingPromise = new Promise(function(resolve, reject){
//     // setTimeout allows us to set a timer before something is performed
//     // takes in 2 arguments, 1st is function to perform, 2nd is time in milliseconds
//     setTimeout( ()=> resolve('Hello'), 3000)
// })


// const button = document.getElementById('greetBtn')

// button.addEventListener('click', ()=> {
//     //calling upon our Promise which won't run until promise is resolved
//     console.log('waiting...')
//     console.log(greetingPromise)
//     greetingPromise.then( (resolve)=>{
//         console.log('promise fulfilled!')
//         const message = document.getElementById('greetMessage')
//         message.innerText = resolve;
//     }).then(()=> {
//         const message = document.getElementById('farewellMessage')
//         message.innerText = "Goodbye";
//     }).catch((error)=>{
//         console.log('Greeting failed:', error)
//     })
// })



// ASYNC/AWAIT PROMISE FUNCTIONS. NEW IMPROVED WAY!!!


const button = document.getElementById('greetBtn')

button.addEventListener('click', async () => {
    console.log('waiting...')
    const greetingPromise = new Promise(function(resolve, reject){
        // setTimeout allows us to set a timer before something is performed
        // takes in 2 arguments, 1st is function to perform, 2nd is time in milliseconds
        setTimeout( ()=> resolve('Hello'), 3000)
        
    })
    
    const message = document.getElementById('greetMessage')
    message.innerText = await greetingPromise;
    console.log('promise fulfilled!')
    
    const farewell = document.getElementById('farewellMessage')
    setTimeout(()=> farewell.innerText = 'Goodbye', 3000);
    
})


//INTERVALS

// setInterval takes in 2 arguments, 1st is function, second is time in milliseconds
// setInterval(()=>{
//     const timeMessage = document.createElement('div')
//     const currentTime = new Date()
//     const timeString = currentTime.getHours() + ":" + 
//     currentTime.getMinutes() + ":" + currentTime.getSeconds()
    
//     timeMessage.innerText = "Current Time: " + timeString
//     const div = document.getElementsByClassName('container')[0]
//     div.appendChild(timeMessage); 
    
// },1000)









// API REQUESTS!!! FINALLY!!! THE MAGIC OF JS

//API is like the waiter/waitress/waitx at a restaurant
//They are the middle man between the data and the client


// REST stands for Representational State Transfer (Architecture of your API)
// Rules for making API request is HTTP Protocols (HyperText Transfer Protocol) then the S is just Secure

//API consists of 1-5 things
//1st: Endpoint/url (Required with REST APIs)
//2nd: Parameters (filters on whaat you are searching for in the server database)
//3rd: HTTP Request Methods (Required GET, POST, PUT, DELETE, PATCH*)
//4th: Headers (Optional but usually there), security/authentication/content-type
//5th: Body (Optional usually only associated with PUT/POST)

// we send data in the format of json (JavaScript Object Notation) // a dictionary

//POST REQUEST

async function postData(url="", data = {}) {
    // fetch is a built-in request function in JS
    //fetch takes in 1 - 2 arguments (url,{ method, header,  body })
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //turning our data into JSON format to send
    })
    // console.log(response)
    return await response.json(); //turning response into json to read
}

const userData = {
    name: 'Ye-Ol McBoatface',
    player: 'Ryan Rhoades',
    class: 'Rogue',
    race: 'Orc'
}

const url = 'https://httpbin.org/post'

async function callPostData(url, userData){
        console.log( await postData(url, userData))
}

callPostData(url, userData)

async function getTVData(query){
    
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}`)
    // console.log(response)
    return await response.json()
}

async function fetchData(event){
    event.preventDefault();
    const search = event.target.elements.show.value; //grabbing the show input from the form
    const result = await getTVData(search)
    console.log(result)
    displayShow(result)
    
    
}

async function displayShow(show) {
    const html = `<div class="card">
                    <img src="${show.image.original}" alt="${show.name}">
                        <div>
                            <h1>${show.name}</h1>
                            <p>Summary: </p>
                            ${show.summary}
                            <p>Rating: ${show.rating.average}</p>
                            <p>Genres: ${show.genres.join(", ")}</p>
                        <div>
                </div>`
                
    const div = document.getElementsByClassName('search-show')[0]
    
    div.insertAdjacentHTML('beforeend', html)
}



