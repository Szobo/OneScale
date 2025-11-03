/**
 * SmartSync - Intelligent file synchronization with bandwidth optimization
 * Only syncs files that have actually changed to save bandwidth and time
 */

export class SmartSync {
  constructor() {
    this.syncHistory = new Map() // Track file sync history
  }

  /**
   * Perform smart sync on a list of files
   * @param {Array} files - Array of file objects to sync
   * @returns {Object} - Sync result with statistics
   */
  async smartSync(files) {
    if (!files || files.length === 0) {
      return { synced: 0, skipped: 0, bandwidthSaved: 0 }
    }

    let synced = 0
    let skipped = 0
    let totalBandwidthSaved = 0

    for (const file of files) {
      try {
        const shouldSync = await this.shouldSyncFile(file)
        
        if (shouldSync) {
          // Simulate file sync (replace with actual sync logic)
          await this.performFileSync(file)
          this.updateSyncHistory(file)
          synced++
        } else {
          skipped++
          totalBandwidthSaved += this.calculateBandwidthSaved(file)
        }
      } catch (error) {
        console.error(`Failed to sync file ${file.file_name}:`, error)
        // Continue with other files even if one fails
      }
    }

    const bandwidthSaved = files.length > 0 ? Math.round((totalBandwidthSaved / files.length) * 100) : 0

    return {
      synced,
      skipped,
      bandwidthSaved
    }
  }

  /**
   * Determine if a file should be synced based on various factors
   * @param {Object} file - File object to check
   * @returns {boolean} - Whether the file should be synced
   */
  async shouldSyncFile(file) {
    // Check if file has been synced before
    const lastSync = this.syncHistory.get(file.id)
    
    if (!lastSync) {
      // First time syncing this file
      return true
    }

    // Check if file has been modified since last sync
    const lastModified = new Date(file.last_modified || file.created_at)
    const lastSyncTime = new Date(lastSync.timestamp)

    if (lastModified > lastSyncTime) {
      // File has been modified since last sync
      return true
    }

    // Check if it's been a while since last sync (force periodic sync)
    const daysSinceLastSync = (Date.now() - lastSyncTime.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceLastSync > 7) {
      // Force sync if it's been more than a week
      return true
    }

    // File is up to date, skip sync
    return false
  }

  /**
   * Perform the actual file sync operation
   * @param {Object} file - File to sync
   */
  async performFileSync(file) {
    // This is a placeholder - replace with actual sync logic
    // For now, we'll simulate a sync operation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Syncing file: ${file.file_name}`)
        resolve()
      }, 100) // Simulate network delay
    })
  }

  /**
   * Update sync history for a file
   * @param {Object} file - File that was synced
   */
  updateSyncHistory(file) {
    this.syncHistory.set(file.id, {
      timestamp: new Date().toISOString(),
      fileSize: file.file_size,
      fileName: file.file_name
    })
  }

  /**
   * Calculate bandwidth saved for a file
   * @param {Object} file - File that was skipped
   * @returns {number} - Bandwidth saved percentage
   */
  calculateBandwidthSaved(file) {
    // Estimate bandwidth saved based on file size
    const fileSizeMB = file.file_size / (1024 * 1024)
    
    // Larger files save more bandwidth when skipped
    if (fileSizeMB > 10) return 95 // 95% bandwidth saved for large files
    if (fileSizeMB > 1) return 85  // 85% bandwidth saved for medium files
    return 70 // 70% bandwidth saved for small files
  }

  /**
   * Get sync statistics for a file
   * @param {string} fileId - ID of the file
   * @returns {Object|null} - Sync statistics or null if not found
   */
  getFileSyncStats(fileId) {
    return this.syncHistory.get(fileId) || null
  }

  /**
   * Clear sync history (useful for testing or reset)
   */
  clearSyncHistory() {
    this.syncHistory.clear()
  }

  /**
   * Get overall sync statistics
   * @returns {Object} - Overall sync statistics
   */
  getOverallStats() {
    const totalFiles = this.syncHistory.size
    const totalBandwidthSaved = Array.from(this.syncHistory.values())
      .reduce((sum, file) => sum + this.calculateBandwidthSaved(file), 0)
    
    return {
      totalFiles,
      averageBandwidthSaved: totalFiles > 0 ? Math.round(totalBandwidthSaved / totalFiles) : 0,
      lastSyncTime: totalFiles > 0 ? 
        Math.max(...Array.from(this.syncHistory.values()).map(f => new Date(f.timestamp).getTime())) : 
        null
    }
  }
}
