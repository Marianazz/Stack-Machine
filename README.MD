# Stack Machine

## Alunos : Amara Liz, João Guerini e Mariana Zorza

Simulador de uma máquina de pilha (*stack machine*) interativa, desenvolvido em JavaScript com Node.js. O programa recebe instruções via terminal, monta um programa e executa os cálculos usando uma pilha.

---

## O que é uma Stack Machine?

Uma *stack machine* é um modelo de computação que usa uma **pilha** como estrutura principal de dados. Em vez de usar variáveis nomeadas, os valores são empilhados e as operações consomem os valores do topo da pilha.

Exemplo: para calcular `5 + 3`, primeiro empilhamos o `5`, depois o `3`, e então executamos `add` — a máquina retira os dois valores, soma, e devolve o resultado `8` para a pilha.

---

## Como executar

**Requisitos:** Node.js instalado (versão 14 ou superior).

```bash
node machine.js
```

---

## Instruções disponíveis

| Instrução      | Descrição                                              |
|----------------|--------------------------------------------------------|
| `push <numero>`| Coloca um número no topo da pilha                      |
| `add`          | Remove os dois valores do topo e empilha a soma        |
| `sub`          | Remove os dois valores do topo e empilha a subtração   |
| `mul`          | Remove os dois valores do topo e empilha a multiplicação |
| `div`          | Remove os dois valores do topo e empilha a divisão     |
| `run`          | Executa todas as instruções digitadas e mostra o resultado |
| `reset`        | Limpa a pilha e o programa atual                       |
| `exit`         | Encerra o programa                                     |

---

## Exemplos de uso

**Calculando `(10 - 4) * 2`:**

```
push 10
push 4
sub
push 2
mul
run
```

Resultado: `12`

---

**Calculando `20 / 5`:**

```
push 20
push 5
div
run
```

Resultado: `4`

---

## Tratamento de erros

O programa detecta e reporta os seguintes erros, interrompendo a execução imediatamente:

- Valor não numérico passado para `push`
- Pilha com operandos insuficientes para uma operação
- Divisão por zero
- Instrução desconhecida

---

## Estrutura do código

```
machine.js
│
├── executePush(value)         — valida e empilha um número
├── executeOperation(op)       — executa add, sub, mul ou div com validação
├── executeInstruction(line)   — interpreta uma linha de instrução
└── rl.on("line", ...)         — loop principal de leitura do terminal
```

---
