import React, { useState } from 'react'

const FileSelectionModal = ({ isOpen, onClose, files, provider, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null)

  if (!isOpen) return null

  const getProviderName = (provider) => {
    return provider === 'gdrive' ? 'Google Drive' : 'OneDrive'
  }

  const getProviderIcon = (provider) => {
    return provider === 'gdrive' ? '🔵' : '🔴'
  }

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const handleConfirm = () => {
    if (selectedFile) {
      onSelectFile(selectedFile)
      onClose()
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getProviderIcon(provider)}</span>
            <div>
              <h3 className="text-xl font-semibold">Select Excel File</h3>
              <p className="text-zinc-400 text-sm">{getProviderName(provider)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {files.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-zinc-400">No Excel files found</p>
              <p className="text-sm text-zinc-500 mt-2">Upload Excel files to your {getProviderName(provider)} to see them here</p>
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                onClick={() => handleFileSelect(file)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFile?.id === file.id
                    ? 'border-[#7a3cff] bg-[#7a3cff]/10'
                    : 'border-zinc-700 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-zinc-400">
                        {formatFileSize(file.size)} • Modified: {formatDate(file.modifiedTime)}
                      </p>
                    </div>
                  </div>
                  {selectedFile?.id === file.id && (
                    <span className="text-[#7a3cff]">✓</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className="bg-[#7a3cff] hover:bg-[#6a2ce6] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            Link File
          </button>
        </div>
      </div>
    </div>
  )
}

export default FileSelectionModal 