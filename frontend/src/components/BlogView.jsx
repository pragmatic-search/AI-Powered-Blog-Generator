import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { FiCopy, FiSave } from 'react-icons/fi';

const BlogView = ({ content, onSave, isLoading }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="prose max-w-none">
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FiCopy className="mr-1" /> Copy
        </button>
        <button
          onClick={onSave}
          disabled={isLoading || !content}
          className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading || !content ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Saving...' : (
            <>
              <FiSave className="mr-1" /> Save
            </>
          )}
        </button>
      </div>

      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content || '*Your generated blog will appear here...*'}
      </ReactMarkdown>
    </div>
  );
};

export default BlogView;