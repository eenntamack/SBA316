
let test = document.getElementsByTagName("main")[0]; // Get the first <main> element
let div = document.getElementById("questionBody");    // Get the first <div> element

/**
 * 
 * Sounds/Music used below and setting their volume/ loop param when appropriate
 */
let clockSound =document.getElementById("clockSound");
clockSound.loop = true;
clockSound.volume = 0.5
let right =document.getElementById("correct");
right.volume = 0.4
let music =document.getElementById("music");
music.volume = 0.4
music.loop = true;
let wrong =document.getElementById("error");
wrong.volume = 0.4

// Set users point through the window's localStorage
let points = 0;
localStorage.setItem("points",points)//

//array to store the game state
let els = [];

//Below I couldnt make an equation with *,÷ and  +,- 
//b/c I would have to calculate using pemdas which would be difficult


//Here I randomized which symbols should return a + or - sign
function customSymbolElementary(){
 let symbol = (Math.floor(Math.random() * 2))
 let sign = ''
 switch(symbol){
    case 0:
        sign = "+"
        break;
    case 1:
        sign = "-"
        break;
    default:
        break;
 }
 return sign
}

//Here I randomized which symbols should return a + or - sign
function customSymbolMulti(){
    let symbol = (Math.floor(Math.random() * 2))
    let sign = ''
    switch(symbol){
       case 0:
           sign = "*"
           break
       case 1:
           sign = "/"
           break
       default:
           break
    }
    return sign
}

//Here I chose 2 random numbers to place in the equation
function generateNumbers(){
    let numbers = []
    numbers.push(Math.floor(Math.random() * (23))+2)
    numbers.push(Math.floor(Math.random() * (23))+2) 
    return numbers
}

//logging number generator for debugging
console.log(generateNumbers()[0] + " " + generateNumbers()[1])

//here both number Generator function and level will be used in this funtion to store 
//the equation as a string and the answer after doing the calculation in key value pairs
function createEquation(number,level){
    let displayEquation = {}
    let equationOrder = []
    let solvable = true;
    let equation = ""
    let answer = 0;

    
    let difficulty = Math.floor(Math.random() * 10)
    if(difficulty < 7){
        for (let i =0; i < level; i++){
            let sym = customSymbolElementary();
            equationOrder.push(sym);
        }

    }else{
        for (let i =0; i < level; i++){
            let sym = customSymbolMulti();
            equationOrder.push(sym);
        }
    }
    
    console.log(equationOrder+"\n")
    for(let i = 0; i < equationOrder.length; i++){
        let chosenNumber = Math.floor(Math.random() * 10)%2
        if(i == 0){
            answer = number[chosenNumber];
            equation += number[chosenNumber];
        }else{
            if(equationOrder[i] == "+"){
                answer += number[chosenNumber]
                equation += " + "
                console.log("+\n")
            }else if(equationOrder[i] == "-"){
                answer -= number[chosenNumber]
                equation += " - "
                console.log("-\n")
            }else if(equationOrder[i] == "*"){
                answer *= number[chosenNumber]
                equation += " x "
                console.log("*\n")
            }else if(equationOrder[i] == "/"){
                answer /= number[chosenNumber]
                equation += " ÷ "
                console.log("/\n")
            }
            equation += number[chosenNumber]
        }
        if(i == equationOrder.length - 1){
                equation += " = ?"
        }
    }
        displayEquation.equation = equation;
        displayEquation.answer = Math.round(answer);
        displayEquation.canSolve = solvable
        return displayEquation;
}

//for debugging, showing the equation output
let show = createEquation(generateNumbers(),3)
console.log(show.equation + " " + show.answer);


/**
 * 
 * here I handle state change, when user goes from intro-> play state -> end screen
 */
let num = 0;
let intervalStarted = false;
let correct = 0;

//Here all the array of templates(template) and the state (n) will be used as an argument
//Here it will chose what to and not to display
function stateChange(template,n){

    template.forEach(function (el) {
        el.style.display = "none"; // Hide each element

    });

    if(n == 2){
        //here before going into the end screen
        //I had to print to show the player their points 
        timer.style.display="none"
        let score = localStorage.getItem("points");
        let h1 = document.createElement("h1")
        h1.style.color ="white"
        h1.innerText = `Your score: ${score}`
        template[n].style.display ="block"
        template[n].style.flexDirection ="column"
        template[n].style.backgroundColor ="transparent"
        template[n].appendChild(h1);

    }else{
        //displays the state
        template[n].style.display ="block"
        template[n].style.backgroundColor ="transparent"
    }

}

//Below is the main body of the game
function mainGame(initial){
    let d;
    const main = document.querySelector('main');
    const body = document.body;
    const timer = document.getElementById('timer');
    
    const form = document.querySelector('form'); 
    let intervalStarted = false;
    let num = 0;
    let darken = 0;
      
    //Below a timer is made using setInterval to count up the numbers, 
    //change the background color
    //and set a point when the timer flashes when time is running out


    if (!intervalStarted) {
        intervalStarted = true; // Start only one interval
        let showScore = true;
        let time =
        
        function() {
            timer.innerText = num;

            //timer gradually goes red as timer runs out and background darkens
            timer.style.backgroundColor = `rgb(${(4 * num)}, ${255 - (num * 4)}, ${30 - ((num/2))})`;
            document.getElementsByTagName("body")[0].style.backgroundColor = `rgb(${255 - darken},${255 - darken},${255 - darken})`;
    
            //count timer up
            if(num < 60){
                num ++;
            }else{
                if(showScore == true){
                    stateChange(els,2)
                    showScore = false
                }
            }

            if (num > 40 && num < 60){
                timer.classList.toggle('disappear');
                darken += 10;
                clockSound.play();
            }else{
                clockSound.pause();
            }
        }
        let start = setInterval(time,1000);

        setInterval(function(){
            if(num > 60){
                clearInterval(start);
            }
        },1000);
    }
    

    //added timer to body
    body.appendChild(timer)
    let input = document.getElementById("userInput")

    //Here i set the lvl for the level parameter in createEquation function
    let lvl = Math.floor(Math.random() * 3) + 2

    //here enabled the first question to appear, otherwise the only way for a 
    //question to appear is for the player to press submit
    if(initial){
        initial = false;
        //debugging 
        console.log("lvl : " + lvl);
                    d = document.createElement('div')
                    let g = createEquation(generateNumbers(),lvl)
                    d.innerHTML = g.equation
                    console.log(d.innerHTML);
                    //depending on the difficulty of the question the background will change colors
                    switch(lvl){
                        case 2:
                            d.style.backgroundColor = "rgb(0, 255, 30)";
                            break;
                        case 3:
                            d.style.backgroundColor = "rgb(122, 212, 4)";
                            break;
                        case 4:
                            d.style.backgroundColor = "rgb(208, 212, 4)";
                            break;
                        case 5:
                            d.style.backgroundColor = "rgb(212, 101, 4)";
                            break;
                        default:
                            d.style.backgroundColor = "rgb(255, 30, 0)";
                            break;

                    }
                    
                    //Here every question is added to the main element
                    //offSet class is just for interactivity when the user hovers
                    d.classList.add("offsetTop");
                    d.style.borderStyle ="solid"
                    d.style.borderColor = "black";
                    d.style.borderWidth = "15px";
                    
                    main.appendChild(d);

                    //here when a new question appears, the screen scrolls to 
                    //where the new question has been added
                    window.scrollTo({ top: d.offsetTop, behavior: 'smooth' });

                    correct = g.answer
                    //debugging to work with correct and  wrong answers
                    console.log("answer is: " + correct)

                    //Here if the main element has more than 5 elements , it removes the last child
                    //maintaining 5 elements
                    if(main.childNodes.length > 5){
                        main.removeChild(main.firstChild);
                        window.scrollTo({ top: main.lastChild.offsetTop, behavior: 'smooth' });
                    }  
                    console.log("children: "+(main.childNodes.length-1))

    }  
        form.addEventListener('submit',function(event){

            //same functionality as earlier except for when a player presses submit
            event.preventDefault();
            lvl = Math.floor(Math.random() * 3) + 2
            
            
            //here we get user's input, trim the whitespace and parse to an Integer
            letuserValue = input.value
            letuserValue.trim()
            letuserValue = parseInt(letuserValue);
            console.log("user input: " + letuserValue);

            //Here checks if type of user input is a number
            //Other wise nothing happens(console.logs NOT A NUMBER)
            if(typeof(letuserValue)=="number"){ 
                if(isNaN(letuserValue)){
                    console.log("NOT A NUMBER")
                }else{
                    //here checks if user input matches correct answer
                    //then a correct sound will play
                    //the user gets some points in the local storage
                    // and a new question is added

                    //Otherwise incorrect buzzer plays
                    if(letuserValue !== correct){
                        wrong.play()
                        console.log("incorrect");
                    }else if(letuserValue === correct){
                        right.play()
                        localStorage.setItem("points",points = points + lvl)
                        console.log("correct")
                    
                        console.log("lvl : " + lvl);
                        d = document.createElement('div')
                        let g = createEquation(generateNumbers(),lvl)
                        d.innerHTML = g.equation
                        console.log(d.innerHTML);

                        switch(lvl){
                            case 2:
                                d.style.backgroundColor = "rgb(0, 255, 30)";
                                break;
                            case 3:
                                d.style.backgroundColor = "rgb(122, 212, 4)";
                                break;
                            case 4:
                                d.style.backgroundColor = "rgb(208, 212, 4)";
                                break;
                            case 5:
                                d.style.backgroundColor = "rgb(212, 101, 4)";
                                break;
                            default:
                                d.style.backgroundColor = "rgb(255, 30, 0)";
                                break;

                        }

                        d.classList.add("offsetTop");
                        d.style.borderStyle ="solid"
                        d.style.borderColor = "black";
                        d.style.borderWidth = "15px";
                        
                        main.appendChild(d);
                        window.scrollTo({ top: d.offsetTop, behavior: 'smooth' });

                        correct = g.answer
                        console.log("answer is: " + correct)

                        if(main.childNodes.length >5){
                            main.removeChild(main.firstChild);
                            window.scrollTo({ top: main.lastChild.offsetTop, behavior: 'smooth' });
                        }  
                        console.log("children: "+ (main.childNodes.length - 1))

                        input.value=""
                    }
                }   
            }
        
        })
    }

document.addEventListener('DOMContentLoaded', function() {
    //here is where the states are managed a and cloned to add to the body
    let state = 0;

    let templates = document.querySelectorAll("template");
    
    // Clone the templates and wrap them in divs
    for (let x = 0; x < templates.length; x++) {
        let div = document.createElement("div");
        let cloneEl = templates[x].content.cloneNode(true);
        div.appendChild(cloneEl);
        els.push(div);
    }
    
    // Append the cloned elements to the body and initially hide them
    els.forEach(function (el) {
        el.style.display = "none";  // Hide all elements initially
        document.body.appendChild(el);  // Add the elements to the body
    });
    stateChange(els,state)
    let initial = true
    document.body.addEventListener("click",function(){
        if(state == 0){
            //Intro screen and music plays
            state = 1
            stateChange(els,state);
            mainGame(initial);
            music.play()
        }
    })

        //debugging to make sure templates are in proper index 
        console.log(document.querySelectorAll("template")[0])
        console.log(document.querySelectorAll("template")[1])
        console.log(document.querySelectorAll("template")[2])
});



