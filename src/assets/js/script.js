export var toggleIconFa = document.querySelectorAll('.toggle-icon-fa');
export var toggleTitle = document.querySelectorAll('.toggle-title');
export var toggleStatus = [false, false, false];
export const myFun = () =>{
    
for (let i = 0; i < toggleTitle.length; i++) {

    toggleTitle[i].addEventListener('click', () => {
      toggleStatus[i] = !toggleStatus[i];
  
      if (toggleStatus[i]) {
        toggleIconFa[i].classList.remove("fa-arrow-circle-down");
        toggleIconFa[i].classList.add("fa-arrow-circle-up");
      } else {
        toggleIconFa[i].classList.remove("fa-arrow-circle-up");
        toggleIconFa[i].classList.add("fa-arrow-circle-down");
      }
    })
  }
}

myFun();