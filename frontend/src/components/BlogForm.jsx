import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const BlogForm = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('casual');
  const [length, setLength] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate({ topic, tone, length });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Blog Topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="Enter a topic for your blog..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
            Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Length
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="short">Short (300 words)</option>
            <option value="medium">Medium (500 words)</option>
            <option value="long">Long (800 words)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Generating...' : (
          <>
            <FiSend className="mr-2" />
            Generate Blog
          </>
        )}
      </button>
    </form>
  );
};

export default BlogForm;