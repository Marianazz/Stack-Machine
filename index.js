#!/usr/bin/env node
import readline from "node:readline";

const stack = [];
const programa = [];
let hasError = false;
function executePush(value) {
  const num = Number(value);
  if (isNaN(num)) {
    console.error(`Erro: "${value}" não é um número válido.`);
    hasError = true;
    return;
  }
  stack.push(num);
}

function executeOperation(op) {
  if (stack.length < 2) {
    console.error(
      `Erro: a pilha precisa de pelo menos 2 valores para '${op}' (tem ${stack.length}).`
    );
    hasError = true;
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  switch (op) {
    case "add": stack.push(b + a); break;
    case "sub": stack.push(b - a); break;
    case "mul": stack.push(b * a); break;
    case "div":
      if (a === 0) {
        console.error("Erro: divisão por zero!");
        hasError = true;
        return;
      }
      stack.push(b / a);
      break;
    case "mod":
      if (a === 0) {
        console.error("Erro: módulo por zero!");
        hasError = true;
        return;
      }
      stack.push(b % a);
      break;
  }
}

function executeNeg() {
  if (stack.length < 1) {
    console.error(`Erro: a pilha está vazia para "neg".`);
    hasError = true;
    return;
  }
  stack.push(-stack.pop());
}

function executeDup() {
  if (stack.length < 1) {
    console.error(`Erro: a pilha está vazia para "dup".`);
    hasError = true;
    return;
  }
  stack.push(stack[stack.length - 1]);
}

function executeSwap() {
  if (stack.length < 2) {
    console.error(`Erro: precisa de 2 valores para "swap" (tem ${stack.length}).`);
    hasError = true;
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  stack.push(a);
  stack.push(b);
}
function executeInstruction(line) {
  if (hasError) return;

  const parts = line.trim().split(/\s+/);
  const instruction = parts[0].toLowerCase();

  switch (instruction) {
    case "push":
      if (parts.length < 2) {
        console.error(`Erro: "push" requer um valor numérico.`);
        hasError = true;
        return;
      }
      executePush(parts[1]);
      break;

    case "add":
    case "sub":
    case "mul":
    case "div":
    case "mod":
      executeOperation(instruction);
      break;

    case "neg":
      executeNeg();
      break;

    case "dup":
      executeDup();
      break;

    case "swap":
      executeSwap();
      break;

    default:
      if (instruction) {
        console.error(`Erro: instrução desconhecida: "${instruction}"`);
        hasError = true;
      }
      break;
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("============================================================");
console.log("            Stack Machine — Digite instruções               ");
console.log("============================================================");
console.log("Instruções:");
console.log("  push <n>  — empilha o número n");
console.log("  add       — soma os 2 valores do topo");
console.log("  sub       — subtrai (segundo - topo)");
console.log("  mul       — multiplica os 2 do topo");
console.log("  div       — divide (segundo / topo)");
console.log("  mod       — resto da divisão (segundo % topo)");
console.log("  neg       — inverte o sinal do topo");
console.log("  dup       — duplica o valor do topo");
console.log("  swap      — troca os 2 valores do topo de posição");
console.log("Comandos:");
console.log('  run       — executa o programa e exibe o resultado');
console.log('  reset     — limpa pilha e programa');
console.log('  exit      — encerra');
console.log("------------------------------------------------------------");

function resetMachine() {
  stack.length = 0;
  programa.length = 0;
  hasError = false;
  console.log("Pilha e programa resetados.");
}

rl.on("line", (linha) => {
  const input = linha.trim();
  if (!input) return;

  const cmd = input.toLowerCase();

  switch (cmd) {
    case "exit":
      console.log("Encerrando. Até logo!");
      rl.close();
      return;

    case "reset":
      resetMachine();
      return;

    case "run": {
      if (programa.length === 0) {
        console.log("Nenhuma instrução para executar.");
        return;
      }

      stack.length = 0;
      hasError = false;

      for (const instrucao of programa) {
        executeInstruction(instrucao);
        if (hasError) break;
      }

      if (!hasError) {
        if (stack.length === 0) {
          console.log("\nPilha vazia ao final da execução.");
        } else {
          const resultado = stack[stack.length - 1];
          const fmt = Number.isInteger(resultado)
            ? resultado
            : parseFloat(resultado.toFixed(10));
          console.log(`\nResultado: ${fmt}`);

          if (stack.length > 1) {
            console.warn(
              `Aviso: ${stack.length - 1} valor(es) restante(s) na pilha. ` +
              `Provavelmente faltou alguma operação.`
            );
          }
        }
      }

      console.log("------------------------------------------------------------");
      programa.length = 0;
      stack.length = 0;
      hasError = false;
      console.log("Pronto para um novo programa.");
      return;
    }

    default:
      programa.push(input);
      console.log(`  [${programa.length}] ${input}`);
      break;
  }
});