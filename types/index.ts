import { Models } from "node-appwrite";

export interface Profile extends Models.Document {
    userId: string;
    fullName: string;
    idNumber: string;
    phone: string;
    tscNumber: string;
    currentInstitution: string;
    currentCounty: string;
    currentSubCounty?: string;
    courseQualified: string[];
    yearsOfExperience: number;
    isOpenToSwap: boolean;
    desiredCounties?: string[];
    desiredInstitutions?: string[];
    availabilityDate?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface CreateProfileFormData {
    fullName: string;
    idNumber: string;
    phone: string;
    tscNumber: string;
    currentInstitution: string;
    currentCounty: string;
    currentSubCounty: string;
    subject1: string;
    subject2: string;
    subject3?: string;
    yearsOfExperience: number;
    isOpenToSwap: boolean;
    desiredCounties?: string[];
    desiredInstitutions?: string[];
    availabilityDate?: string;
}
