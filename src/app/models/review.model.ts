export class ReviewModel{

    constructor(
        public userEmail: string,
        public idPlace: string,
        public puntos: number,
        public descripcion: string
    ){}
}