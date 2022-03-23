require('dotenv').config()
const backendPath = process.env.API_URL

/**
 * Headers for JSON
 */
const headers = {
  'content-type': 'application/json',
  charset: 'utf-8',
  authorization: `${localStorage.getItem('token')}`,
}

export { backendPath, headers }
