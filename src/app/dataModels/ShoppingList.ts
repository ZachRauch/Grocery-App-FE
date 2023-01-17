import { Item } from "./Items";

export class ShoppingList {
    constructor(
        public id: number,
        public userId: number,
        public items: Item[]
    ){}
}