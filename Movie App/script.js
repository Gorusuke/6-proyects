const main = document.getElementById('container')
const apiKey = '7ec099b5a853bb30b09343cabcbf2f4d'
const page = 1
const ApiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
const imagePath = 'https://image.tmdb.org/t/p/w1280'

getMovies()

async function getMovies() {
  const response = await fetch(ApiUrl)
  const resultado = await response.json()
  addMovies(resultado.results)
}

function addMovies(data) {
  data.forEach((element) => {
    const {
      original_title,
      poster_path,
      vote_average,
      release_date,
      popularity,
      overview,
    } = element
    const movie = document.createElement('div')
    movie.classList.add('movie')
    movie.innerHTML = `
      <img src=${imagePath}${poster_path} alt=${original_title}>
      <div class="movie-info">
        <h3>${original_title}</h3>
        <span class=${voteAverage(vote_average)}>${vote_average}</span>
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
