let genButton = document.getElementById("genButton");
let solution = document.getElementById("operationSolution")

let targetNumber = 735;
let targetLimit = 1000;
let toolsNumbers = [77,69,16,11,14,9,6];
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
    try {
        const numbers = operation.match(/-?\d+(\.\d+)?/g);
        // Convertit les résultats de la recherche (qui sont des chaînes) en nombres absolus
        return numbers ? numbers.map(number => Math.abs(Number(number))) : [];
    } catch (error) {
        return operation
    }
}
function filterOperations(operations, excludeNumbers) {
    return operations.filter(operation => {
        const numbersInOperation  = extractNumbers(operation);
        // Vérifie si aucun des nombres dans l'opération n'est dans la liste des nombres à exclure
        if( calcDistanceFormString(operation,targetNumber) > targetLimit){
            return false;
        }
        let test ;
        try {
            test = !numbersInOperation.some((number) => {
                return excludeNumbers.includes(number)
            });
        } catch (error) {
            test = !excludeNumbers.includes(numbersInOperation)
        }
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
        generateIndividual( individuals.shift() , individuals , pop );
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
        // listNode.textContent = individue;
        popList.appendChild(listNode);
    })
}
function selection_naturel(pop,targetNumber,origins){
    fitnessPop(pop,targetNumber);
    let new_pop = [];
    let bestOperation = pop[0]
    let bestNumbers = extractNumbers(bestOperation);
    // pop = filterOperations(pop,bestNumbers);
    origins = filterOperations(origins,bestNumbers);
    // new_pop = [bestOperation].concat(pop).concat(origins)
    new_pop = [bestOperation].concat(origins)
    fitnessPop(new_pop,targetNumber);
    return new_pop
}
function mutation(pop,targetNumber,origins){
    let muttet_pop= [] ;
    generateIndividual( pop.shift() , pop , muttet_pop );
    muttet_pop = selection_naturel(muttet_pop,targetNumber,origins)
    return muttet_pop
}

function findBestCombinaison(toolsNumbers,targetNumber){
    let pop = generatePopulation(toolsNumbers);
    pop = selection_naturel(pop,targetNumber,toolsNumbers)

    let bestCombinaison;
    let best_distance = targetNumber;
    let current_distance = calcDistanceFormString(pop[0],targetNumber);
    while( current_distance < best_distance){
        best_distance = current_distance;
        bestCombinaison = pop[0];
        pop = mutation(pop,targetNumber,toolsNumbers);
        current_distance = calcDistanceFormString(pop[0],targetNumber)
        if(current_distance < 1 && current_distance > 0){
            current_distance = 1;
        }
    }
    return bestCombinaison;

}

genButton.addEventListener('click',(event) => {
    let operations = findBestCombinaison(toolsNumbers,targetNumber)
    showSolution(operations);
})