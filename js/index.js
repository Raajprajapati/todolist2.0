// scripts for the index page i.e. task add screen
var addBtn =  document.querySelector(".add");
var tasksData = JSON.parse(window.localStorage.getItem("tasksData"));//get the data from localstorage

// creates an empty array if no data is available in localstorage
if(!tasksData){
    tasksData = []
}

// refrence for task wrapper element
var alltasks = document.querySelector(".alltasks");

// function to save data in localstorage
function saveData(){
    // get the value from the user input
    let taskname = document.querySelector("#taskname").value;
    let taskdesc = document.querySelector("#taskdesc").value;
    if(taskname!="" && taskdesc!=""){
        tasksData.push({title:taskname,description:taskdesc,status:"Pending"});
        window.localStorage.setItem("tasksData",JSON.stringify(tasksData));

        alert("Task Saved")//remove the alert if its irritating
        
        //clears the input screen after saving data 
        document.querySelector("#taskname").value = ""; 
        document.querySelector("#taskdesc").value = "";
    }else{
        alert("Please Enter the all fields");
    }
}
// add a function to the add button and saves the data in local storage provided from the input value
addBtn.addEventListener("click",()=>{
    saveData();
});


