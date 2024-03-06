export class PlaceModel{

    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public puntuacion: string,
        public imagenes: Array<URL>,
        public opiniones: Array<string>
    ){}
}