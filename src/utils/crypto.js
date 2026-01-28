/**
 * Crypto utility for encrypting and decrypting sensitive personal data
 * Uses Web Crypto API with AES-GCM encryption
 */

// Generate a key from a password/passphrase
const getEncryptionKey = async (passphrase) => {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )

  // Use a fixed salt for consistency (in production, store this securely)
  const salt = encoder.encode('LearningQuest2026')

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Get or create a unique device key
const getDeviceKey = () => {
  let deviceKey = localStorage.getItem('_device_key')
  if (!deviceKey) {
    // Generate a random device key
    deviceKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    localStorage.setItem('_device_key', deviceKey)
  }
  return deviceKey
}

/**
 * Encrypt a string value
 * @param {string} plaintext - The text to encrypt
 * @returns {Promise<string>} - Base64 encoded encrypted data with IV
 */
export const encrypt = async (plaintext) => {
  if (!plaintext || plaintext === '') return ''

  try {
    const deviceKey = getDeviceKey()
    const key = await getEncryptionKey(deviceKey)

    // Generate a random IV for each encryption
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encoder = new TextEncoder()
    const encodedText = encoder.encode(plaintext)

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encodedText
    )

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength)
    combined.set(iv, 0)
    combined.set(new Uint8Array(encryptedData), iv.length)

    // Convert to base64 for storage
    return btoa(String.fromCharCode(...combined))
  } catch (error) {
    console.error('Encryption error:', error)
    return plaintext // Fallback to plain text if encryption fails
  }
}

/**
 * Decrypt an encrypted string value
 * @param {string} encryptedText - Base64 encoded encrypted data with IV
 * @returns {Promise<string>} - Decrypted plaintext
 */
export const decrypt = async (encryptedText) => {
  if (!encryptedText || encryptedText === '') return ''

  try {
    const deviceKey = getDeviceKey()
    const key = await getEncryptionKey(deviceKey)

    // Decode from base64
    const combined = new Uint8Array(
      atob(encryptedText).split('').map(c => c.charCodeAt(0))
    )

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12)
    const encryptedData = combined.slice(12)

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedData
    )

    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  } catch (error) {
    console.error('Decryption error:', error)
    return encryptedText // Fallback to returning the original if decryption fails
  }
}

/**
 * Encrypt an object's sensitive fields
 * @param {object} data - Object containing data to encrypt
 * @param {string[]} fields - Array of field names to encrypt
 * @returns {Promise<object>} - Object with encrypted fields
 */
export const encryptFields = async (data, fields) => {
  const encrypted = { ...data }

  for (const field of fields) {
    if (data[field]) {
      encrypted[field] = await encrypt(String(data[field]))
    }
  }

  return encrypted
}

/**
 * Decrypt an object's encrypted fields
 * @param {object} data - Object containing encrypted data
 * @param {string[]} fields - Array of field names to decrypt
 * @returns {Promise<object>} - Object with decrypted fields
 */
export const decryptFields = async (data, fields) => {
  const decrypted = { ...data }

  for (const field of fields) {
    if (data[field]) {
      decrypted[field] = await decrypt(data[field])
    }
  }

  return decrypted
}

/**
 * List of sensitive fields that should be encrypted
 */
export const SENSITIVE_FIELDS = [
  'player_name',
  'user_email',
  'age',
  'mom_email',
  'dad_email'
]

/**
 * Helper function to encrypt sensitive player data
 * @param {object} playerData - Player progress data
 * @returns {Promise<object>} - Player data with encrypted sensitive fields
 */
export const encryptPlayerData = async (playerData) => {
  return encryptFields(playerData, SENSITIVE_FIELDS)
}

/**
 * Helper function to decrypt sensitive player data
 * @param {object} playerData - Player progress data with encrypted fields
 * @returns {Promise<object>} - Player data with decrypted sensitive fields
 */
export const decryptPlayerData = async (playerData) => {
  return decryptFields(playerData, SENSITIVE_FIELDS)
}
