import { useState } from 'react';
import axios from 'axios';
import BlogForm from './components/BlogForm';
import BlogView from './components/BlogView';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [blogContent, setBlogContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async ({ topic, tone, length }) => {
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:8000/api/generate', {
        topic,
        tone,
        length,
      });
      setBlogContent(response.data.blog);
      toast.success('Blog generated successfully!');
    } catch (error) {
      console.error('Error generating blog:', error);
      toast.error('Failed to generate blog. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!blogContent) return;
    
    setIsSaving(true);
    try {
      await axios.post('http://localhost:8000/api/blogs', {
        content: blogContent,
      });
      toast.success('Blog saved successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Blog Generator</h1>
          <p className="mt-2 text-lg text-gray-600">
            Generate high-quality blog posts with Google Gemini
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <BlogForm onGenerate={handleGenerate} isLoading={isGenerating} />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <BlogView 
                content={blogContent} 
                onSave={handleSave} 
                isLoading={isSaving} 
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;