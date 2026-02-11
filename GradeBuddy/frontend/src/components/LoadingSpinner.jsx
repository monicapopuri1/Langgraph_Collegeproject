export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600 text-sm">
        Analyzing answer sheet with AI... This may take a moment.
      </p>
    </div>
  )
}
