import { User } from "./User";

export interface House {
  _id: string;
  title: string;
  city: string;
  country: string;
  price: string;
  currency: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  avgRating: number;
  reviewCount: number;
}

export interface HouseCardProps extends House {
  exchangeRate?: number;
}

export interface HouseWithUser extends House {
  userId: User;
}