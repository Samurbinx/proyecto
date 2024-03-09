export class PlaceModel{

    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public puntuacion: number,
        public imagenes: Array<URL>,
        public opiniones: Array<string>
    ){}
}