import { useCallback } from 'react'

export default function UploadForm({ file, setFile }) {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      const dropped = e.dataTransfer.files[0]
      if (dropped && dropped.type.startsWith('image/')) {
        setFile(dropped)
      }
    },
    [setFile]
  )

  const handleDragOver = (e) => e.preventDefault()

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0])
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Answer Sheet Image
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('file-input').click()}
      >
        {file ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-800 font-medium">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="mx-auto max-h-48 rounded-md shadow-sm"
            />
          </div>
        ) : (
          <div>
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop an image here, or click to browse
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG, JPEG, GIF, BMP, WEBP up to 16 MB
            </p>
          </div>
        )}
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
