const grammar = document.querySelector('#grammar');
const sentence = document.querySelector('#sentence');
const button = document.querySelector('.btn-parser');
const containerResult = document.querySelector('.terminal');

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
        for (let r in rules) {
          rules[r].forEach(e => {
            if (e.length === 2) {
              let X = r;
              let Y = e[0];
              let Z = e[1];
              if (T[i][k].has(Y) && T[k + 1][j].has(Z)) T[i][j].add(X);
            }
          });
        }
      }
    }
  }
  return T[0][n - 1].has(initialSymbol);
}

button.addEventListener('click', () => {
  const rules = defineRules(grammar);
  const w = sentence.value;
  const accept = cykParser(w, rules, 'S');
  containerResult.innerHTML = `
    <span class="indicator">[user@Web]$</span> 
    ./cyk_parser <br>
    ${accept} <br>
    <span class="indicator">[user@Web]$</span>
  `;
});
