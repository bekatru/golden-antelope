import { Entity } from "./entity";

export class Category extends Entity implements ICategory {
    name: string;
    parent: ICategory | null;
    
    constructor(dto: CategoryDto) {
        super();
        this.name = dto.name;
        this.parent = dto.parent;
    }

    save(categories: CategoriesMap): CategoriesMap {
        return Object.assign({[this.id]: this}, categories);
    }
}