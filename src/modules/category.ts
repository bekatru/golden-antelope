import { Entity } from "./entity";
import { EntityService } from "./entityService";

export class Category extends Entity implements ICategory {
    name: string;
    parent: ICategory | null;
    
    constructor(dto: CategoryDto) {
        super();
        this.name = dto.name;
        this.parent = dto.parent;
    }
}

export class CategoryService extends EntityService {
    save(category: ICategory) {
        this.state.categories[category.id] = category;

        return this;
    }
}