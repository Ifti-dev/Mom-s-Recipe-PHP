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
let pram = new URLSearchParams(window.location.search)
let slug = pram.get("slug")
    
const recipe_card_list = async()=>{
    let response = await fetch("api/create_archive_recipe_cards.php",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(slug)
    })
    let result = await response.text()
    recipe_card_container.innerHTML = result
}
recipe_card_list()


