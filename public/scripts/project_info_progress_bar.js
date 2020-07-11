
function set_multibar(f, p) {
    var finished = f;
    var progress = p;
    var elem1 = document.getElementById("finishedProject");
    var elem2 = document.getElementById("inProgressProject");
    elem1.style.width = finished + '%';
    elem1.innerHTML = finished * 1 + '% FINISHED';
    elem2.style.width = progress + '%';
    elem2.innerHTML = progress * 1 + '% IN-PROGRESS';
}

function pModuleBar(pmodules){
	pmodules.forEach((pmodule)=>{
		if(pmodule.status == 'progress'){
			if(pmodule.tasksTodo != 0 && pmodule.tasksTodo != null){
				var taskPer = Number((pmodule.tasksFinished / pmodule.tasksTodo)*100 );
			}else if(pmodule.tasksTodo == 0 && pmodule.tasksFinished == 0){
				var taskPer = 100;
			}else if(pmodule.tasksTodo != 0 && pmodule.tasksFinished == 0){
				var taskPer = 0;
			}
			function set_moduleBar(v, moduleId) {
				var elem = document.getElementById("myBar_"+moduleId);
				var val = v; 
				//This val is the percentage shown on progress bar
				var width = 0;
				var id = setInterval(frame, 50);
				function frame() {
					if (width >= val) {
						clearInterval(id);
					} else {
						width++; 
						elem.style.width = width + '%'; 
						elem.innerHTML = width * 1  + '%';
					}
				}  
			}
			set_moduleBar(taskPer , String(pmodule._id) ); 
		}
	});
}