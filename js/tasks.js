// scripts for the tasks page

// get the all tasks data from localstorage if available
var tasksData = JSON.parse(window.localStorage.getItem("tasksData"));

// refrence for all tasks wrapper element
var alltasks = document.querySelector(".alltasks");

// this function shows all the available tasks to the screen
showTasks()

// deletes the task on which user click
function deleteTask(index){
    tasksData = tasksData.filter((elem , ind)=>{
        return ind != index;
    })
    // upadate the data in local storage and screen
    window.localStorage.setItem("tasksData",JSON.stringify(tasksData))
    showTasks()
}

// change the status of the task on which user click
function changeStatus(index){
    if(tasksData[index].status == "Pending"){
        tasksData[index].status = "Complete";
    }else{
        tasksData[index].status = "Pending";
    }
    // upadate the data in local storage and screen
    window.localStorage.setItem("tasksData",JSON.stringify(tasksData));
    showTasks();
}

// Closes the Edit Page
function closeEditPage(){
    document.querySelector(".editPage").remove()
}

// Save the changes made to a task and update in localstorage and screen
function saveChanges(index){
    let title = document.getElementById("taskname").value;
    let description = document.getElementById("taskdesc").value;

    if(title!="" && description!=""){
        tasksData[index].title = title;
        tasksData[index].description = description;
        tasksData[index].status = "Pending";
        window.localStorage.setItem("tasksData",JSON.stringify(tasksData));
        closeEditPage();
        alert("Changes Saved");
        showTasks();
    }else{
        alert("Please fill all fields");
    }
}

// this function opens the edit box to a edit a required task
function edit(index){
    // destructures the title and description from the selected task
    const {title,description} = tasksData[index];

    // html template for the edit box
    const editTemplate = 
    `<h3>Edit</h3>
    <input type="text" name="taskname" value=${title} id="taskname" placeholder="Title"><br/>
    <textarea type="text" name="taskdesc" id="taskdesc" placeholder="Description">${description}</textarea>
    <div class="btns">
            <button class="save" onclick="saveChanges(${index})">Save</button>
            <button class="cancel" onclick="closeEditPage()">Cancel</button>
    </div>`;

    // creates a wrapper for the edit page and append it on the screen or body
    const editPage = document.createElement("div")
    editPage.className = "task_wrapper editPage";
    editPage.innerHTML = editTemplate;
    document.querySelector("body").appendChild(editPage);
}

// function to create the templates from the data fetched from local storage
function createTask(task,index){
    const {title, description, status} = task;

    // html template for every task
    const taskTemplate = 
    `<div class="name_and_action">
        <h3>${title}</h3>
        <div class="menu">
            <span class="complete menuOption" onClick="changeStatus(${index})"> ${status=="Pending"?`<i class="fas fa-check-square"></i><span class="optionName">Mark as Complete</span> `:`<i class="fas fa-clock"></i> <span class="optionName"> Mark as Incomplete</span> `}</a></span>
            <span class="delete menuOption" onClick="deleteTask(${index})"><i class="fas fa-trash-alt"></i><span class="optionName"> Delete</span></a></span>
            <span class="edit menuOption"  onClick="edit(${index})"><i class="fas fa-edit"></i> <span class="optionName"> Edit</span></a></span>
        </div>
    </div>
    <p class="description">${description}</p>
    <p class="status">Status : ${status}</p>`

    // creates a wrapper for every task and append it to the task wrapper
    let newTask = document.createElement("div");
    newTask.className = "task";
    newTask.id = `task${index}`
    newTask.innerHTML = taskTemplate;
    alltasks.appendChild(newTask);
}
 
// this function renders the tasks on the screen
function showTasks(){
    // check if there is a previoulsy saved task in local storage if data not available then else runs the first block else show it on screen
    if(!tasksData || tasksData.length ==0){
        tasksData = []
        const noData = `<h3 class="notask">Nothing to show here !!!</br>Click on Add button to add some something.</h3>`
        alltasks.innerHTML = noData;
    }else{
        alltasks.innerHTML = ""
        tasksData.map((element,index)=>{
            createTask(element,index)
        })
    }
    
}
    
