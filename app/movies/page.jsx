"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchMovies = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsEmpty(false);

    try {
      const response = await fetch(
        `http://103.145.232.246/api/v1/search.php?search=${encodeURIComponent(query)}`,
        {
          // headers: {
          //   accept: "application/json, text/plain, */*",
          //   "accept-language": "en-US,en;q=0.5",
          //   "sec-gpc": "1",
          //   Referer: "http://103.145.232.246/",
          //   "Referrer-Policy": "strict-origin-when-cross-origin",
          // },
          method: "GET",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data && data.length === 0) {
        setIsEmpty(true);
      }
      setMovies(data || []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="text-center py-8">
          <p>Loading movies...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error: {error}</p>
        </div>
      )}

      {isEmpty && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No movies found. Try a different search term.</p>
        </div>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              {movie.poster && (
                <Image
                  src={`http://103.145.232.246//Admin/main/images/${movie.MovieID}/poster//${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-64 "
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                  height={400}
                  width={300}
                />
              )}
              {console.log(movie)}

              <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{movie.MovieTitle}</h2>
                <div className="grid grid-cols-2">
                  {movie.MovieYear && (
                    <p className="text-gray-400 text-sm mb-2">
                      Released: {movie.MovieYear}
                    </p>
                  )}
                  {movie.MovieRatings && (
                    <p className="text-gray-400 text-sm mb-2">
                      Rating: {movie.MovieRatings}
                    </p>
                  )}
                </div>
                <div>
                  <Link
                    href={`/movies/play?url=${movie.MovieWatchLink}`}
                    className="text-sm text-ellipsis line-clamp-2 text-blue-500 "
                  >
                    Watch here: {movie.MovieWatchLink}
                  </Link>
                </div>
                <div>
                  <Link
                    href={`${movie.MovieWatchLink}`}
                    target="_blank"
                    className="text-sm text-ellipsis line-clamp-2 text-blue-500 "
                    download
                  >
                    Download here: {movie.MovieWatchLink}
                  </Link>
                </div>
                <p className="text-gray-400 text-sm my-2 line-clamp-3 hover:line-clamp-none">
                  Story: {movie.MovieStory}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
