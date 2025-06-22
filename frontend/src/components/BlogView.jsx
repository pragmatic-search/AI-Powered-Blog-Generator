import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const BlogView = ({ content, onSave, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const wordCount = content ? content.split(/\s+/).filter(word => word.length > 0).length : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            Generated Blog Post
          </h2>
          {content && (
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {wordCount} words
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {content && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600/30"
            >
              {isCopied ? (
                <>
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={onSave}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 btn-hover-effect ${
                isLoading
                  ? 'bg-gray-600/50 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 glow-green'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>Save Blog</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        <div className={`min-h-96 rounded-2xl transition-all duration-500 ${
          content ? 'bg-gray-900/30' : 'bg-gray-800/20'
        } border border-gray-600/20 backdrop-blur-sm`}>
          {content ? (
            <div className="p-8">
              {/* Content Preview Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live Preview</span>
                </div>
                <div className="glass-light px-3 py-1 rounded-full">
                  <span className="text-xs text-gray-300">AI Generated ✨</span>
                </div>
              </div>

              {/* Markdown Content */}
              <div className="prose prose-dark max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => (
                      <h1 className="text-3xl font-bold text-white mb-6 pb-3 border-b border-gray-700/50">
                        {children}
                      </h1>
                    ),
                    h2: ({children}) => (
                      <h2 className="text-2xl font-semibold text-white mt-8 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                        {children}
                      </h2>
                    ),
                    h3: ({children}) => (
                      <h3 className="text-xl font-semibold text-gray-100 mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({children}) => (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({children}) => (
                      <ul className="list-none space-y-2 mb-4">
                        {children}
                      </ul>
                    ),
                    li: ({children}) => (
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{children}</span>
                      </li>
                    ),
                    ol: ({children}) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">
                        {children}
                      </ol>
                    ),
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-blue-500 bg-blue-500/10 pl-6 py-4 my-6 rounded-r-lg">
                        <div className="text-gray-200 italic">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    code: ({node, inline, className, children, ...props}) => {
                      return !inline ? (
                        <div className="relative group">
                          <pre className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 overflow-x-auto my-4 shadow-lg">
                            <code className="text-gray-200 text-sm" {...props}>
                              {children}
                            </code>
                          </pre>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 p-2 rounded-md text-xs">
                              Copy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <code className="bg-gray-800/60 text-yellow-400 px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    },
                    strong: ({children}) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({children}) => (
                      <em className="text-gray-200 italic">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-gray-700/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ready to publish
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Generated with Google Gemini AI
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-96 text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mb-6 floating">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Your AI-Generated Blog Will Appear Here
              </h3>
              <p className="text-gray-500 mb-6 max-w-md leading-relaxed">
                Fill out the form on the left with your topic, preferred tone, and desired length. 
                Our AI will craft a compelling blog post just for you!
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex -space-x-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">✨</div>
                </div>
                <span>Powered by Google Gemini</span>
              </div>
            </div>
          )}
        </div>

        {/* Subtle glow effect when content is present */}
        {content && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl -z-10 blur-xl"></div>
        )}
      </div>
    </div>
  );
};

export default BlogView;