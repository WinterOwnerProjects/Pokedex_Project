let inputs = document.querySelectorAll('input[name="menu_options"]');
let labels = document.querySelectorAll('label')
let t = ['About']
labels.forEach((label) =>{
    label.addEventListener('click', () => {
        if (t[0] != label.innerText){
            document.querySelector(`label[for="${t[0]}"]`).classList.remove("onclicked");
            label.className = 'onclicked';
            document.querySelector(`#${t[0]}-text`).style.display = "none"
            t.unshift(label.innerText);
            document.querySelector(`#${t[0]}-text`).style.display = "block"
        } 
        t.pop();
    });
});