import React, { useEffect, useState } from 'react'
import { PokemonCards } from './PokemonCards';
function PokemonApp() {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const Api = "https://pokeapi.co/api/v2/pokemon?limit=124";
  
    const fetchPokemon = async() => {
     try {
         const res = await fetch(Api);
         const data = await res.json();
 
         const detailedPokemonData = data.results.map(async(curPokemon) => {
         
             const res = await fetch(curPokemon.url)
             const data = await res.json()
             return data;
         })
 // console.log(detailedPokemonData)
         const detailedResponses = await Promise.all(detailedPokemonData)
         // console.log(detailedResponses)
         setPokemon(detailedResponses)
         setLoading(false)

     } catch (error){
        console.log(error)
        setLoading(false)
        setError(error)
     }

} 

    useEffect(() => {
        fetchPokemon();
    }, [])


    if(loading) {
        return(
            <div>
                <h1>Loading....</h1>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }

  return (
    <section className='container'>
        <header>
            <h1>Lets catch Pokemon</h1>
        </header>
        <div>
            <ul className='cards'>
                {
                    pokemon.map((curPokemon) => {
                    return <PokemonCards key={curPokemon.id} pokemonData = {curPokemon} />
                    })
                }
            </ul>
        </div>
    </section>
  )
}

export default PokemonApp 

