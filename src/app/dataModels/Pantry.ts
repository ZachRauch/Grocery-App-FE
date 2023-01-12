import { Item } from "./Items";

export class Pantry {
    constructor(
        public id: number,
        public userId: number,
        public items: Item[]
    ){}
}