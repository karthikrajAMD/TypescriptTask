var list = document.querySelector(".list");
var input_task = document.querySelector("#ToDo");
var searchInput = document.querySelector("#searchContent");
var my_task_list = [];
var filteredArray = [];
// var h=list.children
function search() {
    filteredArray = [];
    my_task_list.filter(function (e) {
        if (e.toLowerCase().indexOf(searchInput.value.toLowerCase()) === 0) {
            filteredArray.push(e);
        }
    });
    var my_new_ar = list.children;
    // my_new_ar.forEach((e) => {
    for (var e = 0; e < my_new_ar.length; e++) {
        if (!(filteredArray.indexOf(my_new_ar[e].querySelector(".task_name").value) !== -1))
            my_new_ar[e].classList.add("not");
        else
            my_new_ar[e].className = "list-item";
    }
}
function checkedFunction(e) {
    var my_check = e.target.closest("div");
    console.log(my_check);
    if (my_check.querySelector(".completed").checked) {
        console.log(my_check.querySelector(".my_option"));
        my_check.querySelector(".my_option").selectedIndex = 2;
        my_check.querySelector(".task_name").style.textDecoration = " line-through";
    }
    else {
        my_check.querySelector(".my_option").selectedIndex = 0;
        my_check.querySelector(".task_name").style.textDecoration = "none";
    }
}
function checkboxClick(e) {
    var my_check = e.target.closest("div");
    var checkbox = my_check.querySelector(".completed");
    var optionValue = my_check.querySelector(".my_option");
    if (optionValue.value == "Completed") {
        checkbox.checked = true;
        my_check.querySelector(".task_name").style.textDecoration = " line-through";
    }
    else {
        checkbox.checked = false;
        my_check.querySelector(".task_name").style.textDecoration = "none";
    }
}
function deleteMyTodo(e) {
    var deleteButtonDiv = e.target.closest("div");
    console.log(my_task_list);
    var inputValue = deleteButtonDiv.querySelector(".task_name").value;
    my_task_list = my_task_list.filter(function (val) { return val != inputValue; });
    list.removeChild(deleteButtonDiv);
}
var add = function () {
    input_task.className = "task_name";
    if (!(my_task_list.indexOf(input_task.value) !== -1) &&
        input_task.value != "") {
        my_task_list.push(input_task.value);
        var my_arr = ["To do", "Progress", "Completed"];
        var my_div = document.createElement("div");
        my_div.className = "list-item";
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "completed";
        checkbox.className = "completed";
        my_div.appendChild(checkbox);
        var text_input = document.createElement("input");
        text_input.type = "text";
        text_input.name = "task_name";
        text_input.value = input_task.value.trim();
        text_input.className = "task_name";
        text_input.readOnly = true;
        my_div.appendChild(text_input);
        var selectList = document.createElement("select");
        selectList.name = "my_option";
        selectList.className = "my_option";
        for (var i in my_arr) {
            var my_option_1 = document.createElement("option");
            my_option_1.value = my_arr[i];
            my_option_1.text = my_arr[i];
            selectList.appendChild(my_option_1);
        }
        my_div.appendChild(selectList);
        var my_button = document.createElement("p");
        my_button.className = "close";
        my_button.textContent = "X";
        my_div.appendChild(my_button);
        list.appendChild(my_div);
        var my_option = my_div.querySelector(".my_option");
        my_option.addEventListener("change", function (e) {
            checkboxClick(e);
        });
        var close = my_div.querySelector(".close");
        close.addEventListener("click", function (e) {
            deleteMyTodo(e);
        });
        var my_checkbox = my_div.querySelector(".completed");
        my_checkbox.addEventListener("change", function (e) {
            checkedFunction(e);
        });
    }
    else {
        input_task.classList.add("error");
    }
    input_task.value = "";
};
