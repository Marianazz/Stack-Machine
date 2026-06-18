## Para usar :  

```bash
npx github:Marianazz/Stack-Machine
```

# Stack Machine

## Alunos : Amara Liz, João Guerini e Mariana Zorzi

### Simulador de uma *stack machine*


**Para executar Requer:** Node.js instalado (versão 14 ou superior).

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

## Estrutura do código

```
index.js
│
├── executePush(value)         — valida e empilha um número
├── executeOperation(op)       — executa add, sub, mul ou div com validação
├── executeInstruction(line)   — interpreta uma linha de instrução
└── rl.on("line", ...)         — loop principal de leitura do terminal
```

---
