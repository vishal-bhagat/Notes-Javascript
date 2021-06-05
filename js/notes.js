showNotes();

function currentDate(date) {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    let cDate = (day + '/' + (month + 1) + '/' + year);
    return cDate;
}


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (addTitle.value == '' || addTxt.value == '') {
        alert('Can\'t add blank values');
    } else {


        let newNotesObj = {
            title: addTitle.value,
            text: addTxt.value,
            date: currentDate(),
            status: 'Pending'
        }

        notesObj.push(newNotesObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = '';
        addTitle.value = '';
    }

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {

        let pendingCss = "border-color : red"
        let doneCss = "border-color : green"
        
        let status;
        if (element.status == null || element.status == "Pending") {
            status = "Pending";
            displayCss = pendingCss;
            
        } else {
            status = element.status;
            displayCss = doneCss;
        }

        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem; ${displayCss}">
        <div class="card-body">
            <h5 class="card-title">${element.title.toUpperCase()}</h5>
            <p class="card-text">${element.text}</p>
            <p class="card-text">Date: ${element.date}</p>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="${index}" onchange='statusChange(this.id)'>
                <label class="form-check-label" for="flexCheckDefault" id="status">
                    ${status}
                </label>
            </div>
            <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
        </div>
    </div>`

    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerText = `Have not any notes. Use "Add Notes" to add new notes`;
    }
}

function statusChange(index) {
    let status = document.getElementById('status');
    let doneStatus = status.innerHTML = "Done";

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let singleNote = (notesObj[index]);

    let newNotesObj = {
        title: singleNote['title'],
        text: singleNote['text'],
        date: currentDate(),
        status: doneStatus
    }

    notesObj.splice(index, 1);

    notesObj.push(newNotesObj);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

function deleteNote(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();

    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});
