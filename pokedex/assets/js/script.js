function create_element(element, element_attributes = {}){  
    let new_element = document.createElement(element);
    element_attributes.class_name ? new_element.setAttribute('class', element_attributes.class_name) : '';
    element_attributes.id ? new_element.setAttribute('id', element_attributes.id) : '';
    element_attributes.type ? new_element.setAttribute('type', element_attributes.type) : '';
    element_attributes.data_value ? new_element.innerText = element_attributes.data_value : '';
    element_attributes.href ? new_element.setAttribute('href', element_attributes.href) : '';
    element_attributes.src ? new_element.setAttribute('src', element_attributes.src) : '';
    element_attributes.alt ? new_element.setAttribute('alt', element_attributes.alt) : '';
    return new_element
}
function convert_pokemon_to_html(pokemon){
    let new_a = create_element('a', {href:`/exercicios_e_projetos/pokedex/pokemon?number=${pokemon.number}&name=${pokemon.name}`})
    let new_li = create_element('li', {class_name: `pokemon ${pokemon.type}`});
    let new_span1 = create_element('span', {class_name:'number', data_value: `#${pokemon.number}`});
    let new_span2 = create_element('span', {class_name:'name', data_value: pokemon.name});
    let new_div = create_element('div', {class_name:'details'});
    let new_img = create_element('img', {src:pokemon.photo, alt:`${pokemon.name}-image`});
    let new_ol = create_element('ol', {class_name: 'types'});
    new_ol.innerHTML += pokemon.types.map((type) => `<li class="${type} type">${type}</li>`).join('')
    new_div.append(new_img,new_ol);
    new_li.append(new_span1,new_span2,new_div);
    new_a.append(new_li)
    return new_a;
}
function load_pokemons(offset,limit){
    const pokemon_ol = document.getElementById('pokemon_list');
    PokeApi.get_pokemons(offset,limit)
    .then((pokemon_list) => {
        pokemon_list.forEach((element) => {pokemon_ol.append(convert_pokemon_to_html(element));});  
    })
    .catch((error) => console.error(error))
    .finally(() => console.log('API consumida com sucesso!'));
}

const load_more_btn = document.getElementById('load_more_btn');
const limit_max = 151
const limit = 10
let offset = 0

load_pokemons(offset,limit);

load_more_btn.addEventListener('click', () => {
    offset += limit;
    const count_for_next_page = offset + limit;
    if (count_for_next_page >= limit_max){
        const new_limit = max_limit - offset
        load_pokemons(offset, new_limit)
        load_more_btn.parentElement.removeChild(load_more_btn);
    } else {
        load_pokemons(offset, limit)
    }
})
