export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    update_at: Date;

    constructor(data: any = null) {
        if (data) {
            Object.assign(this, data);
        } else {
            this.id = null;
            this.name = "";
            this.description = "";
            this.price = null;
            this.update_at = null;
        }
    }
}
