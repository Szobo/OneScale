import React, { useState, useEffect } from 'react'
import { googleDriveAPI } from '../lib/api'

const AutomatedDiscovery = ({ isOpen, onClose, onFilesSelected }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    if (isOpen) {
      loadExcelFiles()
    }
  }, [isOpen])

  const loadExcelFiles = async () => {
    setIsLoading(true)
    try {
      const response = await googleDriveAPI.listFiles()
      if (response.status === 'success') {
        // Filter for Excel files
        const excelFiles = response.data.filter(file => 
          file.name.toLowerCase().includes('.xlsx') || 
          file.name.toLowerCase().includes('.xls')
        )
        setFiles(excelFiles)
      }
    } catch (error) {
      console.error('Failed to load Excel files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileToggle = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    const filteredFiles = getFilteredFiles()
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id))
    }
  }

  const getFilteredFiles = () => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || 
        (filterType === 'xlsx' && file.name.toLowerCase().includes('.xlsx')) ||
        (filterType === 'xls' && file.name.toLowerCase().includes('.xls'))
      return matchesSearch && matchesType
    })
  }

  const handleConfirmSelection = () => {
    const selectedFileObjects = files.filter(file => selectedFiles.includes(file.id))
    onFilesSelected(selectedFileObjects)
    onClose()
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (!isOpen) return null

  const filteredFiles = getFilteredFiles()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Automated Discovery</h2>
            <p className="text-zinc-400">Select Excel files to automatically sync</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-[#7a3cff]"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#7a3cff]"
              >
                <option value="all">All Excel Files</option>
                <option value="xlsx">XLSX Files</option>
                <option value="xls">XLS Files</option>
              </select>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#7a3cff] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-zinc-400">Loading Excel files...</span>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-zinc-400">No Excel files found</p>
              <p className="text-sm text-zinc-500 mt-2">
                {searchTerm ? 'Try adjusting your search terms' : 'Make sure you have Excel files in your Google Drive'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#7a3cff] bg-zinc-700 border-zinc-600 rounded focus:ring-[#7a3cff] focus:ring-2"
                  />
                  <span className="text-white font-medium">
                    Select All ({filteredFiles.length} files)
                  </span>
                </label>
                <span className="text-sm text-zinc-400">
                  {selectedFiles.length} selected
                </span>
              </div>

              {/* Files */}
              {filteredFiles.map((file) => (
                <div key={file.id} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileToggle(file.id)}
                      className="w-4 h-4 text-[#7a3cff] bg-zinc-700 border-zinc-600 rounded focus:ring-[#7a3cff] focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <div className="flex-1">
                          <p className="font-medium text-white">{file.name}</p>
                          <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                            <span>{formatFileSize(file.size || 0)}</span>
                            <span>Modified: {formatDate(file.modifiedTime || file.createdTime)}</span>
                            <span className="text-green-400">Google Drive</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-zinc-800">
          <div className="text-sm text-zinc-400">
            {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelection}
              disabled={selectedFiles.length === 0}
              className="px-6 py-2 bg-[#7a3cff] hover:bg-[#6a2ce6] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Link Selected Files
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutomatedDiscovery
