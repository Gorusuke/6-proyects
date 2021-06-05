const apiKey = '7ec099b5a853bb30b09343cabcbf2f4d'
const page = 1
const ApiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
const imagePath = 'https://image.tmdb.org/t/p/w1280'

async function getMovies() {
  const response = await fetch(ApiUrl)
  const resultado = await response.json()

  resultado.results.forEach((element) => {
    const {
      // id,
      // original_title,
      // overview,
      // popularity,
      poster_path,
      // release_date,
      // vote_average,
    } = element
    const img = document.createElement('img')
    img.src = `${imagePath}${poster_path}`
    document.body.appendChild(img)
  })

  console.info(resultado.results)
}

getMovies()
