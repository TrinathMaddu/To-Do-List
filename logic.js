
const key = 'todo-data';
const storage = localStorage.getItem(key);
console.log(storage)
if (key in localStorage) {
    document.querySelector(".content").innerHTML = `${storage}`
}

cut(); change();yesno();


function check() {

    let ip = document.getElementById("iput").value;
    let tocheck = ip.trim();

    if (tocheck.length < 1) {
        document.getElementById("iput").value = tocheck;
        return;
    }

    document.querySelector(".content").innerHTML += `<div class="grp task">
    <input class="box todo" type="text" value="${ip}" disabled>
    <button id="btn" class="done"><img id="bts" src="./circle.png" ></button>
    <button id="btn" class="reset"><img id="bts" src="./trash.png" ></button>
    <button id="btn" class="edit"><img id="bts" class="edit-btn" src="./edit.png" ></button>
    </div>`;

    document.getElementById("iput").value = "";
    cut();
    change();
    yesno();

    localStorage.setItem(key, document.querySelector(".content").innerHTML);

}

function cut() {
    let bts = document.getElementsByClassName("task");

    Array.from(bts).forEach(e => {
        let cur = e.querySelector(".reset ");
        cur.addEventListener('click', () => {
            cur.parentElement.remove();
            localStorage.setItem(key, document.querySelector(".content").innerHTML);
        })
    });
}

function change() {
    let docs = document.getElementsByClassName("task");

    Array.from(docs).forEach(e => {
        let tochange = e.querySelector(".edit");
        let task = e.querySelector(".todo");
        tochange.addEventListener('click', () => {
            let childs=tochange.childNodes;
            let img=childs[0].src;
            let done=e.querySelector(".done").childNodes[0].src;
            if(img.indexOf('edit')!==-1 && done.indexOf('circle')!==-1){
                task.disabled = false;
                task.select();
                childs[0].setAttribute('src',"./confirm.png") ;
            }
            else{
                
                const val = task.value;
                task.setAttribute('value', val)
                task.disabled = true;
                childs[0].setAttribute('src',"./edit.png") ;
                localStorage.setItem(key, document.querySelector(".content").innerHTML);
            }
        })
    })
}


function yesno() {
    let bts = document.getElementsByClassName("task");
    Array.from(bts).forEach(e => {
        let task = e.querySelector(".done");
        let tochange = e.querySelector(".todo");

        task.addEventListener('click', () => {
            let childs=task.childNodes;
            let img=childs[0].src;
            let edit=e.querySelector(".edit").childNodes[0].src;
            if(img.indexOf('circle')!==-1 && edit.indexOf('edit')!==-1){
                tochange.classList.add("completed");
                childs[0].setAttribute('src',"./check.png") ;
            }
            else{
                
                tochange.classList.remove("completed");
                childs[0].setAttribute('src',"./circle.png") ;
            }
            localStorage.setItem(key, document.querySelector(".content").innerHTML);
        });
    });
}
