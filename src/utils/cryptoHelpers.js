/**
 * Helper utilities for debugging and testing encryption
 * These functions can be called from browser console for testing
 */

import { encrypt, decrypt } from './crypto'

/**
 * Test encryption/decryption with a sample string
 * Usage in console: testEncryption("Hello World")
 */
export const testEncryption = async (text) => {
  console.log('Original:', text)
  const encrypted = await encrypt(text)
  console.log('Encrypted:', encrypted)
  const decrypted = await decrypt(encrypted)
  console.log('Decrypted:', decrypted)
  console.log('Match:', text === decrypted ? '✓ PASS' : '✗ FAIL')
  return text === decrypted
}

/**
 * View the raw localStorage data (encrypted)
 */
export const viewRawData = () => {
  const raw = localStorage.getItem('learning_quest_db')
  if (!raw) {
    console.log('No data found in learning_quest_db')
    return null
  }
  const parsed = JSON.parse(raw)
  console.log('Raw encrypted data:', parsed)
  return parsed
}

/**
 * View the device encryption key
 */
export const viewDeviceKey = () => {
  const key = localStorage.getItem('_device_key')
  console.log('Device Key:', key)
  return key
}

/**
 * Reset device key (will create a new one on next encryption)
 * WARNING: This will make existing encrypted data unreadable
 */
export const resetDeviceKey = () => {
  const confirmed = confirm(
    'WARNING: Resetting the device key will make all existing encrypted data unreadable. Continue?'
  )
  if (confirmed) {
    localStorage.removeItem('_device_key')
    console.log('Device key reset. A new key will be generated on next encryption.')
    return true
  }
  return false
}

/**
 * Check if a string appears to be encrypted
 */
export const isEncrypted = (str) => {
  if (!str || typeof str !== 'string') return false

  // Encrypted strings are Base64 encoded and relatively long
  const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(str)
  const isLongEnough = str.length > 20

  return isBase64 && isLongEnough
}

/**
 * Audit all player data to show which fields are encrypted
 */
export const auditEncryption = () => {
  const raw = localStorage.getItem('learning_quest_db')
  if (!raw) {
    console.log('No player data found')
    return
  }

  const data = JSON.parse(raw)
  if (!Array.isArray(data) || data.length === 0) {
    console.log('No player records found')
    return
  }

  console.log('=== Encryption Audit ===')
  data.forEach((player, index) => {
    console.log(`\nPlayer ${index + 1}:`)
    const sensitiveFields = ['player_name', 'user_email', 'age', 'mom_email', 'dad_email']

    sensitiveFields.forEach(field => {
      if (player[field]) {
        const encrypted = isEncrypted(player[field])
        console.log(`  ${field}: ${encrypted ? '🔒 Encrypted' : '⚠️  Plain Text'} (${player[field].substring(0, 30)}...)`)
      } else {
        console.log(`  ${field}: (empty)`)
      }
    })
  })
}

/**
 * Export all functions to window for easy console access
 * Call this in development to make functions available globally
 */
export const enableConsoleHelpers = () => {
  window.cryptoHelpers = {
    testEncryption,
    viewRawData,
    viewDeviceKey,
    resetDeviceKey,
    isEncrypted,
    auditEncryption
  }
  console.log('Crypto helpers available at window.cryptoHelpers')
  console.log('Available functions:', Object.keys(window.cryptoHelpers))
}

// Auto-enable in development mode
if (import.meta.env.DEV) {
  enableConsoleHelpers()
  console.log('🔐 Encryption utilities loaded. Use window.cryptoHelpers in console.')
}
