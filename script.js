const url = "https://rickandmortyapi.com/api/character/?page=";
let allPages = 37;
let page = 1;

async function loadPage(){
    let result = await fetch(url + page);
    if(result.ok){
        return await result.json()
    }
    throw  new Error("Error Load Page!")
};

function createList(){
    const list = document.createElement("ul");
    list.className = "list";

    return list
};

function createSelect(number){
    const select = document.createElement("select");
    for( let i = 1; i <= number; i++){
        const option = document.createElement("option");
        option.value = i;
        option.innerText = "Page " + i;
        select.appendChild(option)
    }
    return select
};

const select = createSelect(allPages);
document.body.appendChild(select);
document.body.appendChild(createList())

select.addEventListener("change",  (event) => {
    page = event.target.value
});

class Button {
    #button
    constructor({ text = "GET DATA", onClick } = {}){
        this.#button = document.createElement("button");
        this.#button.innerHTML = text

        this.#button.addEventListener("click", async () => {
            this.disabled = true;
            this.name = "DATA LOADING...";

            try{
                const { results } = await onClick();
                const list = document.querySelector("ul");
                list.innerText = "";
                for(let char of results){
                    const li = document.createElement("li");
                    li.innerText = char.name;
                    list.appendChild(li)
                }
            }catch(err){
                console.error("some onClick Error", err)
            }finally{
                this.disabled = false;
                this.name = text;
            }
        })
    }
    set text(value){
        this.#button.innerHTML = value
    }
    set disabled(value){
        this.#button.disabled = value
    }
    render(){
        document.body.prepend(this.#button);
    }
};

let button = new Button({onClick: loadPage})
button.render()
