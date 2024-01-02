const para_reaction = document.querySelector("#para_reaction");
const para_memory = document.querySelector("#para_memory");
const para_verbal = document.querySelector("#para_verbal");
const para_visual = document.querySelector("#para_visual");
const h1 = document.querySelector("#h1");
async function foo() {
  try {
    let response = await fetch("data.json");
    if (!response.ok) throw new Error("Error");
    let data = await response.json();

    return data.map((obj) => obj.score);
  } catch (error) {
    para_reaction.textContent = error.message;
    para_memory.textContent = error.message;
    para_verbal.textContent = error.message;
    para_visual.textContent = error.message;
  }
}
async function main() {
  const result = await foo();
  para_reaction.textContent = result[0];
  para_memory.textContent = result[1];
  para_verbal.textContent = result[2];
  para_visual.textContent = result[3];
}
main();

async function calculate() {
  const data = await foo();
  const totalScore = data.reduce((acc, currentScore) => acc + currentScore, 0);
  h1.textContent = Math.floor(totalScore / data.length);
}
calculate();
