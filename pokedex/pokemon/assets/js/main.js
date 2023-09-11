const url_params =  new URLSearchParams(location.search);
const number = url_params.get('number');
const pkmn_type = url_params.get('type');
const pokemon_url = `https://pokeapi.co/api/v2/pokemon/${number}`
const pokemon_species = `https://pokeapi.co/api/v2/pokemon-species/${number}/`
const pokemon_evolutions = `https://pokeapi.co/api/v2/evolution-chain/${number}`
document.querySelector("#img2").setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`)
document.querySelector("body > main > section.container1").className = `container1 ${pkmn_type}`
console.log(number)

function get_api_infos(url){
    return fetch(url)
    .then((response) => response.json())
    .then((responses) => responses)
}
function pokemon_obj(pokemon){
    let pokemon_obj = new Pokemon_details()
    pokemon_obj.name = (() => {
        const firstChar = pokemon.name.charAt(0).toUpperCase();
        const remainingChars = pokemon.name.slice(1);
        return `${firstChar}${remainingChars}`;
    })();
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
        total_status: pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat
    }
    pokemon_obj.species = pokemon.species.name
    return pokemon_obj
}
function pokemon_obj_species(pokemon){
    let pokemon_obj = new Pokemon_species()
    let pokegender_rate = pokemon.gender_rate
    if(pokegender_rate != -1){
        let male_rate = (8 - pokegender_rate) * (100 / 8)
        let female_rate = pokegender_rate * (100 / 8) 
        pokemon_obj.genders_rate = {
            male: male_rate,
            female: female_rate
        }
    } else {
        pokemon_obj.genders_rate = 'none'
    }
    pokemon_obj.egg_groups = pokemon.egg_groups.map((value) => value.name).join(', ')
    pokemon_obj.egg_cycle = pokemon.hatch_counter + 1 
    let curiosity = pokemon.flavor_text_entries[0].flavor_text
    let curiosities = 
    //curiosity.replace('\f', ' ')
    pokemon_obj.curiosity = curiosity.replace("\n", ' ').replace("\f",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ').replace("\n",' ')
    return pokemon_obj
}

// function pokemon_obj_evolutions(pokemon){
//     let pokemon_obj = new Pokemon_evolutions()
//     let evolution_array = []
//     let chain = pokemon.chain
//     let arr
//     let chains
//     console.log(chain)

//     evolution_array.push(chain.species.name)
//     chains = chain.evolves_to
//     chain = chains
//     arr = chain.map((value) => {
//         let vl = value.evolves_to
//         let vlr
//         let array = []
//         while(vl.length != 0){
//             if (vl.length == 0){
//                 return value.species.name
//             }
//             vlr = vl.evolves_to
//         }

        
//     })
//     console.log(evolution_array)
//     console.log(arr)
//     evolution_array.push(arr)
//     console.log(evolution_array)

//     do{ 
//         if (chain.evolves_to.length != 0){
//             evolution_array = chain.evolves_to.map((value) => {
//                 evolution_array.push(value.species.name)
//                 return value
//             })
//             chains = chain.evolves_to
//             chain = chains
//         } 
//         console.log(evolution_array)
//     }while(chain.length != 0)

//     if (evolution_array.length != 0){
//         pokemon_obj.evolutions = evolution_array

//     } else {
//         pokemon_obj.evolutions = 'This pokemon has no evolution'
//     }
//     return pokemon_obj
     
// }

function convert_api_for_my_object(){
    function add_status(status, status_name_id, status_bar_id) {
        let bar_size 
        
        if(status < 150){
            bar_size = `${status}px`
        } else if (status > 150 && status < 200){
            bar_size = `${status/2}px`
        } else {
            bar_size = `${status/4}px`
        }
        document.querySelector(status_name_id).innerText = status
        document.querySelector(status_bar_id).setAttribute('width', bar_size)
    }
    function update_poke_infos (js_path, poke_info){
        document.querySelector(js_path).innerText = poke_info
    }
    get_api_infos(pokemon_url)
    .then(pokemon_obj)
    .then((response) => {
        console.log(response)
        update_poke_infos("head > title", response.name)
        update_poke_infos("#Species", response.species)
        update_poke_infos("#Heigth", `${response.height*10} cm`)
        update_poke_infos("#Weight", `${response.weight/10} kg`)
        update_poke_infos("#Abilities", response.abilities)
        add_status(response.status.hp, "span.attribute_value.hp", "#hp_bar")
        add_status(response.status.attack, "span.attribute_value.attack", "#attack_bar")
        add_status(response.status.defense, "span.attribute_value.defense", "#defense_bar")
        add_status(response.status.sp_atk, "span.attribute_value.sp_atk", "#spatk_bar")
        add_status(response.status.sp_def, "span.attribute_value.sp_def", "#spdef_bar")
        add_status(response.status.speed, "span.attribute_value.speed", "#speed_bar")
        add_status(response.status.total_status, "span.attribute_value.total_status", "#total_bar")
    })
    get_api_infos(pokemon_species)
    .then(pokemon_obj_species)
    .then((response) => {
        console.log(response)
        if(response.genders_rate != 'none'){
            document.querySelector('#Genders').innerHTML = `
            <span>Gender: </span>
            <div class="gender">
            <span>
                <img src="https://static.thenounproject.com/png/730605-200.png" alt="">
                <span id="gender_male">${response.genders_rate.male}</span>
            </span>
            </div>
            <div class="gender">
                <span>
                    <img src="https://static.thenounproject.com/png/390695-200.png" alt="">
                    <span id="gender_female">${response.genders_rate.female}</span>
                </span>
            </div>
            `
            update_poke_infos("#gender_male",`${response.genders_rate.male}%`)
            update_poke_infos("#gender_female",`${response.genders_rate.female}%`)
        } else {
            document.querySelector('#Genders').innerHTML = `<span>Gender: </span><div class="gender"><span style="font-weight:500">none</span></div>`
        }
        update_poke_infos("#egg_groups", response.egg_groups)
        update_poke_infos("#egg_cycle", response.egg_cycle)
        update_poke_infos("#curiosity_text", response.curiosity)
        
    })
}

convert_api_for_my_object()
