"use client"
import { useState } from 'react';
import Image from 'next/image';
import './../../styles/style.css';

const Recipe = () => {
  const [Word, setWord] = useState('');
  const [recipe, setRecipe] = useState({ name: '', image: '', ingredients: {}, instruction: '' });
  const [load, setLoad] = useState(false);

  const Fetch = async () => {
    setLoad(true);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${Word}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals) {
        const meal = data.meals[0];
        const ingredients = {}
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredients[ingredient] = measure;
          } else {
            break;
          }
        }
        setRecipe({
          name: meal.strMeal,
          image: data.meals[0].strMealThumb,
          ingredients: ingredients,
          instruction: meal.strInstructions
        });
      } else {
        // If no meals found
        throw new Error('No meals found');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      
    } finally {
      
    }
  };

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="find a recipe.."
          id="inp-word"
          className='text-gray-900'
          value={Word}
          onChange={handleChange}
        />
        <button id="search-btn" onClick={Fetch}>Search</button>
      </div>
      <div className="result my-5" id="result">
  {load && (
    <div>
      <div className='flex flex-col justify-center items-center'>
      <h1 className='text-gray-900 font-bold font-satoshi'>{recipe.name}</h1>
      <Image src={recipe.image} alt={recipe.name} width={120} height={120}/>
      </div>
      <div className="ingredients-wrapper flex">
        <div className="column">
          <h2 className='text-gray-900 font-semibold'>Ingredients:</h2>
          <ul>
            {Object.entries(recipe.ingredients).map(([ingredient, measure], index) => (
              // Render only the first half of ingredients in the first column
              index < Math.ceil(Object.entries(recipe.ingredients).length / 2) && (
                <li className='text-gray-700' key={index}>{`${measure} ${ingredient}`}</li>
              )
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>&nbsp;</h2> 
                    <ul>
            {Object.entries(recipe.ingredients).map(([ingredient, measure], index) => (
              
              index >= Math.ceil(Object.entries(recipe.ingredients).length / 2) && (
                <li className='text-gray-700' key={index}>{`${measure} ${ingredient}`}</li>
              )
            ))}
          </ul>
          
        </div>
      </div>
      
    </div>
  )}
</div>



    </div>
  );
};

export default Recipe;
