import { useState } from 'react';
import axios from 'axios';
import BlogForm from './components/BlogForm';
import BlogView from './components/BlogView';
import { Toaster, toast } from 'react-hot-toast';
import './index.css'; // Ensure this import exists

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
      toast.success('Blog generated successfully!', {
        style: {
          background: 'linear-gradient(90deg, #f0fdf4, #dcfce7)',
          color: '#166534',
          borderLeft: '4px solid #22c55e'
        }
      });
    } catch (error) {
      console.error('Error generating blog:', error);
      toast.error('Failed to generate blog. Please try again.', {
        style: {
          background: 'linear-gradient(90deg, #fef2f2, #fee2e2)',
          color: '#b91c1c',
          borderLeft: '4px solid #ef4444'
        }
      });
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
      toast.success('Blog saved successfully!', {
        style: {
          background: 'linear-gradient(90deg, #f0fdf4, #dcfce7)',
          color: '#166534',
          borderLeft: '4px solid #22c55e'
        }
      });
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog. Please try again.', {
        style: {
          background: 'linear-gradient(90deg, #fef2f2, #fee2e2)',
          color: '#b91c1c',
          borderLeft: '4px solid #ef4444'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient">
            AI Blog Generator
          </h1>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional content with AI assistance
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <BlogForm 
                onGenerate={handleGenerate} 
                isLoading={isGenerating} 
              />
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-full hover:shadow-2xl transition-all duration-300">
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