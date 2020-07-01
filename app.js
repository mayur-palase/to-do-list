let itemInput = document.querySelector('#itemInput');
let addTask = document.querySelector('#addTask');
let itemForm = document.querySelector('#itemForm');
let clearTask = document.querySelector('#clearTask');
let existingTasks = [];
let taskExists = false;
let localTasks = localStorage.getItem('localTasks');;

showExistingTasks();

// add task in the list
itemForm.addEventListener('submit', function(event){
    if(localTasks === null) {
        existingTasks = [];
    } 
    else {
        existingTasks = JSON.parse(localTasks);
    }
    existingTasks.push(itemInput.value);
    localStorage.setItem('localTasks', JSON.stringify(existingTasks));
    console.log(existingTasks);
    showExistingTasks();
})

// Show all existing tasks.
function showExistingTasks() {

    if(localTasks !== null)
    {
    existingTasks = JSON.parse(localTasks);
    let html = '';
    taskList = document.querySelector('#taskListTable');
    existingTasks.forEach((item, index) => {
        html += `<tr>
                    <th scope='row'>${index+1}</th>
                    <td>${item}</td>
                    <td><button type='button' class='text-primary'><i class='fa fa-edit'></i>Edit</button></td>
                    <td><button type='button' class='text-danger'><i class='fa fa-trash'></i>Delete</button></td>
                </tr>`
    });
    taskList.innerHTML = html;
} 
else {
    existingTasks = [];
}
}

// Clear all tasks
clearTask.addEventListener('click', function(){
    localStorage.clear();
    showExistingTasks();
})
