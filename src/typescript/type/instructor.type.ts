import type { InstructorListInterface } from "../interface/instructor.interface";

export type instructorInitialState = {
  error: string | null;
  InstructorLoading: boolean;
  totals: number;
  page: number;
  instructorList: InstructorListInterface[];
};

export type InstructorFormData = {
  name: string;
  email: string;
  bio: string;
  experience: string;
  skills: string;
  phone: string;
  image?: File | null;
};
