# Product Management App

A modern, fully-featured product management application built with Next.js 15, Redux Toolkit, and Tailwind CSS.

## 🌐 Live Demo

**� [View Live App](https://product-arabin.vercel.app/)**

**📦 [GitHub Repository](https://github.com/azn-arabin/product-management-app)**

## �🚀 Features

### ✅ Core Functionality

- **Authentication**: Email-based login with JWT token management
- **Product CRUD**: Complete Create, Read, Update, and Delete operations with real-time UI updates
- **Real-time Search**: Debounced search functionality for instant results
- **Category Filtering**: Filter products by category with smart caching
- **Smart Pagination**: Professional pagination with ellipsis (1 ... 5 6 7 ... 20)
- **Responsive Design**: Mobile-first, fully responsive UI with optimized layouts
- **Data Caching**: Automatic cache invalidation with RTK Query
- **Toast Notifications**: User feedback for all CRUD operations
- **Error Status Codes**: HTTP status codes displayed in error messages

### 🎨 UI/UX Features

- **Modern Design**: Custom color palette with polished aesthetics and gradients
- **Loading States**: Skeleton screens with smooth transitions
- **Error Handling**: Comprehensive error states with retry functionality and status codes
- **Confirmation Dialogs**: Safe delete operations with confirmation modals
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Ecommerce-Style Zoom**: 150% image zoom with mouse-tracking on product details
- **Form Validation**: Client-side validation with inline error messages
- **Micro-interactions**: Smooth transitions, hover effects, and staggered animations
- **Dropdown Menus**: Professional header with user actions dropdown
- **Custom Scrollbar**: Styled scrollbar matching the app theme
- **Slug-based URLs**: SEO-friendly URLs like `/products/test-product-1133`

### 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS v4 with custom color palette
- **UI Components**: shadcn/ui with Radix UI primitives
- **Notifications**: Sonner for toast notifications
- **Theme Support**: next-themes for dark/light mode compatibility
- **Type Safety**: TypeScript with strict mode
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- An email address for authentication

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/azn-arabin/product-management-app.git
   cd product-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to `http://localhost:3000`

## 🔐 Authentication

1. Go to the login page
2. Enter your email address
3. The API will return a JWT token
4. Token is stored in cookies and Redux store
5. Middleware protects all routes except `/login`
6. Auto-redirect to `/products` after successful login

## 📱 Features Guide

### Products Page (`/products`)

- **View Products**: Responsive grid layout with product cards (1-4 columns based on screen size)
- **Search**: Real-time search by product name with 500ms debounce
- **Filter**: Filter by category using dropdown menu
- **Paginate**: Navigate through pages with professional pagination (shows ellipsis for large page counts)
- **Staggered Animations**: Cards animate in with 50ms delay between each
- **Delete**: Click delete icon and confirm in dialog with toast notification

### Create Product (`/products/new`)

- Click "New Product" button in header
- Fill in all required fields:
  - **Name**: 3-100 characters
  - **Description**: Minimum 10 characters
  - **Price**: Must be greater than 0, max 1,000,000
  - **Category**: Select from dropdown
  - **Images**: At least one valid URL (supports multiple)
- Inline validation with error messages
- Click "Create Product" to save
- Success toast notification on creation
- Auto-redirect to products list

### Edit Product (`/products/[slug]/edit`)

- Click "Edit" button on any product card or from details page
- Same form as create with pre-filled values
- Update any fields with validation
- Click "Update Product" to save
- Success toast notification on update
- Auto-redirect to product details

### Product Details (`/products/[slug]`)

- Click "View" button, product card, or name
- See all product information with formatted dates
- **Image Gallery**: Thumbnails with active state indicators
- **Ecommerce Zoom**: Hover over main image for 150% zoom with mouse tracking
- **Product Details**: ID, slug, created/updated dates
- **Category Information**: Full category details with image
- Edit or delete from details page
- Breadcrumb navigation back to products

## 🎨 Color Palette

The app uses a carefully crafted color scheme:

| Color Name      | Hex Code  | Usage                       |
| --------------- | --------- | --------------------------- |
| Rich Black      | `#0d1821` | Primary dark color, text    |
| Antiflash White | `#eff1f3` | Background, light surfaces  |
| Hookers Green   | `#4e6e5d` | Primary buttons, accents    |
| Lion            | `#ad8a64` | Secondary buttons, badges   |
| Chestnut        | `#a44a3f` | Destructive actions, alerts |

Custom gradients and hover effects enhance the visual experience.

## 🚀 Deployment

### Vercel (Recommended)

The app is deployed on Vercel at [https://product-arabin.vercel.app/](https://product-arabin.vercel.app/)

**To deploy your own:**

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

3. **Environment Variables**
   - No environment variables required
   - API URL is configured to `https://api.bitechx.com`

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
│   ├── login/              # Login page with auth form
│   ├── products/           # Products listing with search/filter
│   │   ├── [slug]/        # Product details (slug-based routing)
│   │   │   └── edit/      # Edit product page
│   │   └── new/           # Create product page
│   ├── layout.tsx         # Root layout with Redux + Toaster
│   ├── page.tsx           # Home redirect to /products
│   ├── globals.css        # Global styles with Tailwind v4 @theme
│   └── middleware.ts      # Auth middleware for protected routes
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── sonner.tsx    # Toast notification component
│   │   ├── pagination.tsx # Custom pagination with ellipsis
│   │   ├── dropdown-menu.tsx # Radix dropdown menu
│   │   └── ...           # Other shadcn components
│   ├── ConfirmDialog.tsx  # Delete confirmation modal
│   ├── EmptyState.tsx     # No data state component
│   ├── ErrorState.tsx     # Error handling with status codes
│   ├── Header.tsx         # App header with dropdown menus
│   ├── LoadingState.tsx   # Loading indicators
│   ├── ProductCard.tsx    # Product grid item with actions
│   └── ProductForm.tsx    # Create/Edit form with validation
├── lib/
│   ├── api.ts            # RTK Query API with cache invalidation
│   ├── authSlice.ts      # Auth state management
│   ├── hooks.ts          # Typed Redux hooks
│   ├── store.ts          # Redux store configuration
│   ├── types.ts          # TypeScript types and interfaces
│   ├── useDebounce.ts    # Custom debounce hook
│   ├── utils.ts          # Utility functions (cn)
│   └── ReduxProvider.tsx # Redux provider with cookie hydration
└── middleware.ts         # Next.js middleware for auth

```

## 🧪 Testing Checklist

- [x] Login with email
- [x] View products list with responsive grid
- [x] Search for products with debounce
- [x] Filter by category
- [x] Navigate through pages with ellipsis pagination
- [x] Create a new product with validation
- [x] Edit an existing product
- [x] View product details with image zoom
- [x] Delete a product with confirmation
- [x] See toast notifications for all actions
- [x] View error status codes on failures
- [x] Test responsive design on mobile/tablet
- [x] Verify cache updates after mutations
- [x] Logout and verify redirect

## 🎯 API Integration

**Base URL**: `https://api.bitechx.com`

### Endpoints Used

| Method   | Endpoint           | Description                |
| -------- | ------------------ | -------------------------- |
| `POST`   | `/auth`            | Authenticate with email    |
| `GET`    | `/products`        | Get products (paginated)   |
| `GET`    | `/products/:slug`  | Get single product by slug |
| `GET`    | `/products/search` | Search products            |
| `POST`   | `/products`        | Create new product         |
| `PUT`    | `/products/:id`    | Update product             |
| `DELETE` | `/products/:id`    | Delete product             |
| `GET`    | `/categories`      | Get all categories         |

### Authentication

All API requests (except `/auth`) require:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Cache Invalidation

RTK Query automatically invalidates and refetches data when:

- Creating a product → Refetches product list and search results
- Updating a product → Refetches product list, search results, and specific product
- Deleting a product → Refetches product list and search results

## 🐛 Troubleshooting

### Port already in use

**Solution**: Change the port in `package.json` or kill the existing process

```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change port
npm run dev -- -p 3001
```

### Images not loading

**Issue**: CORS or invalid image URLs  
**Solution**: Ensure image URLs are publicly accessible and use `unoptimized` prop

### UI not updating after mutations

**Issue**: Cache not invalidating  
**Solution**: Already fixed - RTK Query invalidates tags for all mutations

### Toast notifications not appearing

**Issue**: Toaster component not added to layout  
**Solution**: Already fixed - Toaster is in `layout.tsx`

## 📝 Development Notes

- **Slug-based Routing**: Products use SEO-friendly slugs instead of IDs
- **Real-time Updates**: RTK Query cache invalidation ensures UI stays in sync
- **Toast Feedback**: All CRUD operations show success/error toasts
- **Status Codes**: Errors display HTTP status codes for better debugging
- **Validation**: Client-side validation before API calls
- **Debouncing**: Search is debounced by 500ms to reduce API load
- **Image Zoom**: Mouse-tracking zoom uses `transform-origin` for smooth effect
- **Custom Pagination**: Shows ellipsis for better UX on large datasets
- **Responsive Header**: Dropdown menus collapse on mobile with hamburger menu

## 👨‍💻 Development Commands

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality Tools

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Next.js recommended config
- **Tailwind CSS**: Consistent styling with v4 features
- **Component Architecture**: Reusable, modular components
- **Custom Hooks**: `useDebounce` for optimized search

## 🎓 Technologies & Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Lucide Icons](https://lucide.dev/)

## 📄 License

This project was created as part of a job application assignment.

---

**🎉 Developed with ❤️ using Next.js, Redux Toolkit, and Tailwind CSS**

**👤 Developer**: [Arabin](https://github.com/azn-arabin)  
**🌐 Live Demo**: [https://product-arabin.vercel.app/](https://product-arabin.vercel.app/)  
**📦 GitHub**: [https://github.com/azn-arabin/product-management-app](https://github.com/azn-arabin/product-management-app)
