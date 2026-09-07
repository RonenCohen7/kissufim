
export interface userModel {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city:string;
    address: string;
    role: "customer" | "admin";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface LoginData {
    email: string;
    password: string;
}


export interface RegisterData {
    firstName: string;
    lastName:string;
    email:string;
    phone:string;
    city:string;
    address: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}