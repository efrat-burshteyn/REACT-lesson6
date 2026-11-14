import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
  fetch("https://dummyjson.com/recipes")
    .then((res) => {
      if (!res.ok) throw new Error("שגיאה בטעינת המתכונים");
      return res.json();
    })
    .then((data) => { setRecipes(data.recipes); })
    .catch((err) => { setError(err.message); })
    .finally(() => { setLoading(false); });
}, []);


  return (
    <div>
      <h1>רשימת מתכונים</h1>
      <p>כאן תמצאו את כל המתכונים!</p>
        {loading && <p>טוען...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.name}</h2>
              
            </li>
          ))}
        </ul>
    </div>
  );
}
