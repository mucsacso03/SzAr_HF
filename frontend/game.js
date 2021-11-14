

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = '';
    container.appendChild(cell).className = "grid-item";
  };
};

const container = document.getElementById("container");

makeRows(19, 19);