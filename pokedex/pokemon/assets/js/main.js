const url_params =  new URLSearchParams(location.search);
const number = url_params.get('number');
const pkmn_name = url_params.get('name');
const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${number}`
const pokemon_species = `https://pokeapi.co/api/v2/pokemon-species/${number}/`
const pokemon_evolutions = `https://pokeapi.co/api/v2/evolution-chain/${number}`
console.log(number)

function get_api_infos(url){
    return fetch(url)
    .then((response) => response.json())
    .then((responses) => responses)
}
function pokemon_obj(pokemon){
    let pokemon_obj = new Pokemon_details()
    pokemon_obj.name = pokemon.name
    pokemon_obj.height = pokemon.height
    pokemon_obj.weight = pokemon.weight
    pokemon_obj.abilities = pokemon.abilities.map((value) => value.ability.name).join(', ')
    const poke_status = pokemon_obj.status = {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        sp_atk: pokemon.stats[3].base_stat,
        sp_def: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
    }
    pokemon_obj.total_status = poke_status.hp+poke_status.attack+poke_status.defense+poke_status.sp_atk+poke_status.sp_def+poke_status.speed
    pokemon_obj.species = pokemon.species.name
    return pokemon_obj
}
function pokemon_obj_species(pokemon){
    let pokemon_obj = new Pokemon_species()
    let pokegender_rate = pokemon.gender_rate
    let male_rate = (8 - pokegender_rate) * (100 / 8)
    let female_rate = pokegender_rate * (100 / 8) 
    pokemon_obj.genders_rate = {
        male: male_rate,
        female: female_rate
    }
    pokemon_obj.egg_groups = pokemon.egg_groups.map((value) => value.name).join()
    pokemon_obj.egg_cycle = pokemon.hatch_counter + 1 
    return pokemon_obj
}
function pokemon_obj_evolutions(pokemon){
    let pokemon_obj = new Pokemon_evolutions()
    let evolution_array = []
    let chain = pokemon.chain.evolves_to
    for (let i = 0; i < 6; i++){
        
    }
    // do{
    //     evolution_array.push(chain[0].species.name)
    //     console.log(evolution_array)
    //     // chain = chain.species.name
    // }while(chain.length != 0)
    console.log(chain)
    
    pokemon_obj.evolutions = pokemon.chain.species.name
    return pokemon

    // if (pokemon.chain.evolves_to.length == 0){
    //     pokemon_obj.evolutions = 'This pokemon has no evolution'
    // } else {
    //     let chain = pokemon.chain.evolves_to;
    //     let evolutions_array = []
    //     while (chain.length != 0){
    //         evolutions_array.push(chain[0].species.name)
    //         chain += chain[0].evolves_to
    //     }
    //     return pokemon_obj.evolutions = evolutions_array
       
    // }
     
}
function convert_api_for_my_object(object = ""){
    get_api_infos(pokemon_url)
    get_api_infos(pokemon_species)
    get_api_infos(pokemon_evolutions).then((v) => {
        console.log(pokemon_obj_evolutions(v))
    });
}
convert_api_for_my_object()
