export interface TrendingFilm {
  adult: boolean;
  backdrop_path: string | null;
  genre_id: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface AdditionalInfoForTrendingFilm extends TrendingFilm {
  belongs_to_collection: [];
  budget: number;
  homepage: string;
  production_companies: [];
  production_countries: [];
  revenue: number;
  runtime: number;
}
