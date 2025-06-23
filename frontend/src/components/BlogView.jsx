import ReactMarkdown from 'react-markdown';

const BlogView = ({ content, onSave, isLoading }) => {
  // ... (keep your existing utility functions)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Generated Blog
        </h2>
        {content && (
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              isLoading
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Blog'}
          </button>
        )}
      </div>

      <div className={`rounded-lg border ${
        content ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'
      } p-6 min-h-96`}>
        {content ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Your generated blog will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;