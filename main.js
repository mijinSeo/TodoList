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
//querySelectorAll 조건에 만족하는 모든 애들을 가져온다.
let tabs = document.querySelectorAll(".task-tabs div");
let filterList =[];
let taskList = [];
let mode ='';


addButton.addEventListener("click",addTask)
console.log(tabs)

//가져온 div중에서 첫번째 div는 필요 없으므로 i=1부터 시작
for(let i=1; i<tabs.length;i++){
  //어떤 탭을 선택했는지 알아야 하므로 event를 보내서 event를 타겟으로 함. 
  tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs)

function addTask(){
    let task = {
       //객체생성: 하나의 목록안에 다양한 데이터를 담기 위해 객체 생성
      //{할일, 할일이 끝났는지}
      
      id:randomId(),
      //내가 어떤 아이템을 선택했는지 함수에게 알려줘야 함
      //변수에서 각각의 아이템에 id를 부여함.
      //id는 유니크 해야한다.
      
      taskContent: taskInput.value,
      //입력한 값을 taskContent에 담음

      isComplete:false
      //할 일이 끝났는지 묻는다?? 
    }
   taskList.push(task);
   console.log(taskList);
   render();
}
// <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
//check가 클릭되는 순간(onclick) toggleComplete함수가 실행되는데
//('${taskList[i].id}') taskList에 id를 가져 감
function render(){
  let list =[]
  if(mode =="all"){
    list = taskList
  }else if (mode== "ongoing"){
    list = filterList
  }
    let resultHTML ="";
    for(let i=0; i<list.length;i++){

      if(list[i].isComplete ==true){
        resultHTML += 
        `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
         <div>
           <button onclick="toggleComplete('${list[i].id}')
           ">Check</button>
           <button onclick="deleteTask('${list[i].id}')">Delete</button>
         </div>
       </div>`;
      }else{
        resultHTML += 
        `<div class="task">
        <div>${list[i].taskContent}</div>
         <div>
           <button onclick="toggleComplete('${list[i].id}')
           ">Check</button>
           <button onclick="deleteTask('${list[i].id}')">Delete</button>
         </div>
       </div>`;
      }
    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
  //chdck버튼이 눌리면서 가져온 id를 받아 줌.
  console.log("id:",id)

  for(let i = 0; i<taskList.length; i++){
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      //!=아니다 : 앞에 담긴 값에 반다가되는 값을 넣어줌.
      //true가 담겨 있으면 !true가 아니므로 flase가 됨
      //false가 담겨 있으면 !false가 아니므로 true가 됨
      break;
    }
  }
  render()
  console.log(taskList)
}

function deleteTask(id){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render()
}
function filter(event){
  mode=event.target.id
  filterList =[];
  //event.target:event는 클릭을 했을 때 발 생되는 모든 상황
  //target는 그 중에 어떤걸 클릭했는지 정확히 알수 있음.  
 if(mode =="all"){
  render()
 }else if(mode == "ongoing"){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].isComplete ==false){
      filterList.push(taskList[i])
    }
  }
 }

}

function randomId(){
  return '_' + Math.random().toString(36);
}



