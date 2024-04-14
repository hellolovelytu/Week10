class Activity { /*initialize activity class with name and time parameter */
    constructor(name,time){
        this.name=name;
        this.time=time;
    }
}

class Kid {/*initialize kid class with id and name parameter */
    constructor(id,name){
        this.id=id;
        this.name=name;
        this.activities = [];
    }
    addActivitiy(activity) {/*method to add activity into an array of activities */
        this.activities.push(activity);
    }
    deleteActivity(activity){/*method to remove activity from an array of activities */
        let index = this.activities.indexOf(activity);
        this.activities.splice(index,1)
    }
}

let kids = [];/*initialize an array of kid for the ease of manipulating their data in the system */
let kidId = 0;/*start with index 0 for the first kid*/

onClick('new-kid',()=>{/*method or "action" for adding kids into the kids array while assigning them to their index number*/
    kids.push(new Kid(kidId++, getValue('new-kid-name')));
    drawDOM();
});

function onClick(id,action){/*initialize function for the above method, what action happens when the button is clicked*/
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element;
}

function getValue(id){/*initialize getValue function for the onClick method to get the value "name" from the assigned id/index number*/
    return document.getElementById(id).value;
}

function drawDOM() {/*initialize the drawDOM function*/
    let kidDiv = document.getElementById('kids');/*initialize each kid will occupy a div on HTML */
    clearElement(kidDiv);/*if a kid is deleted, the entire div for that kid is also deleted */
    for (kid of kids) {/*for each kid in the kids array, set the method and elements that going with it */
        let table= createKidSchedule(kid);/*each kid table is established with createKidSchedule method */
        let title = document.createElement('h2'); /*create an element that will serve as the table title */
        title.innerHTML = ` ${kid.name}  `;/*set the title with kid.name*/
        title.appendChild(createDeleteKidButton(kid));/*add delete button element to the title */
        kidDiv.appendChild(title);/*add elements to kid div */
        kidDiv.appendChild(table);
        for (activity of kid.activities) {/*for each activity, create a new row using the createActivityRow function */
            createActivityRow(kid, table, activity);
        }
    }
}

function createActivityRow(kid, table, activity){/*initialize the function to create row for kids activities */
    let row= table.insertRow(2);/*initialize a row with table insertRow method */
    row.insertCell(0).innerHTML = activity.name;/*set cells by their indexs */
    row.insertCell(1).innerHTML = activity.time;
    let actions = row.insertCell(2);/*add delete button for row*/
    actions.appendChild(createDeleteActivityButton(kid,activity));
}

function createDeleteActivityButton(kid,activity){/*function and settings for delete button */
    let btn= document.createElement('button');
    btn.className = 'btn btn-primary';/*set class for button with bootstrap settings */
    btn.innerHTML = 'Delete';/*set text content for button */
    btn.onclick = () =>{/*set what happens when we click on the button */
        let index = kid.activities.indexOf(activity);
        kid.activities.splice(index,1);
        drawDOM();
    };
    return btn;
}

function createDeleteKidButton(kid){/*function and setting for delete kid button */
    let btn=document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML= 'Delete Kid';
    btn.onclick = ()=>{
        let index = kids.indexOf(kid);
        kids.splice(index,1);
        drawDOM();
    };
    return btn;
}

function addNewActivityButton(kid){/*function and settings for the add new acitivity button */
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add activity';
    btn.onclick = () => {/*setting what happens when we click the button */
        kid.activities.push (new Activity(getValue(`name-input-${kid.id}`), getValue(`time-input-${kid.id}`)));
        drawDOM();
    };
    return btn;
}

function createKidSchedule(kid){/*initialize function to build table */
    let table=document.createElement('table');/*initialize table element on HTML */
    table.setAttribute('class', 'table table-light table-striped text-center');/*formating table using bootstrap*/
    let row = table.insertRow(0);/*build header row */
    let nameColumn = document.createElement('th');/*add table header element */
    let timeColumn= document.createElement('th');
    nameColumn.innerHTML='Activity Name';/*label headers */
    timeColumn.innerHTML= 'Time';
    row.appendChild(nameColumn);/*append table header elements to header row */
    row.appendChild(timeColumn);
    let formRow= table.insertRow(1);/*build new row for the table*/
    let nameTh = document.createElement ('th');/*add table header elements for the input fields and button*/
    let timeTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${kid.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let timeInput = document.createElement('input');
    timeInput.setAttribute('id', `time-input-${kid.id}`);
    timeInput.setAttribute('type', 'text');
    timeInput.setAttribute('class', 'form-control');
    let newActivityButton = addNewActivityButton(kid);/*link button to a method */
    nameTh.appendChild(nameInput);/*append input and button to the table new row*/
    timeTh.appendChild(timeInput);
    createTh.appendChild(newActivityButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(timeTh);
    formRow.appendChild(createTh);
    return table;

}
/*remove the first child node of the element */
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
}