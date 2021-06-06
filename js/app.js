const grammar = document.querySelector('#grammar');
const sentence = document.querySelector('#sentence');
const button = document.querySelector('.btn-parser');
const containerResult = document.querySelector('.container-result');

function defineRules(grammar) {
  let arrGrammar = grammar.value.trim().split('\n');
  let rules = {};
  arrGrammar.forEach(element => {
    let nonTerminal = element.split('->')[0].trim();
    let production = element
      .split('->')[1]
      .split('|')
      .map(s => s.trim());
    rules[nonTerminal] = production;
  });
  return rules;
}

function createMatrix(n) {
  let m = [];
  for (let i = 0; i < n; i++) {
    m[i] = [];
    for (let j = 0; j < n; j++) {
      m[i][j] = new Set();
    }
  }
  return m;
}

function cykParser(sentence, rules, initialSymbol) {
  let n = sentence.length;
  let T = createMatrix(n);

  if (
    (sentence === '' || sentence === 'ε') &&
    rules[initialSymbol].includes('ε')
  ) {
    return true;
  }

  // examina substrings de tamanho 1
  for (let i = 0; i < n; i++) {
    for (let r in rules) {
      if (rules[r].includes(sentence[i])) {
        T[i][i].add(r);
      }
    }
  }

  for (let l = 1; l < n + 1; l++) {
    for (let i = 0; i < n - l + 1; i++) {
      let j = i + l - 1;
      for (let k = i; k < j; k++) {
        //console.log(`(${i}, ${k})  (${k + 1}, ${j}) - (${i} - ${j})`);
        //T[i][j].add('&');
        for (let r in rules) {
          let v1 = T[i][k]
          let v2 = T[k+1][j]
          
          if(rules[r].includes('qqq')) T[i][j].add(r)
  
        }
      }
    }
  }

  console.log(T);
  return T[0][n - 1].has(initialSymbol);
}

button.addEventListener('click', () => {
  const rules = defineRules(grammar);
  console.log(rules);
  const w = sentence.value;
  const accept = cykParser(w, rules, 'S');
  containerResult.innerHTML = '';
  const result = document.createElement('p');
  if (accept) {
    result.classList.add('accept');
    result.innerText = 'A cadeia é reconhecida!';
  } else {
    result.classList.add('reject');
    result.innerText = 'A cadeia não é reconhecida!';
  }
  containerResult.appendChild(result);
});
