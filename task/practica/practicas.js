function esValidoParentesis(cadena) {
    let cont = 0;
    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] === '(') {
            cont++;
        }
        else if (cadena[i] === ')') {
            cont--;
        }
        //If comprobar salida
        if (cont < 0) {
            return false;
        }
    }
    return cont === 0;
}

console.log(esValidoParentesis("(())"));  // true
console.log(esValidoParentesis("((())")); // false
console.log(esValidoParentesis(")("));    // false


function parentesisValido (str){
    let cont = 0
    
    for ( let i=0; i<str.length ; i++){
        if (cont.char === '('){
            return cont++
        }else if (cont.char=== ')'){
            return cont--
        }
        if(i<cont){
            return true
        }
        
    }
    return false
}



const parentesis = ((stringParentesis) =>  
    stringParentesis.split("").reduce((acumulador, elemento) =>
        acumulador < 0 ? -1 :
            elemento === "(" ? acumulador + 1 :
                elemento === ")" ? acumulador - 1 :
                    acumulador
        , 0) === 0);

        