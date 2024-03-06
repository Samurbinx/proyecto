export class OpinModel{

    constructor(
        public id: number,
        public nombre: string,
        public imagenes: Array<URL>,
        public opiniones: Array<string>
    ){}
}