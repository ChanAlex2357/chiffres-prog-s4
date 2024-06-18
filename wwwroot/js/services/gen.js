let genButton = document.getElementById("genButton");
let solution = document.getElementById("operationSolution")

let targetNumber = 735;
let toolsNumbers = [77,69,16,6,14,9,25];
let operations = ["+","-","*","/"];


// Creation d'un individue qui est la combineaison deux chiffres et une operation
function generateIndividual(feed,individuals,pop){
    operations.forEach(operation => {
        individuals.forEach(ind=> {
            pop.push("("+feed+operation+ind+")");
        })
    });
}
/// Creation de la population qui est l'ensemble des combinaisons possibles
function generatePopulation(feeds){
    let pop = [];
    let individuals = Array.from(feeds);
    feeds.forEach(feed=>{
        generateIndividual( individuals.pop() , individuals , pop );
    })
    return pop;
}
function showSolution(operation){
    console.log("Proposition de solution");
    console.log(toolsNumbers);
    console.log(targetNumber);
    solution.textContent = operation;
}
function display_population(pop){
    let popList = document.getElementById("popList");
    popList.replaceChildren();
    pop.forEach(individue =>{
        let listNode = document.createElement('li');
        listNode.textContent = individue;
        popList.appendChild(listNode);
    })
}
genButton.addEventListener('click',(event) => {
    let operations = "X-X-X-X-X";
    let pop = generatePopulation(toolsNumbers);
    display_population(pop);
    showSolution(operations);
})

