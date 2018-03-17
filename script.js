const addItems = document.querySelector(".add-items"),
    itemList = document.querySelector(".missions"),
    items = [];
    sortByNameButton = document.querySelector("#sort-by-name"),
    sortByIdButton = document.querySelector("#sort-by-id");
    var idCounter=0;

function addItem(event) {
    event.preventDefault();
    const text = (this.querySelector("[name=item]")).value;
    const item = {
        id : idCounter,
        text,
        done: false
    };
    idCounter+=1;
    items.push(item);
    populateList(items, itemList);
    this.reset();
    console.log("new mission "+item.text+" has been added");
}

function populateList(missions = [], missionsList) {
    missionsList.innerHTML = missions.map((missions, i) => {
        return `
        <li>
        <input type = "checkbox" data-index="${i}" id="item${i}" ${missions.done ? "checked" : ""} />
        <label for = "item${i}">${i+1} ${missions.text}</label>
        <span class = "delete-mission">X</span>
        </li>
        `
    }).join("");
    // console.log(missions);
}

function toggleDone(event) {
    if (!event.target.matches("input")) return;
    const index = event.target.dataset.index;
    items[index].done = !items[index].done;
    populateList(items, itemList);
    console.log(items[index].text+" has been done: "+items[index].done);
}

function deleteItem(event){
    if(!event.target.matches(".delete-mission"))return;
    var li = event.target.closest("li");
    const index = li.querySelector("input").dataset.index;
    var deleted = items.splice(index,1);
    populateList(items, itemList);
    console.log("mission "+ deleted[0].text+" has been deleted");
}

function sortByName(event){
    var sortedItems = items.sort(function(a, b){
    if(a.text < b.text) return -1;
    if(a.text > b.text) return 1;
    return 0;
})
    populateList(sortedItems,itemList);
    console.log("now list of missions sorted by name");
}

function sortById(event){
    var sortedItems = items.sort(function(a, b){
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
})
    populateList(sortedItems,itemList);   
    console.log("now list of missions sorted by number");
}

addItems.addEventListener("submit", addItem);
itemList.addEventListener("click", toggleDone);
itemList.addEventListener("click", deleteItem);
sortByNameButton.addEventListener("click",sortByName);
sortByIdButton.addEventListener("click",sortById);

populateList(items, itemList);
