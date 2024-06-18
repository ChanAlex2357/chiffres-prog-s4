let genButton = document.getElementById("genButton");
let solution = document.getElementById("operationSolution")

let targetNumber = 735;
let targetLimit = 1000;
let toolsNumbers = [77,69,16,6,14,9,25];
let operations = ["+","-","*","/"];

function calcDistance( ref , target ){
    return Number.parseInt(Math.abs( target - ref))
}
function calcDistanceFormString(ref_str,target){
    return calcDistance(eval(ref_str),target)
}
/// Extractions des nombres dans une operation
function extractNumbers(operation) {
    // Utilise une expression régulière pour trouver tous les nombres dans la chaîne
    const numbers = operation.match(/-?\d+(\.\d+)?/g);
    // Convertit les résultats de la recherche (qui sont des chaînes) en nombres absolus
    return numbers ? numbers.map(number => Math.abs(Number(number))) : [];
}
function filterOperations(operations, excludeNumbers) {
    return operations.filter(operation => {
        const numbersInOperation = extractNumbers(operation);
        // Vérifie si aucun des nombres dans l'opération n'est dans la liste des nombres à exclure
        if( calcDistanceFormString(operation,targetNumber) > targetLimit){
            return false;
        }
        let test = !numbersInOperation.some((number) => {
            return excludeNumbers.includes(number)
        });
        return test;
    });
}
// Fonction de selection naturelle
function fitnessPop(pop,targetNumber){
    pop.sort( (a,b) => {
        let dist1 = calcDistanceFormString(a,targetNumber);
        let dist2 = calcDistanceFormString(b,targetNumber);
        if( dist1 < dist2 ) {
            return -1;
        }
        if( dist1 > dist2 ) {
            return 1;
        }
        return 0;
    });
}
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
    while( individuals.length > 0 ){
        generateIndividual( individuals.pop() , individuals , pop );
    }
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
        listNode.textContent = individue+"  === " + calcDistanceFormString(individue,targetNumber) +" === "+extractNumbers(individue);
        popList.appendChild(listNode);
    })
}
function selection_naturel(pop){
    fitnessPop(pop,targetNumber);
    let new_pop = [pop[0]];
    let bestNumbers = extractNumbers(pop[0]);
    pop = filterOperations(pop,bestNumbers);
    return new_pop.concat(pop)
}
function mutation(pop){
    let muttet_pop = generatePopulation(pop)
    muttet_pop = selection_naturel(muttet_pop)
    return muttet_pop
}

genButton.addEventListener('click',(event) => {
    let operations = "X-X-X-X-X";
    console.log(extractNumbers("(9*77)-(6+25)"));
    let pop = generatePopulation(toolsNumbers);
    pop = selection_naturel(pop)
    pop = mutation(pop);

    display_population(pop);
})