var arrayItemList = [];
var arrayDoneList = [];

//*************************************Get localStorage info on start
var getItemsFromLocalStorage = function () {

  if (localStorage.getItem("allItem") !== null) {
    var objsArray = JSON.parse(localStorage.getItem("allItem"));
    console.log("LocalStorage on start: ", objsArray);

    for (var i = 0; i < objsArray.length; i++) {
      refreshLocalStoredList(objsArray[i]);
      console.log("XIXI" + objsArray[i]);
    }

  } else {
    console.log("There is nothing in TodolocalStorage");
  }

  // localStorage.clear();
}();

//*************************************Get items from DonelocalStorage on start
var getItemsFromDoneLocalStorage = function () {

  if (localStorage.getItem("donelist") !== null) {
    var objsArray = JSON.parse(localStorage.getItem("donelist"));
    console.log("LocalStorage on donelist start: ", objsArray);

    for (var i = 0; i < objsArray.length; i++) {
      refreshDoneList(objsArray[i]);
      console.log("Is Here: " + objsArray[i]);
    }

  } else {
    console.log("There is nothing in DonelocalStorage");
  }

}();


// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;

  if (inputValue !== "") {
    var myList = document.getElementById("myList");
    var li = document.createElement("li");
    li.className = "listTag";
    var textNode = document.createTextNode(inputValue);
    console.log("Input Value: ", inputValue);
    li.appendChild(textNode);
    localStorage.setItem("allList", inputValue);
    setTodoListInLocalStorage(inputValue);
    myList.appendChild(li);

    //Create a span delete
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("Delete");
    span.className = "delete";
    span.appendChild(txt);
    li.appendChild(span);

    //Delete item i list
    var close = document.getElementsByClassName("delete");
    for (var i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        var str = div.innerHTML;
        str = str.split("<");
        div.style.display = "none";
        deleteItemFromStorage(str[0]);
      }
    }

    //Create span Done
    var spanDone = document.createElement("SPAN");
    var doneText = document.createTextNode("Done");
    spanDone.className = "done";
    spanDone.appendChild(doneText);
    li.appendChild(spanDone);

    //Send to Done list
    var done = document.getElementsByClassName("done");
    for (var i = 0; i < done.length; i++) {
      done[i].onclick = function () {
        var divDone = this.parentElement;
        var str = divDone.innerHTML;
        str = str.split("<");
        setToDoneList(str[0]);
        divDone.style.display = "none";
        deleteItemFromStorage(str[0]);
        sendItemToDoneList(str[0]);
        console.log("before refresh ", str[0]);
      }
    }

  } else {
    alert("You must write something!");
  }

  document.getElementById("myInput").value = "";

}


// ************************************Refresh TodoList items
function refreshLocalStoredList(list) {

  var inputValue = list;

  var myList = document.getElementById("myList");
  var li = document.createElement("li");
  li.className = "listTag";
  var textNode = document.createTextNode(inputValue);
  console.log("Input Value: ", inputValue);
  li.appendChild(textNode);
  localStorage.setItem("allList", inputValue);
  setTodoListInLocalStorage(inputValue);

  myList.appendChild(li);

  //Create a span delete
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");
  span.className = "delete";
  span.appendChild(txt);
  li.appendChild(span);

  //Delete item i list
  var close = document.getElementsByClassName("delete");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      var str = div.innerHTML;
      str = str.split("<");
      console.log("Input from delete", str[0]);
      div.style.display = "none";
      deleteItemFromStorage(str[0]);
    }
  }

  //Create span Done
  var spanDone = document.createElement("SPAN");
  var doneText = document.createTextNode("Done");
  spanDone.className = "done";
  spanDone.appendChild(doneText);
  li.appendChild(spanDone);

  //Send to Done list
  var done = document.getElementsByClassName("done");
  for (var i = 0; i < done.length; i++) {
    done[i].onclick = function () {
      var divDone = this.parentElement;
      var str = divDone.innerHTML;
      str = str.split("<");
      setToDoneList(str[0]);
      divDone.style.display = "none";
      deleteItemFromStorage(str[0]);
      sendItemToDoneList(str[0]);
      console.log("after refresh ", str[0]);
    }
  }

}

// ********************************** Refresh DoneList items
function refreshDoneList(list) {
  var inputValue = list;

  var myDoneList = document.getElementById("myDoneList");
  var li = document.createElement("li");
  li.className = "checked";
  var textDone = document.createTextNode(inputValue);
  li.appendChild(textDone);
  localStorage.setItem("donelist", inputValue);  
  myDoneList.appendChild(li);
  sendItemToDoneList(inputValue);

  //Create a span delete
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");
  span.className = "done-delete";
  span.appendChild(txt);
  li.appendChild(span);

  var close = document.getElementsByClassName("done-delete");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      var str = div.innerHTML;
      str = str.split("<");
      console.log("Input from delete", str[0]);
      div.style.display = "none";
      deleteItemFromDoneList(str[0]);
    }
  }

}


// Set todo list into localstorege
function setTodoListInLocalStorage(item) {
  arrayItemList.push(item);
  localStorage.setItem("allItem", JSON.stringify(arrayItemList));
  console.log("ArrayList", arrayItemList);

}


//Function to Delete Todolist item from localStorage
function deleteItemFromStorage(item) {

  console.log("Item", item);
  var objsArray = JSON.parse(localStorage.getItem("allItem"));
  console.log("LocalStorage delete: ", objsArray);

  for (var i = 0; i < objsArray.length; i++) {

    if (objsArray[i] === item) { //str[0]
      objsArray.splice(i, 1); // index, how many
    }

  }
  localStorage.setItem('allItem', JSON.stringify(objsArray));
  objsArray = JSON.parse(localStorage.getItem("allItem"));
  console.log("LocalStorage after delete: ", objsArray);

}

//Function to Delete Doneitem from localStorage
function deleteItemFromDoneList(item) {
  
    console.log("DoneItem", item);
  
    var objsArray = JSON.parse(localStorage.getItem("donelist"));
    console.log("LocalStorage Done delete: ", objsArray);
  
    for (var i = 0; i < objsArray.length; i++) {
  
      if (objsArray[i] === item) { //str[0]
        objsArray.splice(i, 1);
      }
  
    }
    localStorage.setItem('donelist', JSON.stringify(objsArray));
    objsArray = JSON.parse(localStorage.getItem("donelist"));
    console.log("LocalStorage after Done delete: ", objsArray);
  
  }


  
// Send item from Todolist to DoneList
function sendItemToDoneList(item) {
  arrayDoneList.push(item);
  localStorage.setItem("donelist", JSON.stringify(arrayDoneList));
  console.log("DoneList", arrayDoneList);
}


//Creating the Todo list
function setToDoneList(item) {

  var ulList = document.getElementById("myDoneList");
  var li = document.createElement("li");
  li.className = "checked";
  var textNode = document.createTextNode(item);
  li.appendChild(textNode);
  ulList.appendChild(li);
  console.log(ulList);

  //Create a span delete
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");
  span.className = "done-delete";
  span.appendChild(txt);
  li.appendChild(span);

  //Delete item i list
  var close = document.getElementsByClassName("done-delete");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      var str = div.innerHTML;
      str = str.split("<");
      console.log("", str[0]);
      div.style.display = "none";
      deleteItemFromDoneList(str[0]);
    }
  }
}