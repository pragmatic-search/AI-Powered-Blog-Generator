import { useState } from 'react';

const BlogForm = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
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
    { value: 'casual', label: 'Casual', desc: 'Friendly and conversational' },
    { value: 'professional', label: 'Professional', desc: 'Formal and business-like' },
    { value: 'technical', label: 'Technical', desc: 'Detailed and precise' },
    { value: 'academic', label: 'Academic', desc: 'Scholarly and research-focused' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', words: '300 words', desc: 'Quick read' },
    { value: 'medium', label: 'Medium', words: '500 words', desc: 'Balanced length' },
    { value: 'long', label: 'Long', words: '800+ words', desc: 'In-depth coverage' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Generate Your Blog
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-500">Fill in the details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Blog Topic <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="What would you like to write about?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Writing Tone
          </label>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((option) => (
              <label 
                key={option.value} 
                className={`relative cursor-pointer rounded-lg p-4 border transition-all duration-200 ${
                  formData.tone === option.value 
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={formData.tone === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="space-y-1">
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.desc}</div>
                </div>
                {formData.tone === option.value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Content Length
          </label>
          <div className="grid grid-cols-3 gap-3">
            {lengthOptions.map((option) => (
              <label 
                key={option.value} 
                className={`relative cursor-pointer rounded-lg p-3 text-center border transition-all duration-200 ${
                  formData.length === option.value 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 shadow-inner'
                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                }`}
              >
                <input
                  type="radio"
                  name="length"
                  value={option.value}
                  checked={formData.length === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="space-y-1">
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.words}</div>
                </div>
                {formData.length === option.value && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button - Completely icon-free */}
        <button
          type="submit"
          disabled={isLoading || !formData.topic.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
            isLoading || !formData.topic.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse">Generating...</span>
            </span>
          ) : (
            'Generate Blog Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;