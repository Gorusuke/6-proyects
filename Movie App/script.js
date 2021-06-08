const main = document.getElementById('container')
const form = document.getElementById('form')
const search = document.getElementById('search')

const apiKey = '7ec099b5a853bb30b09343cabcbf2f4d'
const page = 1
const ApiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
const imagePath = 'https://image.tmdb.org/t/p/w1280'

getMovies(ApiUrl)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (search.value === '') return
  const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}&page=${page}`
  getMovies(searchApi)
  search.value = ''
})

async function getMovies(url) {
  const response = await fetch(url)
  const resultado = await response.json()
  console.info(resultado.results)
  addMovies(resultado.results)
}

function addMovies(data) {
  main.innerHTML = ''
  data.forEach((element) => {
    const { title, poster_path, vote_average, release_date, overview } = element
    const movie = document.createElement('div')
    movie.classList.add('movie')
    movie.innerHTML = `
      <img src=${imagePath}${poster_path} alt=${title}>
      <div class="movie-info">
        <h3>${title}</h3>
        <span class=${voteAverage(vote_average)}>${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview: </br> <span>${overview}</span></h3>
        <div class="release-date">
          <h4>Release:</h4>
          <span>${release_date}</span>
        </div>
      </div>
    `
    const img = document.createElement('img')
    img.src = `${imagePath}${poster_path}`
    main.appendChild(movie)
  })
}

function voteAverage(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}
