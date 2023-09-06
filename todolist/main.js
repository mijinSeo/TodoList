//유저가 값을 입력한다.
//+ 버튼을 클릭하면, 할일이 추가된다.
//delete버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할 일이 끝나면서 밑줄이 생긴다
//1.check버튼을 클릭하는 순간 true ->false
//2.true이면 끝난걸로 간주하고 밑줄
//진행중 끝남 탭을 누르면 언더바다 이동한다
//끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
//전체 탭을 누르면 전테 아이템으로 돌아옴.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode="all"
let filterList =[];

addButton.addEventListener("click", addTask);


for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs)

function addTask() {
  let task = {
    id: randomId(),
    taskCotent: taskInput.value,
    iscomplete: false,
  };

  taskList.push(task);
  console.log(task);
  render();
}

function render() {
  let list =[];
  if(mode =="all"){
    list = taskList
  }else if( mode =="ongoing"){
    list = filterList
  }else{
    list = filterList
  }

  let resultHTML = "";
  //배열안에 리스트를 하나하나 꺼낼수 있도록 조건문.
  for (let i = 0; i < list.length; i++) {
    if (list[i].iscomplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskCotent}</div>
       <div>
         <button onclick="toggleComplete('${list[i].id}')">Check</button>
         <button onclick="deleteTask('${list[i].id}')">Delete</button>
       </div>
     </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskCotent}</div>
       <div>
         <button onclick="toggleComplete('${list[i].id}')">Check</button>
         <button onclick="deleteTask('${list[i].id}')">Delete</button>
       </div>
     </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log(id);

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].iscomplete = !taskList[i].iscomplete
      break;
    }
  }
  render();
  console.log(taskList);
}
function deleteTask(id){
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i,1)
      break;
    }
  }
  render();
  console.log(taskList);

}

function filter(event){
  mode = event.target.id
 filterList =[]

  if( mode =="all"){
    render()
  }else if( mode == "ongoing"){
    for(let i= 0; i<taskList.length; i++){
      if(taskList[i].iscomplete == false){
        filterList.push(taskList[i])

      }
    }
    render();
  }else if(mode =="done"){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].iscomplete ==true){
        filterList.push(taskList[i])
      }
    }
    render()
  }
  console.log(filterList)
} 

function randomId() {
  return "_" + Math.random().toString(36);
}

render();
