module.exports = function check(str, bracketsConfig) {

  let bracketCounter = {};
  let equalCounter = {};

  const bracketTypes = bracketsConfig.filter(val => val[0] !== val[1])
    .reduce((next, prev) => {
      return next.concat(prev);
    }, [])

  const eqBracketsTypes = bracketsConfig.filter(val => val[0] === val[1])
    .reduce((next, prev) => {
      return next.concat(prev);
    }, []);

  bracketTypes.forEach( (val, ind) => {
    if(!(ind % 2)) bracketCounter[val] = 0;
  });

  if (eqBracketsTypes.length){
      eqBracketsTypes.forEach( (val, ind) => {
      if(!(ind % 2)) equalCounter[val] = 0;
    });
  }

  for(let i = 0; i < str.length; i++){
    const bracket = str[i];
    const index = bracketTypes.findIndex(val => val === bracket);
	  const prevIndex = bracketTypes.findIndex(val => val === str[i - 1]);

    if(index >= 0) {
      if (i === 0) {
        if( !(index % 2) ) {
          bracketCounter[bracket]++;
        } else {
          return false;
        }
      } else {
        if(index % 2) {
          if(!(prevIndex % 2) && prevIndex !== index - 1) {
            return false;
          }

          bracketCounter[bracketTypes[index-1]]--;

          if(bracketCounter[bracketTypes[index-1]] < 0) return false;

        } else {
          bracketCounter[bracket]++;
        }
      }
    } else {
		 if (equalCounter[bracket] % 2) {
      if(prevIndex >= 0 && !(prevIndex % 2)) {
        return false;
      }

      if(str[i] !== str[i - 1] && equalCounter[str[i - 1]]) {
        if(equalCounter[str[i - 1]] % 2 ) return false;
      }

		 equalCounter[bracket]++;

      } else {
		   equalCounter[bracket]++;
		  }
    }
  }

  const allEven = Object.keys(equalCounter).every(val => !(bracketCounter[val] % 2)) ? true : false;
  const allSquare = Object.keys(bracketCounter).every(val => bracketCounter[val] === 0) ? true : false;

  return (allEven && allSquare);
}
