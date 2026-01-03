import { useState, useEffect } from "react"

function App() {

  const [movie, setMovie] = useState('');
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchMovies = async () =>{

      if(!movie.trim()) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try{
        let url = `https://www.omdbapi.com/?t=${movie}&apikey=46e32d72`
        const res = await fetch(url);

        if(!res.ok){
          throw new Error("Api response is not working")
        }
        const data = await res.json();
        if(data.Response === "False"){
          setError("Movie not found. Please try another search.");
          setData(null);
        } else {
          setData(data);
          setError(null)
        }
      }catch(error){
        console.log("Error fetching movie data:", error);
        setError("Error fetching movie data. Please try again.");
      }finally{
        setLoading(false)
      }
    }
    fetchMovies();
  }, [movie])

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetchMovies();
  }

  return (
    <div className="container">
      <h1 className="app-header">🎬 Movie Search</h1>
      <p className="app-subtitle">Discover your favorite films instantly</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          onChange={(e) => setMovie(e.target.value)} 
          value={movie} 
          placeholder="Search Movies Here..." 
        />
        <button type="submit">Search</button>
      </form>

      <div className="Data">
        {loading && (
          <div className="loading">
            <span className="spinner"></span>
            Loading...
          </div>
        )}
        {error && <p className="error">{error}</p>}
        {!loading && !Data && !error && (
          <p className="empty-state">Enter a movie title above to begin searching</p>
        )}

        {Data && (
          <>
            <h1 className="title">{Data.Title}</h1>
            <img src={Data.Poster} alt={Data.Title} />
            <p className="year">📅 {Data.Year}</p>
            <p className="plot">{Data.Plot}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default App
