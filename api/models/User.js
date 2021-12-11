const UserSchema = {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    favoriteRecipes: {
        type: [],
    },
    favoriteIngredients:{
        type: [],
    },    

    recipes: {
        type: String,
        required: true
    }



}