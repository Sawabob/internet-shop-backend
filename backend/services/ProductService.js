class ProductService {
  constructor({ productModel }) {
    this.Product = productModel;
  }

  async getAllProducts() {
    return await this.Product.find();
  }

  async getProductById(id) {
    const product = await this.Product.findById(id);
    if (!product) {
      throw new Error('Продукт не знайдено');
    }
    return product;
  }

  async createProduct(productData) {
    const { name, description, price, category, stock, imageUrl } = productData;

    const product = new this.Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    await product.save();
    return product;
  }

  async updateProduct(id, productData) {
    const product = await this.Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new Error('Продукт не знайдено');
    }

    return product;
  }

  async deleteProduct(id) {
    const product = await this.Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error('Продукт не знайдено');
    }

    return product;
  }
}

module.exports = ProductService;
