import React from 'react'
import { useParams } from 'react-router'
import {useState,useEffect} from 'react'
export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    useEffect(() => {
        setLoading(true);
        setError("");
        fetch(`https://dummyjson.com/recipes/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("המתכון לא נמצא");
                }
                return res.json();
            })
            .then((data) => {
                setRecipe(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
            
    }, [id]);

    return (
        <div>
             <h1>מתכון מספר {id}</h1>
            {loading && <p>טוען...</p>  }
             { error && <p>{error}</p>  }
              {(recipe && (
                <div>
                    <h1>{recipe.name}</h1>
                    <p> זמן ההכנה: {recipe.prepTimeMinutes} זמן בישול: {recipe.cookTimeMinutes}  מספר מנות: {recipe.servings} רמת קושי: {recipe.difficulty} </p>
                    <img src={recipe.image} alt={recipe.name} width="300"/>
                    <h3>מצרכים</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>הוראות הכנה</h3>
                    <ol>
                        {recipe.instructions.map((instruction,index)=>(
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>

                    
                    </div>
            ))}
        </div>
    )
}
