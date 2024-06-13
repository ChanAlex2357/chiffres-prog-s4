gameApp.service('gameNumber',function(){
    this.getRandomIntegerInclusive = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    this.generateGolden = function(){
        return this.generateNumbers(1,1,1000)[0].value;
    }
    this.generateNumbers = function(isa,min,max){
        let list = [];
        for( let i = 0 ; i < isa ; i++ ){
            list.push( { value : this.getRandomIntegerInclusive(min,max) , used : false} );
        }
        return list;
    }
})