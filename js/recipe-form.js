
// const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))||[]
// //so if there is no recipe is available in local storage (ie. false) than an empty array will be taken where 1st recipe is stored
// //and if there is recipe avialable than the srtingified recipe_list is taken from the local storage and converted to its original array version

const recipe_form = document.querySelector("#recipe-form")
const root_url = "http://localhost/Mom-s-Recipe-PHP/"


let edit_recipe_switch
let upload_recipe_img_db_src

const recipe_form_img_file_cont = document.querySelector(".recipe-form-img-file-cont")

const preview_recipe_img_db = (img)=>{
    
    let recipe_db_preview_img = recipe_form_img_file_cont.getElementsByTagName("img")
    //it returns an array if exist
    
    if(recipe_db_preview_img.length <=0 ){
        console.log("worked")
        let new_recipe_img_db = document.createElement("img")
        new_recipe_img_db.src = img
        recipe_form_img_file_cont.appendChild(new_recipe_img_db)
    }
    else{
        // console.log(upload_recipe_img_db_src)
        // console.log(recipe_db_preview_img[0].src)
        recipe_db_preview_img[0].src = img
    }

}




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

//ul_container => to add to container, li_type => name attr, ..value => text, id => ins id for edting(identify)
const create_new_li = (ul_container,li_type,li_inp_value,id)=>{
    const new_li = document.createElement("li")

    const new_li_hidden_input = document.createElement("input")
    new_li_hidden_input.name = li_type + "_id" + "[]"
    new_li_hidden_input.type = "hidden"

    const new_li_input = document.createElement("input")
    new_li_input.name = li_type + "[]"
    new_li_input.type = "text"

    const new_li_delete = document.createElement("input")
    new_li_delete.type = "button"
    new_li_delete.value = "X"

    if(li_inp_value){
        new_li_input.value = li_inp_value
        new_li_hidden_input.value = id
        console.log(new_li_hidden_input.value)
    }

    new_li.appendChild(new_li_input)
    new_li.appendChild(new_li_hidden_input)
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



const recipe_form_file = document.querySelector("#recipe-form-file")
const recipe_form_title = document.getElementById("recipe-form-title")
const recipe_form_desc = document.getElementById("recipe-form-desc")
const recipe_form_cook_hour = document.getElementById("recipe-form-cook-hour")
const recipe_form_cook_min = document.getElementById("recipe-form-cook-min")
const recipe_form_total_serving = document.getElementById("recipe-form-serving")
const recipe_form_recipe_id = document.querySelector("#recipe_id")//only for edit else null

//Form submission
recipe_form_file.addEventListener("change",()=>{
    const img = recipe_form_file.files[0]
    if(img){
        preview_recipe_img_db(URL.createObjectURL(img))
    }
    
})


recipe_form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    
    const recipe_form_data = new FormData(recipe_form)
    //For new recipe
    if(!edit_recipe_switch){
        recipe_form_file.required = true
        
        const response = await fetch("api/recipe-form.php",{
            method:"POST",
            body: recipe_form_data
        })
        const result = await response.json()
        console.log(result.status)
        if(result.status == "success"){
            console.log(result.status)
            // create_recipe_card_db()
            recipe_form_refresh()
        }
        
    }
    //For edit recipe
    else{
        const response = await fetch("api/recipe-form.php",{
        method: 'POST',
        body: recipe_form_data
        })
        const result = await response.json()
        console.log(result.status)
    }
  
})

//Load data to recipe form for editing
let load_data_to_recipe_form = async(recipe_id)=>{
    edit_recipe_switch = true
    //get data
    const response = await fetch("api/get_recipe_data.php",{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(recipe_id)
    })
    const result = await response.json()

    //load data
    recipe_form_recipe_id.value =  recipe_id
    recipe_form_title.value = result.title
    recipe_form_desc.value = result.description
    preview_recipe_img_db(root_url+"assets/user-uploads/"+result.img_link)
    recipe_form_cook_hour.value = result.cook_hour
    recipe_form_cook_min.value = result.cook_min 
    result.ingredient_list.forEach(li => {
        create_new_li(add_ingredient_list,"ingredient",li.value,li.id)
        
    })
    result.instruction_list.forEach(li => {
        create_new_li(add_instruction_list,"instruction",li.value,li.id)
    })
}



//for refreshing the form after submit and edit a recipe
// recipe_form.addEventListener("reset",()=>{
//     recipe_form_refresh()
// })

const recipe_form_refresh = ()=>{
    console.log("cleared")
    recipe_form.reset()
    add_ingredient_list.innerHTML=""
    add_instruction_list.innerHTML=""
    if(recipe_form_img_file_cont.getElementsByTagName("img")[0])
        recipe_form_img_file_cont.removeChild(recipe_form_img_file_cont.getElementsByTagName("img")[0])
    edit_recipe_card_db_element = ""
    upload_recipe_img_db_src = ""
}