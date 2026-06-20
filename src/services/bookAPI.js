const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Transform data from UI (lowercase) to API (uppercase)
const transformToAPI = (book) => ({
  Title: book.title,
  Author: book.author,
  YearPublished: book.yearPublished,
})

// Transform data from API (lowercase) to UI (lowercase - already in correct format)
const transformFromAPI = (book) => ({
  id: book.id,
  title: book.title || book.Title,  // Handle both cases
  author: book.author || book.Author,  // Handle both cases
  yearPublished: book.yearPublished || book.YearPublished,  // Handle both cases
})

export const bookAPI = {
  // GET all books
  getBooks: async () => {
    const response = await fetch(`${API_BASE}/books/`)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
    return data.map(transformFromAPI)
  },

  // GET single book
  getBook: async (id) => {
    const response = await fetch(`${API_BASE}/books/${id}`)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
    return transformFromAPI(data)
  },

  // POST - Create book
  createBook: async (book) => {
    const response = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformToAPI(book)),
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return transformFromAPI(data)
    } else {
      return {
        ...book,
        id: Math.random(), // Temporary ID
      }
    }
  },

  // PUT - Update book
  updateBook: async (id, book) => {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Id: id,
        ...transformToAPI(book),
      }),
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      return transformFromAPI(data)
    } else {
      return {
        ...book,
        id,
      }
    }
  },

  // DELETE - Delete book
  deleteBook: async (id) => {
    const response = await fetch(`${API_BASE}/books/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id: id }),
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    return true
  },

  // GET - Search books by query string
  fetchSearch: async (query) => {
    const response = await fetch(`${API_BASE}/books/search?query=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()

    return data
  },

  // POST - Advanced search (optional)
  fetchSearchAdvanced: async (filters) => {
    const response = await fetch(`${API_BASE}/books/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    })
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    const data = await response.json()
   return data
  },
}
