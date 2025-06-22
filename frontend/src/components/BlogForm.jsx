import { useState } from 'react';

const BlogForm = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'casual',
    length: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;
    onGenerate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toneOptions = [
    { value: 'casual', label: 'Casual', icon: '😊', desc: 'Friendly and conversational' },
    { value: 'professional', label: 'Professional', icon: '💼', desc: 'Formal and business-like' },
    { value: 'technical', label: 'Technical', icon: '🔧', desc: 'Detailed and precise' },
    { value: 'academic', label: 'Academic', icon: '🎓', desc: 'Scholarly and research-focused' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', words: '300', icon: '⚡', desc: 'Quick read' },
    { value: 'medium', label: 'Medium', words: '500', icon: '📄', desc: 'Balanced length' },
    { value: 'long', label: 'Long', words: '800+', icon: '📚', desc: 'In-depth coverage' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">🚀</span>
          Generate Your Blog
        </h2>
        <p className="text-gray-400 text-sm">Fill in the details and let AI work its magic</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-3">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Blog Topic
          </label>
          <div className="relative">
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter your amazing blog topic..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 form-input backdrop-blur-sm"
              required
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100"></div>
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">🎨</span>
            Writing Tone
          </label>
          <div className="grid grid-cols-1 gap-3">
            {toneOptions.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={formData.tone === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  formData.tone === option.value
                    ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/30 border-gray-600/30 hover:bg-gray-700/30 hover:border-gray-500/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                    {formData.tone === option.value && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <span className="text-lg">📏</span>
            Content Length
          </label>
          <div className="grid grid-cols-1 gap-3">
            {lengthOptions.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="length"
                  value={option.value}
                  checked={formData.length === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  formData.length === option.value
                    ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/30 border-gray-600/30 hover:bg-gray-700/30 hover:border-gray-500/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white flex items-center gap-2">
                        {option.label}
                        <span className="text-sm bg-gray-700/50 px-2 py-1 rounded-md text-gray-300">
                          {option.words} words
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                    {formData.length === option.value && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.topic.trim()}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 btn-hover-effect relative overflow-hidden ${
            isLoading || !formData.topic.trim()
              ? 'bg-gray-600/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="spinner"></div>
              <span>Generating Magic...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">✨</span>
              Generate Blog Post
              <span className="text-lg">🚀</span>
            </div>
          )}
        </button>

        {/* Progress indicator when loading */}
        {isLoading && (
          <div className="space-y-2">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
            <p className="text-center text-sm text-gray-400">
              AI is crafting your perfect blog post...
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;