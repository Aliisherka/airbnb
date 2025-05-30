import { User } from "./User";

export interface Review {
  comment: string;
  rating: number;
  createdAt: string;
  userId: User;
}