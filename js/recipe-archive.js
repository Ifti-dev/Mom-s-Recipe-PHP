const recipe_card_container = document.querySelector(".recipe-card-container")

// const recipe_owner = (user_name)=>{
//     return user_list.find((user)=>user.user_name==user_name)
// }

//Recipe list checker
// let recipe_show_list
// if(document.body.id=="creator-profile-page"){
//     let pram = new URLSearchParams(window.location.search)
//     let slug = pram.get("slug")
//     recipe_show_list = recipe_list.filter(recipe=>recipe.user == slug) 
// }
// else{
//     recipe_show_list = recipe_list
// }
    
const recipe_card_list = async()=>{
    let response = await fetch("api/create_archive_recipe_cards.php",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify("")
    })
    let result = await response.text()
    recipe_card_container.innerHTML = result
}
recipe_card_list()

//if we directly use document.q... to the pic or default pic it will select all cards and as we can't use id to get the specific card, 
//we take the last card of the container which is added at the previous line(eg. latest card)and update that cards elements
// const curr_card = recipe_card_container.lastElementChild

// const profile_pic = curr_card.querySelector(".profile-pic")
// const profile_pic_default = curr_card.querySelector(".profile-pic-default")

// if(recipe_owner(recipe.user).profile_pic !=""){
//     profile_pic.src = recipe_owner(recipe.user).profile_pic
//     profile_pic.style.display = "block"
//     profile_pic_default.style.display = "none"
//     console.log("ooo")    
// }

// else{
//     profile_pic_default.textContent = recipe_owner(recipe.user).user_name[0]
//     profile_pic.style.display = "none"
//     profile_pic_default.style.display = "block"
// }

