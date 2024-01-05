const p = document.querySelector("#p");
const parentDiv = document.querySelector(".summary_content");

async function fetchData() {
  try {
    let response = await fetch("data.json");
    if (!response.ok) throw new Error("Error");
    let data = await response.json();

    return data;
  } catch (error) {
    p.textContent = error.message;
  }
}
async function main() {
  const result = await fetchData();
  for (let i = 0; i < result.length; i++) {
    parentDiv.innerHTML += `
    <div class="specs ${result[i].category.toLowerCase()}">
      <div class="icon text_${result[i].category.toLowerCase()}">
        <img src="${result[i].icon}" alt = "${result[i].category} photo">
        <p>${result[i].category}</p>
      </div>
      <div class="numbers">
        <p id="para_${result[i].category}">${result[i].score}</p>
        <p>/100</p>
      </div>
    </div> `;
  }
}
main();

async function calculate() {
  const data = await fetchData();
  const totalScore = data.reduce(
    (acc, currentScore) => acc + currentScore.score,
    0
  );
  p.textContent = Math.floor(totalScore / data.length);
}
calculate();
