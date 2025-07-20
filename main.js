const menu = document.querySelector(".my_bar");
const bar = document.querySelector(".bar");
const signupbar = document.querySelector(".signupbar");
const signupButton = document.querySelector(".signup");
const loginButton = document.querySelector(".login");
const my_registrations = document.querySelector(".my_registrations");
const hide_aricle = document.querySelector(".hide_aricle");
const hide_aricle1 = document.querySelector(".hide_aricle1");
const login = document.querySelector(".my_registration-login");
const loginbar = document.querySelector(".loginbar");

const my_confirm_email = document.querySelector('.my_confirm_email')
const submit = document.querySelector('.submit')
const submit1 = document.querySelector('.s')
const hide_aricle2 = document.querySelector(".hide_aricle2");

function remove() {
  bar.classList.remove("hide", "new");
}

function toggleSignupForm() {
  if (my_registrations.classList.contains("show")) {
    my_registrations.classList.remove("show");
  } else {
    my_registrations.classList.add("show");
  }
}
function toggleLoginupForm() {
  if (login.classList.contains("show")) {
    login.classList.remove("show");
  } else {
    login.classList.add("show");
  }
}
function toggleLoginupForm() {
  if (login.classList.contains("show")) {
    login.classList.remove("show");
  } else {
    login.classList.add("show");
  }
}

hide_aricle1.addEventListener("click", toggleLoginupForm);
loginButton.addEventListener("click", toggleLoginupForm);
loginbar.addEventListener("click", toggleLoginupForm);

signupButton.addEventListener("click", toggleSignupForm);
hide_aricle.addEventListener("click", toggleSignupForm);
signupbar.addEventListener("click", toggleSignupForm);




submit.addEventListener("click", () => {
  if(my_confirm_email.classList.contains('show1')){
    my_confirm_email.classList.remove('show1')
  }else{
    my_confirm_email.classList.add('show1')  
    my_registrations.classList.remove('show')
  }
})

submit1.addEventListener("click", () => {
  if(my_confirm_email.classList.contains('show1')){
    my_confirm_email.classList.remove('show1')
  }else{
    my_confirm_email.classList.add('show1')  
    login.classList.remove('show')
  }
})

hide_aricle2.addEventListener("click", () => {
  if(my_confirm_email.classList.contains('show1')){
    my_confirm_email.classList.remove('show1')
  }else{
    my_confirm_email.classList.add('show1')  
    login.classList.remove('show')
  }
})


menu.addEventListener("click", () => {
  if (bar.classList.contains("new")) {
    bar.classList.add("hide");
    bar.addEventListener("animationend", remove);
  } else {
    bar.classList.add("new");
    bar.removeEventListener("animationend", remove);
  }
});
