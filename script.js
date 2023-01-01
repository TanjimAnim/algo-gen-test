//function to add a row to the table
function addRow() {
  var ths = document.querySelectorAll("table tr th");
  let tr = document.createElement("tr");

  for (let i = 0; i < ths.length; i++) {
    let td = document.createElement("td");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    let input = document.createElement("input");
    let form = document.createElement("form");
    input.placeholder = "type here";
    input.type = "text";
    input.className = "input-field";
    form.append(input);
    tr.id = `row-id-${(Math.random() * 1000).toFixed(2)}`;
    if (i > 0) {
      td.append(form);
      td.dataset.key = ths[i].dataset.key;
      tr.appendChild(td);
      continue;
    }
    button1.innerText = "save";
    button2.innerText = "delete";
    button1.id = "save-info-btn";
    button2.id = "delete-row-btn";
    button1.type = "submit";
    //save or update
    button1.onclick = (event) => {
      if (button1.innerText === "save") {
        saveData(event.target.parentNode.parentNode.id);
        button1.innerText = "update";
      } else if (button1.innerText === "update") {
        updateData(event.target.parentNode.parentNode.id);
        button1.innerText = "save";
      }
    };
    // delete a row of the table
    button2.onclick = (event) => {
      event.target.parentNode.parentNode.remove();
    };
    td.append(button1);
    td.append(button2);
    tr.appendChild(td);
  }
  document.querySelector("table").appendChild(tr);
}

//function to add column to table
function addColumn() {
  var input = document.querySelector("input");
  if (input.value === "") {
    alert("please type in a column name");
    return;
  }
  if (document.querySelector(`[data-key=${input.value}]`)) {
    alert("please type in a different column name");
    return;
  }
  var table = document.querySelector("table tr");
  let button = document.createElement("button");
  button.innerHTML = "delete column";
  button.onclick = (event) => {
    deleteColumn(event.target.parentNode.getAttribute("data-key"));
  };
  let th = document.createElement("th");
  th.dataset.key = input.value;
  th.append(input.value);
  th.append(button);
  table.appendChild(th);

  input.value = "";
}

//save table cell data
function saveData(rowId) {
  let inputElement = document.getElementById(rowId);
  let input = inputElement.querySelectorAll('input[type="text"]');

  for (let i = 0; i < input.length; i++) {
    var inputValue = input[i];
    var textElement = document.createElement("p");
    textElement.textContent = inputValue.value;
    inputValue.parentNode.replaceChild(textElement, inputValue);
  }
}

//update table cell data
function updateData(rowId) {
  let inputElement = document.getElementById(rowId);
  let input = inputElement.querySelectorAll("form p");

  for (let i = 0; i < input.length; i++) {
    var textValue = input[i];
    var textElement = document.createElement("input");
    textElement.type = "text";
    textElement.className = "input-field";
    textElement.value = textValue.textContent;
    textValue.parentNode.replaceChild(textElement, textValue);
  }
}

//delete the whole column
function deleteColumn(data) {
  let elements = document.querySelectorAll(`[data-key=${data}]`);
  elements.forEach((elements) => elements.remove());
}
