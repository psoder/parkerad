import { User } from "./UserTypes";

export interface Review {
  id: number;
  rating: number;
  text: string;
  user: User;
}

export interface Bench {
  id: number;
  location: string;
  longitude: number;
  latitude: number;
  description?: string;
  image?: string;
}

export interface BenchReview {
  bench: Bench;
  reviews: Review[];
}
