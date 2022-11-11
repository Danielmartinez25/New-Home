window.onload = function (){
    let categoryI = document.querySelector('.category-index')
    let menu = document.getElementById('menu')

    categoryI.addEventListener('click', ()=>{
        menu.classList.toggle('mostrar')
    });
}