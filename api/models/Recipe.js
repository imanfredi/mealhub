

const recipeSchema = {
    title : {
        type: String,
        required : true 
    },
    description: {
        type: String,
        default: ''
    },   
    ingredients: {
        type: [],
        required: true        
    },
    n_ingredients:{
        type: Number,
        
    },
    steps:{
        type: String,
        required: true
    },
    n_steps:{
        type: Number,
    },
    minutes:{
        type:Number,
    },
    tags:{
        type:[],
    },
    nutrition:{
        type : {
            calories:{
                type:Number
            },
            totalFat:{
                type:Number
            },
            sugar:{
                type:Number
            },
            sodium:{
                type:Number
            },
            protein:{
                type:Number
            },
            saturatedFat:{
                type:Number
            },
            carbohydrates:{
                type:Number
            },
        }

    } 


}


module.exports = recipeSchema;