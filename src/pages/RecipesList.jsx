import { Link ,useSearchParams } from "react-router";
import { useState, useEffect ,useRef} from "react";

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("q") || "";
    const searchRef = useRef(null);
  

    const handleSearch = (event) => {
      setSearchParams({ q: event.target.value }, { replace: search !== ""});
    };
    const filteredRecipes = (recipesList) => {
        let Recipes = recipesList.filter((recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
      );
      if (Recipes.length === 0) {
        return [{ id: 0, name: "לא נמצאו מתכונים" }];
      }
      return Recipes;
    };
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


  useEffect(() => {
      searchRef.current?.focus();
    }, []);

  return (
    <div>
      <h1>רשימת מתכונים</h1>
      <p>כאן תמצאו את כל המתכונים!</p>
        {loading && <p>טוען...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input placeholder="חפש מתכון..."   value={search} onChange={handleSearch} ref={searchRef} />
        <ul>
          {filteredRecipes(recipes).map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <h2>{recipe.name}</h2>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}
