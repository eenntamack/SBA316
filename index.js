let test = document.getElementsByTagName("main")[0]; // Get the first <main> element
let div = document.getElementById("questionBody");    // Get the first <div> element
let clockSound =document.getElementById("clockSound");
// Ensure both elements exist before adding an event listener
localStorage.setItem("points",0)
let questions = 0; 
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

function generateNumbers(){
    let numbers = []
    numbers.push(Math.floor(Math.random() * (23))) + 2
    numbers.push(Math.floor(Math.random() * (23))) + 2
    return numbers
}

//debugging to make sure number generator works
console.log(generateNumbers()[0] + " " + generateNumbers()[1])
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
                equation += " * "
                console.log("*\n")
            }else if(equationOrder[i] == "/"){
                answer /= number[chosenNumber]
                equation += " / "
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
let show = createEquation(generateNumbers(),3)

console.log(show.equation + " " + show.answer);
let num = 0;
let intervalStarted = false;
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    const questionBody = document.getElementById('questionBody');

    

    questionBody.addEventListener('click', function() {
        questionBody.classList.toggle('disappear');
        /*clockSound.autoplay = true;
        clockSound.loop = true;
        clockSound.play();*/
        
        if (!intervalStarted) {
            intervalStarted = true; // Start only one interval
            setInterval(function() {
                num += 1;
                questionBody.innerText = num;
                // Restart and play sound every second
            }, 1000);
        }
    });

    main.addEventListener('click',function(){
        let lvl = Math.floor(Math.random() * 3) + 2
        console.log("lvl : " + lvl);
        let d = document.createElement('div')
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
        
        main.appendChild(d);
        window.scrollTo({ top: d.offsetTop, behavior: 'smooth' });


        correct = g.answer
        
    })
});

