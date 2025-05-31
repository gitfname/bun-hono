import { Expose, Exclude } from "class-transformer"

export class UsersSerializer {
    @Expose()
    id: number;
    
    @Expose()
    username: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Exclude()
    password: string;
}