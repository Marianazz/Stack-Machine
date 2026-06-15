import readline from "node:readline";

const stack = [];

function executePush(value) {
  stack.push(value);
}

function executeAdd() {
  // Bug #2: valida se há elementos suficientes antes de operar
  if (stack.length < 2) {
    console.log("Erro: 'add' precisa de pelo menos 2 elementos na pilha!");
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  stack.push(b + a);
}

function executeSub() {
  if (stack.length < 2) {
    console.log("Erro: 'sub' precisa de pelo menos 2 elementos na pilha!");
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  stack.push(b - a);
}

function executeMul() {
  if (stack.length < 2) {
    console.log("Erro: 'mul' precisa de pelo menos 2 elementos na pilha!");
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  stack.push(b * a);
}

function executeDiv() {
  if (stack.length < 2) {
    console.log("Erro: 'div' precisa de pelo menos 2 elementos na pilha!");
    return;
  }
  const a = stack.pop();
  const b = stack.pop();
  if (a === 0) {
    console.log("Erro: divisão por zero!");
    stack.push(b); // Bug #2: devolve b à pilha para não perder o valor
    return;
  }
  stack.push(b / a);
}

function executeInstruction(line) {
  const parts = line.trim().split(" ");
  const instruction = parts[0].toLowerCase();

  if (instruction === "push") {
    // Bug #1: valida se o argumento existe e é um número válido
    if (parts.length < 2 || parts[1] === undefined) {
      console.log("Erro: 'push' precisa de um número. Exemplo: push 5");
      return;
    }
    const value = Number(parts[1]);
    if (isNaN(value)) {
      console.log(`Erro: "${parts[1]}" não é um número válido.`);
      return;
    }
    executePush(value);
  } else if (instruction === "add") {
    executeAdd();
  } else if (instruction === "sub") {
    executeSub();
  } else if (instruction === "mul") {
    executeMul();
  } else if (instruction === "div") {
    executeDiv();
  } else {
    console.log(`Instrução desconhecida: "${instruction}"`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("============================================");
console.log("       Stack Machine — Digite instruções    ");
console.log("============================================");
console.log("Instruções: push <número> | add | sub | mul | div");
console.log('Digite "run" para executar e ver o resultado');
console.log('Digite "reset" para limpar a pilha');
console.log('Digite "exit" para sair');
console.log("--------------------------------------------\n");

const programa = [];

rl.on("line", (linha) => {
  const input = linha.trim().toLowerCase();

  if (input === "exit") {
    console.log("Encerrando. Até logo!");
    rl.close();
  } else if (input === "reset") {
    stack.length = 0;
    programa.length = 0;
    console.log("Pilha e programa resetados.\n");
  } else if (input === "run") {
    if (programa.length === 0) {
      console.log("Nenhuma instrução digitada ainda.\n");
      return;
    }

    stack.length = 0;
    for (const instrucao of programa) {
      executeInstruction(instrucao);
    }

    // Bug #3: valida se a pilha tem pelo menos um resultado
    if (stack.length === 0) {
      console.log("\nErro: nenhum resultado na pilha ao final do programa.");
      console.log("--------------------------------------------");
      programa.length = 0;
      return;
    }

    // Bug #4: avisa se sobrou mais de um valor na pilha
    if (stack.length > 1) {
      console.log(`\nAviso: a pilha terminou com ${stack.length} valores: [${stack.join(", ")}]`);
      console.log("Um programa correto deve ter exatamente 1 valor ao final.");
    }

    const resultado = stack.pop();
    console.log(`\nResultado: ${resultado}`);
    console.log("--------------------------------------------");

    programa.length = 0;
    stack.length = 0;
    console.log("Pronto para um novo programa.\n");
  } else if (input !== "") {
    programa.push(linha.trim());
  }
});
