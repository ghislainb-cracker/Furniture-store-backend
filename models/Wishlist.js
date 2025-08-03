import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

// Ensure user can't add the same product twice to wishlist
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

// Method to add product to wishlist
wishlistSchema.statics.addToWishlist = function(userId, productId) {
  return this.findOneAndUpdate(
    { user: userId, product: productId },
    { user: userId, product: productId },
    { upsert: true, new: true }
  );
};

// Method to remove product from wishlist
wishlistSchema.statics.removeFromWishlist = function(userId, productId) {
  return this.findOneAndDelete({ user: userId, product: productId });
};

// Method to get user's wishlist with populated product details
wishlistSchema.statics.getUserWishlist = function(userId) {
  return this.find({ user: userId })
    .populate({
      path: 'product',
      select: 'title price images category averageRating reviewCount isAvailable isOnSale discountPercentage'
    })
    .sort({ createdAt: -1 });
};

export default mongoose.model('Wishlist', wishlistSchema);
