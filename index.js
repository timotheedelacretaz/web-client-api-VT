let toAppend = document.getElementById('append')
let modal = document.getElementById("myModal");

let btnAdd = document.getElementById("myBtn");
let btnModalAdd = document.getElementById("add");
let btnModalPut = document.getElementById("put");

let spanClose = document.getElementsByClassName("close")[0];

const url = "http://localhost:3000/api/";
function postItem(obj){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const request = new Request(url + "todo", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(obj),
    });
    try {
        fetch(request).then((res) => {
            if (res.status === 200) {
                modal.style.display = "none";
                location.reload();
            }
        })
    }catch(err){
        console.log(err)
    }
}
function deleteItem(id) {
    const request = new Request(url+'todo/'+id, {
        method: "DELETE",
    });
    try {
        fetch(request).then((res) => {
            if (res.status === 200) {
                location.reload();
            }
        })
    }catch(err){
        console.log(err)
    }
}
function putItem(id){
    let nameInput = document.getElementById("addname").value;
    let contentInput = document.getElementById("addcontent").value;
    let jsonObj = {name:nameInput,content:contentInput};
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const request = new Request(url+'todo/'+id, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(jsonObj),
    });
    try {
        fetch(request).then((res) => {
            if (res.status === 200) {
                modal.style.display = "none";
                location.reload();
            }
        })
    }catch(err){
        console.log(err)
    }
}

window.addEventListener(('load'),(e)=>{
    fetch(url+"todos").then((res)=>
        {res.json().then((resJson)=>
            {resJson.map((x)=>{
                let tr = document.createElement('tr')
                tr.value=x.id
                let th = document.createElement('th')
                th.innerText=x.name
                tr.appendChild(th.cloneNode(true))
                th.innerText=x.content
                tr.appendChild(th.cloneNode(true))
                th.innerText=''
                let btn2 = document.createElement('button')
                btn2.textContent='modify todo'
                btn2.addEventListener('click',() => {
                    btnModalPut.style.display='block';
                    btnModalAdd.style.display='none';
                    modal.style.display = "block";
                    document.getElementById("addname").value = x.name;
                    document.getElementById("addcontent").value = x.content;
                    btnModalPut.value=x.id;
                })
                let btndelete = document.createElement('button')
                btndelete.textContent='delete todo'
                btndelete.addEventListener('click',() => deleteItem(tr.value))
                th.appendChild(btn2)
                th.appendChild(btndelete)
                tr.appendChild(th)
                toAppend.appendChild(tr)
            })
        })
    })
})
btnModalAdd.addEventListener('click', async () => {
    {
        let addname = document.getElementById("addname").value;
        let addcontent = document.getElementById("addcontent").value;
        postItem({name:addname,content:addcontent})
    }
})
btnModalPut.addEventListener('click', async () => {
    {
        putItem(btnModalPut.value)
    }
})
// When the user clicks on the button, open the modal
btnAdd.onclick = function() {
    modal.style.display = "block";
    btnModalPut.style.display='none';
    btnModalAdd.style.display='block';
    document.getElementById("addname").value = '';
    document.getElementById("addcontent").value = '';
}

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}




