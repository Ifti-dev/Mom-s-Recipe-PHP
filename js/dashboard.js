const logout_btn = document.querySelector("#logout")
logout_btn.addEventListener("click",()=>{
    localStorage.removeItem("user_login_data")
    window.location.href = "login.html"
})



//Form open and Form submission and json store

//It opens the recipe form and make the background body blur
const add_new_recipe_btn = document.querySelector("#add-new-recipe-btn")
const recipe_creation_form = document.querySelector("#recipe-creation-form")
add_new_recipe_btn.addEventListener("click",()=>{
    recipe_creation_form.classList.add("db-sec-active")
    document.body.classList.add("db-body-blur")
})





//Form cancle button it removes the recipe form and body background blur
const cancle_recipe_form = document.querySelector("#cancle-recipe-form")
cancle_recipe_form.addEventListener("click",()=>{
    recipe_creation_form.classList.remove("db-sec-active")
    document.body.classList.remove("db-body-blur")
    recipe_form_refresh()
    //so that the form gets refreshed after clicking cancle(specially for edit). else If we click add new recipe we will see previously clicked edit recipe data

})

// //Recipe card creation on dashboard 

const recipe_list_dashboard = document.querySelector(".recipe-list-body")

const create_recipe_card_db = async()=>{
    const response = await fetch("api/create_recipe_cards.php");
    const result = await response.text()
    recipe_list_dashboard.innerHTML = result
}
create_recipe_card_db()
// let current_user_recipe_list
// const check_recipe_list_to_create_card_db = ()=>{
//     recipe_list_dashboard.innerHTML = ``
    
//     //so that everytime we call the func the container is initially empty (refreshed)
//     //and check for the latest data on recipe_list
//     current_user_recipe_list = recipe_list.filter((recipe)=>recipe.user == get_user_login_data.user_name)

//     current_user_recipe_list.forEach(element => {
//        create_recipe_card_db(element.title,element.img,element.recipe_id,element.recipe_unique_id,element.slug)
//     });
// }
// check_recipe_list_to_create_card_db()

// //Dashboard Card page routing function 
// document.querySelector(".wrapper-main-container").addEventListener("click",(e)=>{
//     let card = e.target.closest(".recipe-dashboard-card")
//     if(card){
//         localStorage.setItem("curr_recipe",JSON.stringify(card.dataset.unique_id))
//         console.log("jgdjfijsfjs")
//     }
    
// })



//Recipe card deletion and edit on dashboard
const delete_btn_recipe_card_db = document.querySelector(".recipe-dashboard-card-del-btn")
const edit_btn_recipe_card_db = document.querySelector(".recipe-dashboard-card-edit-btn")
let get_recipe_data = null


recipe_list_dashboard.addEventListener("click",async(e)=>{
    let recipe_id = e.target.closest(".recipe-dashboard-card").dataset.unique_id
    // let find_recipe_db_element = recipe_list[find_recipe_db]

    // const response = await fetch("api/get_recipe_data.php",{
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body:JSON.stringify(recipe_id)
    // })
    // const result = await response.json()
    // get_recipe_data = {
    //             title : result.title,
    //             desc : result.description,
    //             img : result.img_link,
    //             cook_hour : result.cook_hour,
    //             cook_min : result.cook_min,
    //             total_serving : result.total_serving,
    //             ingredient_list : result.ingredient_list,
    //             instruction_list : result.instruction_list,
    //             recipe_id: recipe_id
    // }

    if(e.target.className == "recipe-dashboard-card-edit-btn"){
        // To make form visible
        recipe_creation_form.classList.add("db-sec-active")
        document.body.classList.add("db-body-blur")
        console.log(recipe_id)
        load_data_to_recipe_form(recipe_id)
    }
    // if(e.target.className == "recipe-dashboard-card-del-btn"){
    //     // console.log(e.target.closest(".recipe-dashboard-card").dataset.unique_id)
        
    //     recipe_list.splice(find_recipe_db,1)
    //     localStorage.setItem("recipe_list",JSON.stringify(recipe_list))

    //     e.target.closest(".recipe-dashboard-card").remove()
    // }
})
// // title,desc,img,cook_hour,cook_min,ingredient_list_data,instruction_list_data,recipe_id,unique_id
// const edit_recipe_card_db = (element)=>{
//     //here we are refreshing the form else previous list item will aso show in form
//     recipe_form_refresh()
//     edit_recipe_card_db_element = element.recipe_unique_id
//     // recipe_form_file.value = element.title
//     upload_recipe_img_db_src = element.img
//     recipe_form_file.required = false
//     preview_recipe_img_db()
    
//     recipe_form_title.value = element.title
//     recipe_form_desc.value = element.desc
//     recipe_form_cook_hour.value = element.cook_hour
//     recipe_form_cook_min.value = element.cook_min 
//     element.ingredient_list_data.forEach((e)=>{
//         create_new_li(add_ingredient_list,"ingredient",e)
        
//     })
//     element.instruction_list_data.forEach((e)=>{
//         create_new_li(add_instruction_list,"instruction",e)
//     })

// }


//My profile
const my_profile_head_info = document.querySelector(".my-profile-head-info")
const my_profile_form = document.querySelector(".my-profile-body")
const my_profile_head_fullname = document.querySelector("#my-profile-head-fullname")
const my_profile_head_email = document.querySelector("#my-profile-head-email")

const my_profile_email = document.querySelector("#my-profile-email")
const my_profile_username = document.querySelector("#my-profile-username")
const my_profile_fullname = document.querySelector("#my-profile-fullname")
const my_profile_password = document.querySelector("#my-profile-password")
const my_profile_new_password = document.querySelector("#my-profile-new-password")


let get_user_data = async()=>{
    let response = await fetch("api/get_user_data.php",{
        method: "POST",
        headers: {"Content-Type": "application/json"}
    })
    let result = await response.json()
    console.log(result.status)

    my_profile_head_fullname.textContent = result.fullname
    my_profile_head_email.textContent = result.email

    my_profile_fullname.value = result.fullname
    my_profile_email.value = result.email
    my_profile_username.textContent = result.username
}
get_user_data()




my_profile_form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const profile_form_data = new FormData(my_profile_form)
    const response = await fetch("api/update_user_info.php",{
        method:"POST",
        body: profile_form_data
    })
    const result = await response.json()
   
    // current_user.full_name = my_profile_fullname.value
    // current_user.email = my_profile_email.value
    if(my_profile_password.value != ""){
        set_new_password()
    }
    
  
})

const set_new_password = ()=>{
    if(get_user_login_data.password == my_profile_password.value){
        if(my_profile_new_password.value!=""){
            current_user.password = my_profile_new_password.value
        }
    }
    else{
        alert("Password Doesn't Match")
    }

}

// //profile pic upload
// const profile_pic_file_input = document.querySelector("#profile-pic-file-input")
// const profile_pic = document.querySelector("#profile-pic")
// const profile_pic_default = document.querySelector("#profile-pic-default")

// profile_pic_file_input.addEventListener("input",()=>{
//     let img_file = profile_pic_file_input.files[0]
//     let reader = new FileReader()
//     reader.readAsDataURL(img_file)
//     reader.onload = ()=>{
//         current_user.profile_pic = reader.result
//         localStorage.setItem("user_list",JSON.stringify(user_list))
//         update_profile_pic()
//     }  
// })

// const update_profile_pic = ()=>{
    
//     if(current_user.profile_pic !=""){
//         profile_pic.src = current_user.profile_pic
//         profile_pic.style.display = "block"
//         profile_pic_default.style.display = "none"
//         console.log("ooo")    
//     }

//     else{
//         profile_pic_default.textContent = current_user.user_name[0]
//         profile_pic.style.display = "none"
//         profile_pic_default.style.display = "block"
//     }
// }
// update_profile_pic()


// //dashboard section
// const user_total_recipe = document.querySelector("#user-total-recipe")
// const user_total_wishlist = document.querySelector("#user-total-wishlist")
// user_total_recipe.textContent = current_user_recipe_list.length
// user_total_wishlist.textContent = count_wishlist()


// Dashboard sidebar
const dashboard_sidebar_options_container = document.querySelector(".dashboard-sidebar-options-container")
const db_sec_container = document.querySelectorAll(".db-sec-container")
const db_sidebar_opt = document.querySelectorAll(".db-sidebar-opt")

dashboard_sidebar_options_container.addEventListener("click",(e)=>{
    if(e.target.tagName == "LI"){
        db_sidebar_opt.forEach(opt=>opt.classList.remove("db-sidebar-opt-active"))
        e.target.classList.add("db-sidebar-opt-active") 
        db_sec_container.forEach(container=>{
            container.classList.remove("db-sec-active")
            if(e.target.dataset.section == container.id){
                container.classList.add("db-sec-active")
            }
        })
        
    }
    
})


// //My wishlist section
// const wishlist_dashboard = document.querySelector(".wishlist-body")
// const delete_btn_wishlist_card_db = document.querySelector(".recipe-dashboard-wishlist-delete-btn")

// const create_wishlist_card_db = (title,img_src,recipe_id,recipe_unique_id,slug)=>{
//     let new_recipe = `
//                     <div class="recipe-dashboard-card" data-unique_id ="${recipe_unique_id}">
//                         <div class="recipe-dashboard-card-img">
//                             <img src="${img_src}" alt="">
//                         </div>
//                         <div class="recipe-dashboard-card-body">
//                             <div class="recipe-dashboard-card-info">
//                                 <h3><a href="recipe-page.html?slug=${slug}">${title}</a></h3>
//                                 <p>Recipe Id: <span>${recipe_id}</span></p>
//                             </div>
                            
//                             <div class="recipe-dashboard-card-buttons">
//                                 <button class="recipe-dashboard-wishlist-delete-btn"><i class="fa-solid fa-pen"></i> Delete</button>
//                             </div>
//                         </div>
//                     </div>
//     `
//     wishlist_dashboard.innerHTML += new_recipe
// }

// let current_user_wishlist = current_user.wishlist
// const check_wishlist_to_create_card_db = ()=>{
//     wishlist_dashboard.innerHTML = ``
    
//     //so that everytime we call the func the container is initially empty (refreshed)
//     //and check for the latest data on recipe_list

//     current_user_wishlist.forEach(element => {
//         console.log(element)
//         let wishlisted_recipe = recipe_list.find(recipe=> recipe.recipe_unique_id == element)
//         if(wishlisted_recipe) 
//             create_wishlist_card_db(wishlisted_recipe.title,wishlisted_recipe.img,wishlisted_recipe.recipe_id,wishlisted_recipe.recipe_unique_id,wishlisted_recipe.slug)
//     });
// }
// check_wishlist_to_create_card_db()

// //My wishlist deletion function
// wishlist_dashboard.addEventListener("click",(e)=>{
//     let find_wishlist_db = current_user_wishlist.findIndex((wishlist)=>wishlist == e.target.closest(".recipe-dashboard-card").dataset.unique_id)
    
//     if(e.target.className == "recipe-dashboard-wishlist-delete-btn"){
//         // console.log(e.target.closest(".recipe-dashboard-card").dataset.unique_id)
        
//         current_user_wishlist.splice(find_wishlist_db,1)
//         localStorage.setItem("user_list",JSON.stringify(user_list))

//         e.target.closest(".recipe-dashboard-card").remove()
//     }
// })


//for refreshing the form after submit and edit a recipe
// const recipe_form_refresh = ()=>{
//     recipe_form_file.value=""
//     recipe_form_title.value=""
//     recipe_form_desc.value=""
//     recipe_form_cook_hour.value=""
//     recipe_form_cook_min.value=""
//     recipe_form_total_serving.value=""
//     add_ingredient_list.innerHTML=""
//     add_instruction_list.innerHTML=""
//     if(recipe_form_img_file_cont.getElementsByTagName("img")[0])
//         recipe_form_img_file_cont.removeChild(recipe_form_img_file_cont.getElementsByTagName("img")[0])
//     edit_recipe_card_db_element = ""
//     upload_recipe_img_db_src = ""
// }