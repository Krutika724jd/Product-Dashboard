const AUTH_KEY = "user_session"

const VALID_EMAIL    = 'admin@example.com'
const VALID_PASSWORD = 'admin123'

export const login = (email, password) => {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // only store user info, never the password
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }))
    return true  // 👈 return true/false so Login.jsx knows if it worked
  }
  return false
}

export const logout = () => {
  localStorage.removeItem(AUTH_KEY)
}

export const getUser = () => {
  const data = localStorage.getItem(AUTH_KEY)
  return data ? JSON.parse(data) : null
}

export const isAuthenticated = () => {
  return !!getUser()
}