import { create } from 'zustand'
import { ProductFilters, ProductsState } from '@/types'
import { fetchCategories, fetchProducts } from '@/lib/api'

const initialFilters: ProductFilters = {
  categories: [],
  priceRange: { min: 0, max: 1000 },
  search: '',
  sortBy: 'name'
}

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  filters: initialFilters,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const products = await fetchProducts()
      set({ products, loading: false })
      get().applyFilters()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch products',
        loading: false
      })
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await fetchCategories()
      set({ categories })
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  },

  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1
    }))
    get().applyFilters()
  },

  setCurrentPage: (page) => {
    set({ currentPage: page })
  },

  applyFilters: () => {
    const { products, filters } = get()
    let filtered = [...products]

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      )
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
    )

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    set({ filteredProducts: filtered })
  }
}))
