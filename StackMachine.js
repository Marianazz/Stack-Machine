import readline from "node:readline";

const stack = [];
const programa = [];
let hasError = false;

function executePush(value) {
  const num = Number(value);
  if (isNaN(num)) {
    console.error(`Erro: Valor "${value}" não é um número válido.`);
    hasError = true;
    return;
  }
  stack.push(num);
}

function executeOperation(operation) {
  if (stack.length < 2) {
    console.error(`Erro: A pilha não tem operandos suficientes para a operação '${operation}'.`);
    hasError = true;
    return;
  }
  const a = stack.pop();
  const b = stack.pop();

  switch (operation) {
    case "add":
      stack.push(b + a);
      break;
    case "sub":
      stack.push(b - a);
      break;
    case "mul":
      stack.push(b * a);
      break;
    case "div":
      if (a === 0) {
        console.error("Erro: Divisão por zero!");
        hasError = true;
        return;
      }
      stack.push(b / a);
      break;
  }
}

function executeInstruction(line) {
  const parts = line.trim().split(/\s+/);
  const instruction = parts[0].toLowerCase();

  if (hasError) return;

  switch (instruction) {
    case "push":
      if (parts.length < 2) {
        console.error("Erro: Instrução 'push' requer um valor.");
        hasError = true;
        return;
      }
      executePush(parts[1]);
      break;
    case "add":
    case "sub":
    case "mul":
    case "div":
      executeOperation(instruction);
      break;
    default:
      if (instruction) {
        console.error(`Erro: Instrução desconhecida: "${instruction}"`);
        hasError = true;
      }
      break;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("============================================");
console.log("       Stack Machine — Digite instruçoes    ");
console.log("============================================");
console.log("Instruções: push <numero> | add | sub | mul | div");
console.log('Digite "run" para executar e ver o resutado');
console.log('Digite "reset" para limpar a pilha');
console.log('Digite "exit" para sair');
console.log("--------------------------------------------");

function resetMachine() {
  stack.length = 0;
  programa.length = 0;
  hasError = false;
  console.log("Pilha e programa resetados.");
}

rl.on("line", (linha) => {
  const input = linha.trim().toLowerCase();

  switch (input) {
    case "exit":
      console.log("Encerrando. Até logo!");
      rl.close();
      break;
    case "reset":
      resetMachine();
      break;
    case "run":
      if (programa.length === 0) {
        console.log("Nenhuma instrução para executar.");
        return;
      }

      stack.length = 0;
      hasError = false;

      for (const instrucao of programa) {
        executeInstruction(instrucao);
        if (hasError) {
          break; 
        }
      }

      if (!hasError) {
        const resultado = stack.pop() ?? "Pilha vazia";
        console.log(`\nResultado: ${resultado}`);
      }
      
      console.log("--------------------------------------------");
      programa.length = 0;
      stack.length = 0;
      console.log("Pronto para um novo programa.");
      break;
    default:
      if (linha.trim()) {
        programa.push(linha.trim());
      }
      break;
  }
});