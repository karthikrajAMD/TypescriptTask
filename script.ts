var list = document.querySelector(".list") as HTMLElement;
var input_task = document.querySelector("#ToDo") as HTMLInputElement;
var searchInput = document.querySelector("#searchContent") as HTMLInputElement;
var my_task_list: string[] = [];
var filteredArray: string[] = [];
// var h=list.children
function search(): void {
  filteredArray = [];
  my_task_list.filter((e) => {
    if (e.toLowerCase().indexOf(searchInput.value.toLowerCase()) === 0) {
      filteredArray.push(e);
    }
  });

  var my_new_ar = list.children as HTMLCollection;
  // my_new_ar.forEach((e) => {
  for (let e = 0; e < my_new_ar.length; e++) {
    if (
      !(
        filteredArray.indexOf(
          (my_new_ar[e].querySelector(".task_name") as HTMLInputElement).value
        ) !== -1
      )
    )
      my_new_ar[e].classList.add("not");
    else my_new_ar[e].className = "list-item";
  }
}

function checkedFunction(e: Event): void {
  var my_check = (e.target as HTMLElement).closest("div") as HTMLElement;

  console.log(my_check);

  if ((my_check.querySelector(".completed") as HTMLInputElement).checked) {
    console.log(my_check.querySelector(".my_option"));

    (
      my_check.querySelector(".my_option") as HTMLSelectElement
    ).selectedIndex = 2;

    (
      my_check.querySelector(".task_name") as HTMLInputElement
    ).style.textDecoration = " line-through";
  } else {
    (
      my_check.querySelector(".my_option") as HTMLSelectElement
    ).selectedIndex = 0;

    (
      my_check.querySelector(".task_name") as HTMLInputElement
    ).style.textDecoration = "none";
  }
}

function checkboxClick(e: Event): void {
  let my_check = (e.target as HTMLElement).closest("div") as HTMLElement;

  let checkbox = my_check.querySelector(".completed") as HTMLInputElement;

  let optionValue = my_check.querySelector(".my_option") as HTMLSelectElement;

  if (optionValue.value == "Completed") {
    checkbox.checked = true;

    (
      my_check.querySelector(".task_name") as HTMLInputElement
    ).style.textDecoration = " line-through";
  } else {
    checkbox.checked = false;

    (
      my_check.querySelector(".task_name") as HTMLInputElement
    ).style.textDecoration = "none";
  }
}

function deleteMyTodo(e: Event): void {
  let deleteButtonDiv = (e.target as HTMLElement).closest("div") as HTMLElement;

  console.log(my_task_list);

  let inputValue = (
    deleteButtonDiv.querySelector(".task_name") as HTMLInputElement
  ).value;

  my_task_list = my_task_list.filter((val) => val != inputValue);

  list.removeChild(deleteButtonDiv);
}

var add = (): void => {
  input_task.className = "task_name";

  if (
    !(my_task_list.indexOf(input_task.value) !== -1) &&
    input_task.value != ""
  ) {
    my_task_list.push(input_task.value);

    let my_arr: string[] = ["To do", "Progress", "Completed"];

    var my_div = document.createElement("div") as HTMLElement;

    my_div.className = "list-item";

    let checkbox: HTMLInputElement = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.name = "completed";

    checkbox.className = "completed";

    my_div.appendChild(checkbox);

    let text_input: HTMLInputElement = document.createElement("input");

    text_input.type = "text";

    text_input.name = "task_name";

    text_input.value = input_task.value.trim();

    text_input.className = "task_name";

    text_input.readOnly = true;

    my_div.appendChild(text_input);

    let selectList: HTMLSelectElement = document.createElement("select");

    selectList.name = "my_option";

    selectList.className = "my_option";

    for (let i in my_arr) {
      let my_option: HTMLOptionElement = document.createElement("option");

      my_option.value = my_arr[i];

      my_option.text = my_arr[i];

      selectList.appendChild(my_option);
    }

    my_div.appendChild(selectList);

    let my_button: HTMLElement = document.createElement("p");

    my_button.className = "close";

    my_button.textContent = "X";

    my_div.appendChild(my_button);

    list.appendChild(my_div);

    var my_option = my_div.querySelector(".my_option") as HTMLElement;
    my_option.addEventListener("change", (e) => {
      checkboxClick(e);
    });
    var close = my_div.querySelector(".close") as HTMLElement;
    close.addEventListener("click", (e) => {
      deleteMyTodo(e);
    });
    var my_checkbox = my_div.querySelector(".completed") as HTMLElement;
    my_checkbox.addEventListener("change", (e) => {
      checkedFunction(e);
    });
  } else {
    input_task.classList.add("error");
  }

  input_task.value = "";
};
