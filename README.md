# Algoritmo CYK
Implementação do algoritmo de análise Cocke-Younger-Kasami em JavaScript

## Como rodar?
Clone o repositório:
```bash
$ git clone https://github.com/evertonandrade/algoritmo-cyk.git
```
Acesse o diretório e em seguinda abra o `index.html` em qualquer browser.  

### Melhor Opção
Acesse a aplicação em **[algoritmocyk.netlify.app](https://algoritmocyk.netlify.app/)**  
<img src="/assets/screenshots/site.png" />

## Objetivo

Desenvolver um programa para processamento de Gramáticas Livres do Contexto (GLCs). Dada a especificação de uma GLC *G* na Forma Normal de Chomsky e uma cadeia *w* ∈ Σ∗, seu programa deve determinar se *G* gera *w*, e devolver a matriz *Tabela* (vide descrição do algoritmo) e o status (aceita / rejeita). Em outras palavras, o problema é decidir se *w*  pertence a *L(G)*.

## Sobre a solução

A solução implementa o algoritmo CYK (Cocke–Younger–Kasami), descrito da seguinte forma:

```
D = "On input w = w_1 ... w_n:
1.  If w = & and S -> & is a rule, accept 
2.  For i = 1 to n:
3.    For each variable A:
4.      Test whether A -> b is a rule, where b = w_i
5.      If so, place A in table(i, i).
6.  For l = 2 to n:
7.    For i = 1 to n - l + 1
8.      Let j = i + l - 1,
9.      For k = i to j - 1:
10.       For each rule A -> BC:
11.         If table(i, k) contains B and table(k + 1, j) contains C 
12.             put A in table(i, j)
13. If S is in table(1, n), accept. Otherwise, reject." 
```

---

<p align="center">
Made with ♥ by <a href="http://everton.github.io">Everton</a>
</p>
