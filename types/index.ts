export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export interface ProductFilters {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  search: string
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'
}

export interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  filters: ProductFilters
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  fetchProducts: () => Promise<void>
  fetchCategories: () => Promise<void>
  setFilters: (filters: Partial<ProductFilters>) => void
  setCurrentPage: (page: number) => void
  applyFilters: () => void
}
