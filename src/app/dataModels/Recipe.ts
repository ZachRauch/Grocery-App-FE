import { Item } from "./Items";

export class Recipe {
    constructor(
        public id: number,
        public userId: number,
        public recipeImage: string,
        public name: string,
        public items: Item[]
    ){}
}