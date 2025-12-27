# 👟 Shoe Store - E-commerce Website

A modern, full-featured e-commerce website for selling shoes, built with **Next.js 14**, **TypeScript**, and **React**.

## ✨ Features

- 🏠 **Home Page** - Beautiful hero section with featured products
- 📦 **Product Listing** - Browse all available shoes with filters
- 🔍 **Product Details** - Detailed view with images, ratings, and descriptions
- 🛒 **Shopping Cart** - Add/remove items, update quantities, view totals
- 💳 **Checkout Flow** - Ready for payment integration
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⭐ **Product Ratings** - Visual star ratings for each product
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 💾 **Cart Persistence** - Shopping cart saved in browser localStorage

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)

### Installation & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

That's it! 🎉

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── products/          # Product pages
│   │   ├── page.tsx       # Product listing
│   │   └── [id]/page.tsx  # Product details
│   ├── cart/page.tsx      # Shopping cart
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   └── ProductCard.tsx    # Product card component
├── lib/                   # Utilities and data
│   ├── data.ts           # Product data
│   └── cart.ts           # Cart management functions
└── package.json          # Dependencies
```

## 🛍️ Pages

### Home Page (`/`)
- Hero section with call-to-action
- Featured products grid
- Quick navigation to products

### Products Page (`/products`)
- Display all available shoes
- Product cards with images, prices, ratings
- Category tags
- Add to cart functionality

### Product Details (`/products/[id]`)
- Large product image
- Full description
- Price and rating
- Buy Now and Add to Cart buttons
- Stock status indicator

### Shopping Cart (`/cart`)
- List of cart items with images
- Quantity controls (+/-)
- Item removal
- Order summary with totals
- Checkout button (demo)

## 🎨 Customization

### Adding Products

Edit `lib/data.ts` to add or modify products:

```typescript
{
  id: 13,
  name: 'Your Shoe Name',
  description: 'Product description...',
  price: 99.99,
  rating: 4.5,
  category: 'Running',
  image: 'https://your-image-url.com/shoe.jpg',
  inStock: true,
}
```

### Changing Colors

Edit `app/globals.css` to customize the color scheme:

- Primary color: `#667eea` (purple)
- Secondary color: `#764ba2` (dark purple)
- Text color: `#333`
- Background: `#f8f9fa`

### Modifying Styles

All styles are in `app/globals.css`. The design uses CSS Grid and Flexbox for responsive layouts.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Key Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **react-icons** - Icon library

## 🔮 Future Enhancements

- [ ] User authentication (login/signup)
- [ ] Payment integration (Stripe, PayPal)
- [ ] Product search and filtering
- [ ] Product categories filtering
- [ ] User reviews and ratings
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Admin dashboard for product management
- [ ] Backend API integration
- [ ] Product image gallery
- [ ] Size selection
- [ ] Color variations
- [ ] Email notifications
- [ ] Shipping address management

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images not loading
- Check that image URLs in `lib/data.ts` are accessible
- Verify `next.config.js` allows the image domains

## 📝 Notes

- **Cart Storage**: The shopping cart is stored in browser localStorage. It persists across page refreshes but is local to each browser.
- **Demo Mode**: The checkout button shows an alert. Integrate with a payment provider for real transactions.
- **Product Images**: Uses Unsplash images by default. Replace with your own product images.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and commercial use.

## 💡 Tips

- **Customize Products**: Edit `lib/data.ts` to add your own shoe products
- **Change Branding**: Update the logo text in `components/Header.tsx`
- **Add Categories**: Modify category values in product data and add filtering logic
- **Connect Backend**: Replace `lib/data.ts` with API calls to your backend
- **Deploy**: Use Vercel for easy deployment: `vercel`

---

**Built with ❤️ using Next.js**

Enjoy building your shoe store! 👟
