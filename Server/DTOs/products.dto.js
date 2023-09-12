class ProductsDto {
    constructor(product) {
        this.id = product._id
        this.title = product.title;
        this.offer = product.offer;
        this.offer_price = product.offer_price;
        this.price = product.price;
        this.fragance = product.fragance;
        this.quantity = product.quantity;
    }
};

module.exports = {
    ProductsDto
}