export class UserModel{

    constructor(
        public email: string,        
        public nombre: string,
        public apellidos: string,
        public telefono: string,
        public token: string    
    ){}
}