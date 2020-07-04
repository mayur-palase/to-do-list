let item_input = document.getElementById('itemInput');      //Input text-box
let add_task_btn = document.getElementById('addTask');      //Add task button
let clr_list_btn = document.getElementById('clearTask');           //Clear task button
let show_list_of_tasks = document.getElementById('taskListTable');
//let edit_item = document.getElementById('edit_item');
//let delete_item = document.getElementById('delete_item');
let task_list = [];
let save_index;

loadExistingTasks();

// This is the functionality of adding tasks
//add_task_btn.addEventListener('click', function(event){   // click cannot clear the textbox after submitting form.
    itemForm.addEventListener('submit', function(event){    // submit can clear the textbox after submitting form.
    let input_value = item_input.value;

    if( input_value === "" || input_value === null){
        alert("Please insert something");
    }
    else {
        existing_list = localStorage.getItem("previous_items");
        if( existing_list === "" || existing_list === null ) {
            task_list.push(input_value);
            localStorage.setItem('previous_items', JSON.stringify(task_list));
            // item_input.value = "";
        } 
        else {
            task_list = JSON.parse(existing_list);
            console.log("task list = " + task_list);
            task_list.push(input_value);
            localStorage.setItem('previous_items', JSON.stringify(task_list));
            // item_input.value = "";
        }
    }
})

// Show tasks on page page-load event and on-submit event.
function loadExistingTasks() {
    let html = "";
    existing_list = localStorage.getItem("previous_items");
    if( existing_list == null ) {
        task_list = [];
    } else {
        task_list = JSON.parse(existing_list);
    }
    task_list.forEach((item, index) => {
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${item}</td>
                    <td><button type="button" id="edit_item" onclick="editTask(${index})" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" id="delete_item" onclick="deleteTask(${index})" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`
    });
    show_list_of_tasks.innerHTML = html; 
}

// This is the functionality of clear all tasks.
clr_list_btn.addEventListener('click', function(){
  localStorage.clear();
  loadExistingTasks(); 
})

// Edit task

function editTask(index) {
    save_index = index;
    console.log(save_index);
    add_task_btn.style.display = 'none';
    document.getElementById('saveTask').style.display = 'block';
    console.log()
    item_input.value = task_list[index];
}

document.getElementById('saveTask').addEventListener('click', function(){
    add_task_btn.style.display = 'block';
    document.getElementById('saveTask').style.display = 'none';
    task_list[save_index] = item_input.value;
    item_input.value = "";
    localStorage.setItem('previous_items', JSON.stringify(task_list));
    loadExistingTasks();
})

function deleteTask(index) {
    task_list.splice(index, 1);
    localStorage.setItem('previous_items', JSON.stringify(task_list));
    loadExistingTasks();
}