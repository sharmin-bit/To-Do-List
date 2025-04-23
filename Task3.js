var completed=[];
window.addEventListener('DOMContentLoaded',function(event){
    completed=JSON.parse(this.localStorage.getItem("completed"));
    if(completed==null)
    {
        completed=[];
    }
    loadcompletedTask();
});

var todolist=[];
var todoobj={SRNO:null,ID:null,TASK:null,CREATEDON:null,MODIFIEDON:null};
var editIndex=null;
window.addEventListener('DOMContentLoaded',function(event){
    todolist=JSON.parse(this.localStorage.getItem("todolist"));
    if(todolist==null)
    {
        todolist=[];
    }
    loadTasks();
});
function loadTasks(){
    const taskTable = document.getElementById('tableBody');
    taskTable.innerHTML = ''; // Clear existing tasks
    todolist.forEach(function(task, index)
    {
        task.SRNO=index+1;
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${task.SRNO}</td>
            <td>${task.ID}</td>
            <td>${task.TASK}</td>
            <td>${task.CREATEDON}</td>
            <td>${task.MODIFIEDON}</td>
            <td>
                <a style="border: none; background: none; color:blue" onclick="edit(${index})" data-bs-toggle="modal" data-bs-target="#myModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:red" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:green" onclick="completedTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                </a>
            </td>
             `;
        taskTable.appendChild(newRow);
        document.getElementById('count').innerHTML=`Pending Tasks ( ${todolist.length} )`;
    });
}
function edit(index){
   editIndex=index;
   const task=todolist[index];
   document.getElementById('editTask-name').value=task.TASK;
   document.getElementById('editTask-id').value=task.ID;
}
function update(){
    const updatedTaskname=document.getElementById('editTask-name').value;
    const updatedTaskid=document.getElementById('editTask-id').value;
    const modifiedDate=new Date().toLocaleString();

    todolist[editIndex].TASK=updatedTaskname;
    todolist[editIndex].ID=updatedTaskid;
    todolist[editIndex].MODIFIEDON=modifiedDate;

    localStorage.setItem("todolist",JSON.stringify(todolist));
    loadTasks();

}
function addTask(){
            const taskinput=document.getElementById('task-name');
            const idinput=document.getElementById('task-id');
            const createdDate=new Date().toLocaleString();
            const modefiedDate=' ';
            const validID=document.getElementById('task-id').value;
            let maxID=0;
            for(let task of todolist)
                {
                    if(task.ID>maxID)
                        { 
                           maxID=task.ID; 
                        }
                    if(task.ID==validID)
                    {
                        alert("ID INVALID!!");
                        taskinput.value='';
                         idinput.value=parseInt(maxID)+1;
                         console.log(parseInt(maxID)+1);
                        return false;
                    }
                }

            const newTask=
            {
                 SRNO:null,
                 ID:validID,
                 TASK:taskinput.value,
                 CREATEDON:createdDate,
                 MODIFIEDON:modefiedDate
            };

                    todolist.push(newTask);
                    localStorage.setItem("todolist", JSON.stringify(todolist));
                    loadTasks();

                taskinput.value='';
               idinput.value=parseInt(validID)+1;
        }
 function deleteTask(index){
   let res=confirm("Do you want to delete the value?");
   if(res==true)
   {
    todolist.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(todolist));
    loadTasks(); 
   }
   else{
      alert("Value not deleted");
   }
}
function loadcompletedTask(){
    const table1=document.getElementById("table1Body");
    table1.innerHTML='';
    completed.forEach(function(task,index)
    {
        task.SRNO = index + 1; 
       const newRow=document.createElement('tr');
       newRow.innerHTML=`
         <td>${task.SRNO}</td>
         <td>${task.ID}</td>
         <td>${task.TASK}</td>
         <td>${task.CREATEDON}</td>
         <td>${task.MODIFIEDON}</td>
         <td>${task.COMPLETEDON}</td>
       `;
       table1.appendChild(newRow);
       document.getElementById('count1').innerHTML=`Completed Tasks ( ${completed.length} )`;
    });
}
function completedTask(index){
   const task=todolist[index];
   const currentDate=new Date().toLocaleString();
   const newTask=
   {
     SRNO:null,
     ID:task.ID,
     TASK:task.TASK,
     CREATEDON:task.CREATEDON,
     MODIFIEDON:task.MODIFIEDON,
     COMPLETEDON:currentDate
   }
   completed.push(newTask);
   todolist.splice(index,1);

   localStorage.setItem("completed",JSON.stringify(completed));
   localStorage.setItem("todolist",JSON.stringify(todolist));

   loadTasks();
   loadcompletedTask();
}
function searchTASK(event){
    event.preventDefault();
    var sid=document.getElementById("searchID").value;
    var sname=document.getElementById("searchNAME").value;
    var search=document.getElementById("search").value;
    document.getElementById("tableBody").innerHTML='';
    document.getElementById("table1Body").innerHTML='';
    var res=[];
    if(search=="Pending")
        { 
            if(sid)
            {
                res=todolist.filter(function(task)
               {
                  return task.ID==sid;
               });
            }
            else
            {   res=todolist.filter(function(task)
             { 
                return task.ID==sid || task.TASK.includes(sname);
             });
            }
        }
  else if(search=="Completed")
        {
            if(sid)
                {
                    res=completed.filter(function(task)
                   {
                      return task.ID==sid;
                   });
                }
            else if(sname)
            {
                res=completed.filter(function(task)
                 {
                     return task.TASK.includes(sname);
                 });
            }
            else
               res=completed;
        }
    else if(search=="All")
        {
            var allTask=todolist.concat(completed);
            if(sid)
            {
                res=allTask.filter(function(task)
               {
                   return task.ID==sid;
                });
            }
            else if(sname)
            {
                res=allTask.filter(function(task)
                 {
                     return task.TASK.includes(sname);
                 });
            }
            else
               res=allTask;
        }
        console.log("Search ID:", sid);
        loadSearchTask(res,search);
}
function loadSearchTask(res,search){
    document.getElementById('outputTable').style.display='none';
    document.getElementById('completeTable').style.display='none';
    var pending=document.getElementById('tableBody');
    var completedTable=document.getElementById('table1Body');
    pending.innerHTML=' ';
    completedTable.innerHTML=' ';
    if(search=='Pending')
    {
        if(res.length==0)
        {
            alert("NO TASK FOUND");
        }
        else
        {
            res.forEach(function(task,index)
            {
                task.SRNO = index + 1; 
               const newRow=document.createElement('tr');
               newRow.innerHTML=`
                 <td>${task.SRNO}</td>
                 <td>${task.ID}</td>
                 <td>${task.TASK}</td>
                 <td>${task.CREATEDON}</td>
                 <td>${task.MODIFIEDON}</td>
                <td>
                <a style="border: none; background: none; color:blue" onclick="edit(${index})" data-bs-toggle="modal" data-bs-target="#myModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:red" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:green" onclick="completedTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                </a>
            </td>
               `;
               pending.appendChild(newRow);
            });
        }
        document.getElementById('outputTable').style.display='table';
    }
    else if(search=='Completed')
    {
        if(res.length==0)
            {
                alert("NO TASK FOUND");
            }
            else
            {
                res.forEach(function(task,index)
                {
                    task.SRNO = index + 1; 
                   const newRow=document.createElement('tr');
                   newRow.innerHTML=`
                     <td>${task.SRNO}</td>
                     <td>${task.ID}</td>
                     <td>${task.TASK}</td>
                     <td>${task.CREATEDON}</td>
                     <td>${task.MODIFIEDON}</td>
                     <td>${task.COMPLETEDON?task.COMPLETEDON:''}</td>
                   `;
                   completedTable.appendChild(newRow);
                });
            }
        document.getElementById('completeTable').style.display='table';
    }
    else if(search=='All')
    {
        if(res.length==0)
            {
                alert("NO TASK FOUND");
            }
        else
        {
            res.forEach(function(task,index)
                {
                   if(todolist.includes(task))
                    {
                        task.SRNO = index + 1; 
                        const newRow=document.createElement('tr');
                        newRow.innerHTML=`
                          <td>${task.SRNO}</td>
                          <td>${task.ID}</td>
                          <td>${task.TASK}</td>
                          <td>${task.CREATEDON}</td>
                          <td>${task.MODIFIEDON}</td>
            <td>
                <a style="border: none; background: none; color:blue" onclick="edit(${index})" data-bs-toggle="modal" data-bs-target="#myModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:red" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </a>
                <a style="border: none; background: none; color:green" onclick="completedTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                </a>
            </td>
               `;
                        pending.appendChild(newRow);
                        document.getElementById('outputTable').style.display='table';
                    }
                   else if(completed.includes(task))
                   {
                    task.SRNO = index + 1; 
                    const newRow=document.createElement('tr');
                    newRow.innerHTML=`
                      <td>${task.SRNO}</td>
                      <td>${task.ID}</td>
                      <td>${task.TASK}</td>
                      <td>${task.CREATEDON}</td>
                      <td>${task.MODIFIEDON}</td>
                      <td>${task.COMPLETEDON?task.COMPLETEDON:''}</td>
                    `;
                      completedTable.appendChild(newRow);
                      document.getElementById('completeTable').style.display='table';
                   };
                });
        }
    }
}
function showform() {
    const searchBox = document.getElementById('searchBox');
    // Toggle the display property of the search box
    if (searchBox.style.display === 'none') {
        searchBox.style.display = 'block'; // Show the search box
    } else {
        searchBox.style.display = 'none'; // Hide the search box
    }
}
function clearTASK(){
    document.getElementById('searchID').value=' ';
    document.getElementById('searchNAME').value=' ';
     loadTasks();
}