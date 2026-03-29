const register_form_cont = document.querySelector(".register-form-user-inp")
const login_form_cont = document.querySelector(".login-form-user-inp")
const login_header = document.querySelector(".login-header")
const register_header = document.querySelector(".register-header")

register_header.addEventListener("click",()=>{
    
    login_form_cont.style.display = "none"
    register_form_cont.style.display = "flex"

    login_header.style.borderColor = "#616873"
    register_header.style.borderColor = "white"
    
    user_action = false
    console.log(user_action)
    
})

login_header.addEventListener("click",()=>{
    
    login_form_cont.style.display = "flex"
    register_form_cont.style.display = "none"

    login_header.style.borderColor = "white"
    register_header.style.borderColor = "#616873"

    user_action = true
    console.log(user_action)

})


const user_list = JSON.parse(localStorage.getItem("user_list"))||[]
let user_action = true //login ie user exists

const login_register_form = document.querySelector("#login-register-form-body")
const login_register_user_fullname = document.querySelector("#user-fullname")
const login_register_user_email = document.querySelector("#user-email")
const login_register_user_name = document.querySelector("#username")
const login_register_user_password = document.querySelector("#password")
const login_register_user_repassword = document.querySelector("#re-password")

const username_email_login =  document.querySelector("#username-email-login")
const password_login = document.querySelector("#password-login")
let user_login_data
console.log("hhhh")
login_register_form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    //for already registered user eg. login
    if(user_action)
    {
        //const user_exist = user_list.find((user)=>{return user.user_name == username_email_login.value || user.email == username_email_login.value})
        //user_login_data = user_exist


        const reg_form_data = new FormData(login_register_form)
        const response = await fetch("api/login.php",{
            method: 'POST',
            body: reg_form_data
        })
        const result = await response.json()
        
        if(result.status == "error"){
            console.log(result.status)
            alert(result.message)
        }

        else if(result.status == "success"){
            console.log(result.status)
            window.location.href = "dashboard.php"
            refresh_log_reg_form()
        }   

        // if(user_exist){
        //     if(user_exist.password == password_login.value)
        //     {
        //         console.log("worked")
        //         localStorage.setItem("user_login_data", JSON.stringify(user_login_data))
        //         window.location.href = "dashboard.html"
        //     }
        //     else{
        //         alert("Password doesn't match")
        //     }
        // }
        // else{
        //     alert("User doesn't exists")
        // }
    }
    //for new user eg. register
    else{

        if(login_register_user_password.value != login_register_user_repassword.value){
            alert("password doesnt match")
        }

        const reg_form_data = new FormData(login_register_form)
        const response = await fetch("api/register.php",{
            method: 'POST',
            body: reg_form_data
        })
        const result = await response.json()
        
        
        if(result.status == "error"){
            console.log(result.status)
            alert(result.message)
        }

        else if(result.status == "success"){
            console.log(result.status)
            refresh_log_reg_form()
        }   
    }


})

const refresh_log_reg_form = ()=>{
    login_register_user_fullname.value = ""
    login_register_user_email.value = ""
    login_register_user_name.value = ""
    login_register_user_password.value = ""
    login_register_user_repassword.value = ""
}