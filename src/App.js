import React, {useEffect , useState} from 'react';
import './App.css';
import Recipes from './Recipes';

function App() {

  const APP_ID = '399f4b78';
  const APP_KEY = '6d985426b863bb94cf847897e7831891';
 
  const [recipes , setRecipes] = useState([]);
  const [search , setSearch] = useState('');
  const [query , setQuery] = useState('chicken');
  
  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
    console.log(data.hits);
    
  }

  const UpdateSearch = (e)=>{
    setSearch(e.target.value);
    
  }
 
  const getSearch = (e) =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form className="search_form" onSubmit={getSearch}>
        <input type="text" className="search_bar" value={search} onChange={UpdateSearch}/>
        <button type="submit" className="search_button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>( <Recipes
      key={recipe.recipe.label} 
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />))}
      </div>
    </div>
  );
}

export default App;
