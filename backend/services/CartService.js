class CartService {
  constructor({ cartModel, productModel }) {
    this.Cart = cartModel;
    this.Product = productModel;
  }

  async getCart(userId) {
    const cart = await this.Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return { items: [] };
    }

    return cart;
  }

  async addToCart(userId, productId, quantity) {
    const product = await this.Product.findById(productId);
    if (!product) {
      throw new Error('Продукт не знайдено');
    }

    if (product.stock < quantity) {
      throw new Error('Недостатньо товару на складі');
    }

    let cart = await this.Cart.findOne({ user: userId });

    if (!cart) {
      cart = new this.Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items.product');

    return cart;
  }

  async updateCartItem(userId, productId, quantity) {
    const cart = await this.Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Кошик не знайдено');
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      throw new Error('Товар не знайдено в кошику');
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items.product');

    return cart;
  }

  async removeFromCart(userId, productId) {
    const cart = await this.Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Кошик не знайдено');
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items.product');

    return cart;
  }

  async clearCart(userId) {
    const cart = await this.Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Кошик не знайдено');
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    return cart;
  }
}

module.exports = CartService;
