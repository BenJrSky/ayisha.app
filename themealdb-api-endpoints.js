/**
 * TheMealDB API Endpoints
 * 
 * API gratuita per ricette culinarie con chiave di test "1" per sviluppo.
 * Per uso commerciale/pubblico è richiesta una chiave premium.
 * 
 * Base URL: https://www.themealdb.com/api/json/v1/1/
 * Test API Key: "1"
 */

const THEMEALDB_API = {
    BASE_URL: 'https://www.themealdb.com/api/json/v1/1/',
    TEST_KEY: '1',
    
    // ========== RICERCA PASTI ==========
    
    /**
     * Cerca pasti per nome
     * @param {string} mealName - Nome del pasto da cercare
     * @returns {string} URL dell'endpoint
     * @example searchByName('Arrabiata')
     */
    searchByName: (mealName) => 
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(mealName)}`,
    
    /**
     * Lista tutti i pasti che iniziano con una lettera specifica
     * @param {string} letter - Prima lettera del nome del pasto (a-z)
     * @returns {string} URL dell'endpoint
     * @example searchByFirstLetter('a')
     */
    searchByFirstLetter: (letter) => 
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
    
    // ========== DETTAGLI PASTI ==========
    
    /**
     * Ottiene i dettagli completi di un pasto tramite ID
     * @param {string|number} mealId - ID univoco del pasto
     * @returns {string} URL dell'endpoint
     * @example lookupById('52772')
     */
    lookupById: (mealId) => 
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    
    /**
     * Ottiene un pasto casuale
     * @returns {string} URL dell'endpoint
     */
    getRandomMeal: () => 
        'https://www.themealdb.com/api/json/v1/1/random.php',
    
    /**
     * Ottiene una selezione di 10 pasti casuali
     * ⚠️ SOLO API PREMIUM
     * @returns {string} URL dell'endpoint
     */
    getRandomSelection: () => 
        'https://www.themealdb.com/api/json/v1/1/randomselection.php',
    
    /**
     * Ottiene gli ultimi pasti aggiunti
     * ⚠️ SOLO API PREMIUM
     * @returns {string} URL dell'endpoint
     */
    getLatestMeals: () => 
        'https://www.themealdb.com/api/json/v1/1/latest.php',
    
    // ========== CATEGORIE E LISTE ==========
    
    /**
     * Lista tutte le categorie di pasti con descrizioni
     * @returns {string} URL dell'endpoint
     */
    getAllCategories: () => 
        'https://www.themealdb.com/api/json/v1/1/categories.php',
    
    /**
     * Lista tutte le categorie (solo nomi)
     * @returns {string} URL dell'endpoint
     */
    listCategories: () => 
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    
    /**
     * Lista tutte le aree geografiche
     * @returns {string} URL dell'endpoint
     */
    listAreas: () => 
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    
    /**
     * Lista tutti gli ingredienti
     * @returns {string} URL dell'endpoint
     */
    listIngredients: () => 
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    
    // ========== FILTRI ==========
    
    /**
     * Filtra pasti per ingrediente principale
     * @param {string} ingredient - Nome dell'ingrediente
     * @returns {string} URL dell'endpoint
     * @example filterByIngredient('chicken_breast')
     */
    filterByIngredient: (ingredient) => 
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`,
    
    /**
     * Filtra pasti per più ingredienti
     * ⚠️ SOLO API PREMIUM
     * @param {string[]} ingredients - Array di ingredienti
     * @returns {string} URL dell'endpoint
     * @example filterByMultipleIngredients(['chicken_breast', 'garlic', 'salt'])
     */
    filterByMultipleIngredients: (ingredients) => 
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.join(',')}`,
    
    /**
     * Filtra pasti per categoria
     * @param {string} category - Nome della categoria
     * @returns {string} URL dell'endpoint
     * @example filterByCategory('Seafood')
     */
    filterByCategory: (category) => 
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
    
    /**
     * Filtra pasti per area geografica
     * @param {string} area - Nome dell'area geografica
     * @returns {string} URL dell'endpoint
     * @example filterByArea('Italian')
     */
    filterByArea: (area) => 
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`,
    
    // ========== IMMAGINI ==========
    
    /**
     * Genera URL per thumbnail del pasto in diverse dimensioni
     * @param {string} imageUrl - URL originale dell'immagine
     * @param {string} size - Dimensione: 'small', 'medium', 'large'
     * @returns {string} URL dell'immagine ridimensionata
     */
    getMealThumbnail: (imageUrl, size = 'medium') => {
        const validSizes = ['small', 'medium', 'large'];
        if (!validSizes.includes(size)) {
            throw new Error(`Size must be one of: ${validSizes.join(', ')}`);
        }
        return `${imageUrl}/${size}`;
    },
    
    /**
     * Genera URL per thumbnail di un ingrediente
     * @param {string} ingredientName - Nome dell'ingrediente (spazi sostituiti con underscore)
     * @param {string} size - Dimensione: '', '-small', '-medium', '-large'
     * @returns {string} URL dell'immagine dell'ingrediente
     * @example getIngredientThumbnail('lime', '-medium')
     */
    getIngredientThumbnail: (ingredientName, size = '') => {
        const validSizes = ['', '-small', '-medium', '-large'];
        if (!validSizes.includes(size)) {
            throw new Error(`Size must be one of: ${validSizes.join(', ')}`);
        }
        const formattedName = ingredientName.replace(/\s+/g, '_').toLowerCase();
        return `https://www.themealdb.com/images/ingredients/${formattedName}${size}.png`;
    }
};

// ========== ESEMPI DI UTILIZZO ==========

/**
 * Esempi pratici di come utilizzare gli endpoint
 */
const examples = {
    // Cerca pasti con "chicken"
    searchChicken: THEMEALDB_API.searchByName('chicken'),
    
    // Pasti che iniziano con "a"
    mealsStartingWithA: THEMEALDB_API.searchByFirstLetter('a'),
    
    // Dettagli del pasto con ID 52772
    mealDetails: THEMEALDB_API.lookupById('52772'),
    
    // Pasto casuale
    randomMeal: THEMEALDB_API.getRandomMeal(),
    
    // Tutte le categorie
    categories: THEMEALDB_API.getAllCategories(),
    
    // Lista delle aree
    areas: THEMEALDB_API.listAreas(),
    
    // Pasti con pollo
    chickenMeals: THEMEALDB_API.filterByIngredient('chicken'),
    
    // Pasti di mare
    seafoodMeals: THEMEALDB_API.filterByCategory('Seafood'),
    
    // Pasti italiani
    italianMeals: THEMEALDB_API.filterByArea('Italian'),
    
    // Thumbnail ingrediente limone
    limeImage: THEMEALDB_API.getIngredientThumbnail('lime', '-medium')
};

// ========== HELPER FUNCTIONS ==========

/**
 * Funzione helper per fare richieste API
 * @param {string} url - URL dell'endpoint
 * @returns {Promise<Object>} Risposta JSON dell'API
 */
async function fetchFromAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Errore nella richiesta API:', error);
        throw error;
    }
}

/**
 * Funzione per cercare pasti con gestione errori
 * @param {string} query - Termine di ricerca
 * @returns {Promise<Object>} Risultati della ricerca
 */
async function searchMeals(query) {
    const url = THEMEALDB_API.searchByName(query);
    const data = await fetchFromAPI(url);
    
    if (!data.meals) {
        return { meals: null, message: 'Nessun pasto trovato' };
    }
    
    return data;
}

/**
 * Funzione per ottenere pasti per categoria
 * @param {string} category - Nome della categoria
 * @returns {Promise<Object>} Pasti della categoria
 */
async function getMealsByCategory(category) {
    const url = THEMEALDB_API.filterByCategory(category);
    return await fetchFromAPI(url);
}

// ========== EXPORT PER USO MODULO ==========

// Se utilizzato come modulo ES6
export default THEMEALDB_API;
export { examples, fetchFromAPI, searchMeals, getMealsByCategory };

// Se utilizzato in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        THEMEALDB_API,
        examples,
        fetchFromAPI,
        searchMeals,
        getMealsByCategory
    };
}

// ========== NOTE IMPORTANTI ==========

/*
LIMITAZIONI API GRATUITA:
- Chiave di test "1" solo per sviluppo ed educazione
- Alcune funzioni richiedono API Premium (€5/mese):
  * getRandomSelection() - 10 pasti casuali
  * getLatestMeals() - ultimi pasti
  * filterByMultipleIngredients() - filtro multi-ingrediente
  * Accesso completo al database (non limitato a 100 elementi)
  * Possibilità di aggiungere propri pasti e immagini

STRUTTURA RISPOSTA API:
- Ricerche: { "meals": [...] } o { "meals": null }
- Categorie: { "categories": [...] }
- Liste: { "meals": [...] } per filtri

FORMATI IMMAGINI:
- Pasti: JPG con dimensioni small/medium/large
- Ingredienti: PNG con suffissi -small/-medium/-large

ESEMPI URL:
- Cerca: /search.php?s=nome
- Prima lettera: /search.php?f=a
- Dettagli: /lookup.php?i=id
- Filtri: /filter.php?i=ingrediente&c=categoria&a=area
- Liste: /list.php?c=list&a=list&i=list
*/
