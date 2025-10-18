# Product Management App

A modern, fully-featured product management application built with Next.js 15, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### ✅ Core Functionality

- **Authentication**: Email-based login with JWT token management
- **Product CRUD**: Complete Create, Read, Update, and Delete operations
- **Real-time Search**: Debounced search functionality for products
- **Category Filtering**: Filter products by category
- **Pagination**: Client-side pagination with 12 items per page
- **Responsive Design**: Mobile-first, fully responsive UI
- **Data Caching**: Smart cache management with RTK Query

### 🎨 UI/UX Features

- **Modern Design**: Custom color palette with polished aesthetics
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Comprehensive error states with retry functionality
- **Confirmation Dialogs**: Safe delete operations with confirmation
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Form Validation**: Client-side validation with inline error messages
- **Micro-interactions**: Smooth transitions and hover effects

### 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- An email address for authentication

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Fix directory conflict** (IMPORTANT)

   - Manually delete the `src/app/products/[slug]` directory using VS Code or File Explorer
   - Only the `[id]` directory should remain under `src/app/products/`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the application**
   - Navigate to `http://localhost:3000`

## 🔐 Authentication

1. Go to the login page
2. Enter the email you used in your job application
3. The API will return a JWT token
4. Token is stored in cookies and Redux store
5. Middleware protects all routes except `/login`

## 📱 Features Guide

### Products Page

- **View Products**: Grid layout with product cards
- **Search**: Real-time search by product name (debounced)
- **Filter**: Filter by category using dropdown
- **Paginate**: Navigate through pages with pagination controls
- **Delete**: Click delete icon and confirm in dialog

### Create Product

- Click "New Product" button in header
- Fill in all required fields:
  - Name (3-100 characters)
  - Description (min 10 characters)
  - Price (must be > 0)
  - Category (select from dropdown)
  - Images (at least one URL)
- Validation errors shown inline
- Click "Create Product" to save

### Edit Product

- Click "Edit" button on any product card
- Same form as create with pre-filled values
- Update any fields
- Click "Update Product" to save

### Product Details

- Click "View" button or product name
- See all product information
- View image gallery with thumbnails
- Edit or delete from details page

## 🎨 Color Palette

The app uses a custom color scheme:

- **Rich Black** (#0d1821): Primary dark color
- **Antiflash White** (#eff1f3): Background
- **Hookers Green** (#4e6e5dff): Primary actions
- **Lion** (#ad8a64): Secondary actions
- **Chestnut** (#a44a3f): Destructive actions

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - No environment variables required for this project
   - API URL is hardcoded to `https://api.bitechx.com`

### Alternative: Netlify

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`

## 📁 Project Structure

```
src/
├── app/
│   ├── login/              # Login page
│   ├── products/           # Products listing
│   │   ├── [id]/          # Product details
│   │   │   └── edit/      # Edit product
│   │   └── new/           # Create product
│   ├── layout.tsx         # Root layout with Redux Provider
│   ├── page.tsx           # Home redirect
│   └── globals.css        # Global styles with color palette
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── ConfirmDialog.tsx  # Delete confirmation
│   ├── EmptyState.tsx     # No data state
│   ├── ErrorState.tsx     # Error handling
│   ├── Header.tsx         # App header with navigation
│   ├── LoadingState.tsx   # Loading indicators
│   ├── ProductCard.tsx    # Product grid item
│   └── ProductForm.tsx    # Create/Edit form
├── lib/
│   ├── api.ts            # RTK Query API definitions
│   ├── authSlice.ts      # Auth state management
│   ├── hooks.ts          # Typed Redux hooks
│   ├── store.ts          # Redux store configuration
│   ├── types.ts          # TypeScript types
│   ├── useDebounce.ts    # Debounce hook
│   ├── utils.ts          # Utility functions
│   └── ReduxProvider.tsx # Redux provider component
└── middleware.ts         # Auth middleware

```

## 🧪 Testing Checklist

- [ ] Login with your email
- [ ] View products list
- [ ] Search for products
- [ ] Filter by category
- [ ] Navigate through pages
- [ ] Create a new product
- [ ] Edit an existing product
- [ ] View product details
- [ ] Delete a product (with confirmation)
- [ ] Logout and verify redirect

## 🎯 API Integration

**Base URL**: `https://api.bitechx.com`

### Endpoints Used

- `POST /auth` - Authentication
- `GET /products` - Get products with pagination/filtering
- `GET /products/:slug` - Get single product
- `GET /products/search` - Search products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /categories` - Get categories

## 🐛 Known Issues & Solutions

1. **[slug] directory conflict**

   - **Issue**: Next.js error about different slug names
   - **Solution**: Manually delete `src/app/products/[slug]` directory

2. **Port already in use**

   - **Solution**: Kill the process or change port in `package.json`

3. **Cookie not persisting**
   - **Solution**: Check browser privacy settings for third-party cookies

## 📝 Notes

- All API routes require authentication (Bearer token in headers)
- Product deletion is simulated (API returns success but doesn't delete)
- Images must be valid URLs (the API doesn't support multipart/form-data)
- Search is debounced by 500ms to reduce API calls
- Cache is invalidated after Create/Update/Delete operations

## 👨‍💻 Development

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Component-based architecture
- Custom hooks for reusable logic

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 📄 License

This project was created as part of a job application assignment.

---

**Developed with ❤️ using Next.js and Redux Toolkit**
