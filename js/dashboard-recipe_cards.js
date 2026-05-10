//Recipe card creation on dashboard 

const recipe_list_dashboard = document.querySelector(".recipe-list-body")

const create_recipe_card_db = async()=>{
    const response = await fetch("api/create_recipe_cards.php");
    const result = await response.text()
    recipe_list_dashboard.innerHTML = result
}
create_recipe_card_db()