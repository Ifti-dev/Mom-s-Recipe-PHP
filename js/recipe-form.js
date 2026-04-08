
// const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))||[]
// //so if there is no recipe is available in local storage (ie. false) than an empty array will be taken where 1st recipe is stored
// //and if there is recipe avialable than the srtingified recipe_list is taken from the local storage and converted to its original array version

const recipe_form = document.querySelector("#recipe-form")
const recipe_form_file = document.querySelector("#recipe-form-file")


let edit_recipe_card_db_element
// let upload_recipe_img_db_src

// const recipe_form_img_file_cont = document.querySelector(".recipe-form-img-file-cont")

// const preview_recipe_img_db = ()=>{
    
//     let recipe_db_preview_img = recipe_form_img_file_cont.getElementsByTagName("img")
//     //it returns an array if exist
    
//     if(recipe_db_preview_img.length <=0 ){
//         console.log("worked")
//         let new_recipe_img_db = document.createElement("img")
//         new_recipe_img_db.src = upload_recipe_img_db_src
//         recipe_form_img_file_cont.appendChild(new_recipe_img_db)
//     }
//     else{
//         // console.log(upload_recipe_img_db_src)
//         // console.log(recipe_db_preview_img[0].src)
//         recipe_db_preview_img[0].src = upload_recipe_img_db_src
//     }

// }




// let get_user_login_data = JSON.parse(localStorage.getItem("user_login_data"))

// const count_wishlist = ()=>{
//     let i = 0
//     current_user_recipe_list.forEach((recipe)=>{
//         i+=recipe.wishlist_count.length
//     })
//     return i
// }

//Ingredient and isnstruction create and delete
const add_ingredient_btn = document.querySelector("#add-ingredient-btn")
const add_instruction_btn = document.querySelector("#add-instruction-btn")
const add_ingredient_list = document.querySelector(".ingredient-list")
const add_instruction_list = document.querySelector(".instruction-list")


const create_new_li = (ul_container,li_type,li_inp_value)=>{
    const new_li = document.createElement("li")

    const new_li_input = document.createElement("input")
    new_li_input.name = li_type + "[]"
    new_li_input.type = "text"

    const new_li_delete = document.createElement("input")
    new_li_delete.type = "button"
    new_li_delete.value = "X"

    if(li_inp_value){
        new_li_input.value = li_inp_value
    }

    new_li.appendChild(new_li_input)
    new_li.appendChild(new_li_delete)

    ul_container.appendChild(new_li)
}

const delete_li = (e)=>{
    if(e.target.type == "button"){
        e.target.parentElement.remove()
    }
}


add_instruction_btn.addEventListener("click",()=>{
    create_new_li(add_instruction_list, "instruction")
})
add_ingredient_btn.addEventListener("click",()=>{
    create_new_li(add_ingredient_list, "ingredient")
})

add_ingredient_list.addEventListener("click",(e)=>{delete_li(e)})
add_instruction_list.addEventListener("click",(e)=>{delete_li(e)})

// const get_li_inp_text_value = (ul_container)=>{
//     const ul_list = ul_container.querySelectorAll("li")
//     return Array.from(ul_list).map((e)=>{
//         let list = e.querySelector("input")
//         if(list.type == "text")
//         {   
//             return list.value
//         }
//     })
// }

//Form submission
recipe_form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    
    const recipe_form_data = new FormData(recipe_form)
    //For new recipe
    if(!edit_recipe_card_db_element){
        // recipe_form_file.required = true
        
        const response = await fetch("api/recipe-form.php",{
            method:"POST",
            body: recipe_form_data
        })
        const result = await response.json()
        console.log(result.status)
        if(result.status == "success"){
            create_recipe_card_db()
        }
        
    }
    //For edit recipe
    // else{
    //         console.log(edit_recipe_card_db_element)
    //         let find_recipe_db = recipe_list.find((recipe)=>recipe.recipe_unique_id==edit_recipe_card_db_element)
            
    //         find_recipe_db.title = recipe_form_title.value,
    //         find_recipe_db.img = upload_recipe_img_db_src
    //         find_recipe_db.desc = recipe_form_desc.value,
    //         find_recipe_db.cook_hour = recipe_form_cook_hour.value,
    //         find_recipe_db.cook_min = recipe_form_cook_min.value,
    //         find_recipe_db.total_serving = recipe_form_total_serving.value,
    //         find_recipe_db.ingredient_list_data = get_li_inp_text_value(add_ingredient_list),
    //         find_recipe_db.instruction_list_data = get_li_inp_text_value(add_instruction_list),
    //         // find_recipe_db.recipe_id = recipe_list.length,
    //         find_recipe_db.recipe_unique_id = edit_recipe_card_db_element
    // }
    //console.log(edit_recipe_card_db_element)
    //console.log(recipe_list)
    //localStorage.setItem("recipe_list",JSON.stringify(recipe_list)) //storing recipe list in local storage in json string format 
    //it gets stored as stringified version of recipe_list = [] at first and then...
    
    //check_recipe_list_to_create_card_db()
    //To update recipe container in real time. Dont worry the func will not create cards multiple times as we are repfreshing it each time it is called = ``
    
    //recipe_form_refresh()
    //refreshing the form after submission
  
})
