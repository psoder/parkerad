import { User } from "./UserTypes";

export type Review = {
  id: number;
  rating: number;
  text: string;
  user: User;
}

export type Bench = {
  id: number;
  location: string;
  longitude: number;
  latitude: number;
  description?: string;
  image?: string;
}

export type BenchReview =  {
  bench: Bench;
  reviews: Review[];
}
