gameApp.service('genetic' , function(){
    let operations = ['+','-','*','/'];
    this.calcDistance = function ( ref , target ){
        return Number.parseInt(Math.abs( target - ref));
    };
    this.calcDistanceFormString = function (ref_str,target){
        console.log(ref_str+"  --- "+target);
        let result = this.calcDistance(eval(ref_str),target);
        return result;
    };
    /// Extractions des nombres dans une operation
    this.extractNumbers = function (operation) {
        // Utilise une expression régulière pour trouver tous les nombres dans la chaîne
        try {
            const numbers = operation.match(/-?\d+(\.\d+)?/g);
            // Convertit les résultats de la recherche (qui sont des chaînes) en nombres absolus
            return numbers ? numbers.map(number => Math.abs(Number(number))) : [];
        } catch (error) {
            return operation
        }
    };
    this.filterOperations = function (operations, excludeNumbers,targetNumber) {
        return operations.filter(operation => {
            const numbersInOperation  = this.extractNumbers(operation);
            // Vérifie si aucun des nombres dans l'opération n'est dans la liste des nombres à exclure
            if( this.calcDistanceFormString(operation,targetNumber) > 1000){
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
    this.fitnessPop = function (pop,targetNumber){
        pop.sort( (a,b) => {
            let dist1 = this.calcDistanceFormString(a,targetNumber);
            let dist2 = this.calcDistanceFormString(b,targetNumber);
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
    this.generateIndividual = function (feed,individuals,pop){
        operations.forEach(operation => {
            individuals.forEach(ind=> {
                pop.push("("+feed+operation+ind+")");
            })
        });
    }
    /// Creation de la population qui est l'ensemble des combinaisons possibles
    this.generatePopulation = function (feeds){
        let pop = [];
        let individuals = Array.from(feeds);
        while( individuals.length > 0 ){
            this.generateIndividual( individuals.shift() , individuals , pop );
        }
        return pop;
    }
    // Selection naturel 
    this.selection_naturel = function (pop,targetNumber,origins){
        this.fitnessPop(pop,targetNumber);
        let new_pop = [];
        let bestOperation = pop[0]
        let bestNumbers = this.extractNumbers(bestOperation);
        origins = this.filterOperations(origins,bestNumbers,targetNumber);
        new_pop = [bestOperation].concat(origins)
        this.fitnessPop(new_pop,targetNumber);
        return new_pop
    }
    this.selection_naturel = function (pop,targetNumber,origins){
        this.fitnessPop(pop,targetNumber);
        let new_pop = [];
        let bestOperation = pop[0]
        let bestNumbers = this.extractNumbers(bestOperation);
        pop = this.filterOperations(pop,bestNumbers,targetNumber);
        new_pop = [bestOperation].concat(pop).concat(origins)
        this.fitnessPop(new_pop,targetNumber);
        return new_pop
    }
    this.mutation = function (pop,targetNumber,origins){
        let muttet_pop= [] ;
        this.generateIndividual( pop.shift() , pop , muttet_pop );
        muttet_pop = this.selection_naturel(muttet_pop,targetNumber,origins)
        return muttet_pop
    }

    this.findBestCombinaison = function (toolsNumbers,targetNumber){
        let pop = this.generatePopulation(toolsNumbers);
        pop = this.selection_naturel(pop,targetNumber,toolsNumbers)
        console.log(pop);
        let bestCombinaison;
        let best_distance = targetNumber;
        let current_distance = this.calcDistanceFormString(pop[0],targetNumber);
        while( current_distance < best_distance){
            best_distance = current_distance;
            bestCombinaison = pop[0];
            pop = this.mutation(pop,targetNumber,toolsNumbers);
            console.log(pop);
            current_distance = this.calcDistanceFormString(pop[0],targetNumber)
            if(current_distance < 1 && current_distance > 0){
                current_distance = 1;
            }
        }
        return bestCombinaison;
    }
})