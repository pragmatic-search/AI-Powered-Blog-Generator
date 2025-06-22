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
      toast.success('🎉 Blog generated successfully!', {
        style: {
          background: 'rgba(17, 25, 40, 0.9)',
          color: '#fff',
          border: '1px solid rgba(34, 197, 94, 0.3)',
        },
      });
    } catch (error) {
      console.error('Error generating blog:', error);
      toast.error('❌ Failed to generate blog. Please try again.', {
        style: {
          background: 'rgba(17, 25, 40, 0.9)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
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
      toast.success('💾 Blog saved successfully!', {
        style: {
          background: 'rgba(17, 25, 40, 0.9)',
          color: '#fff',
          border: '1px solid rgba(34, 197, 94, 0.3)',
        },
      });
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('❌ Failed to save blog. Please try again.', {
        style: {
          background: 'rgba(17, 25, 40, 0.9)',
          color: '#fff',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen gradient-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-gradient">
                AI Blog Generator
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Harness the power of <span className="text-blue-400 font-semibold">Google Gemini AI</span> to create 
              compelling, high-quality blog posts in seconds
            </p>
            <div className="mt-6 flex justify-center">
              <div className="glass-light px-6 py-3 rounded-full">
                <span className="text-sm text-gray-300">✨ Powered by Advanced AI Technology</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Blog Form */}
            <div className="lg:col-span-4">
              <div className="glass card-hover glow-blue p-8 rounded-2xl">
                <BlogForm onGenerate={handleGenerate} isLoading={isGenerating} />
              </div>
            </div>

            {/* Blog View */}
            <div className="lg:col-span-8">
              <div className="glass card-hover glow-purple p-8 rounded-2xl">
                <BlogView
                  content={blogContent}
                  onSave={handleSave}
                  isLoading={isSaving}
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-light p-6 rounded-xl text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">Generate professional blogs in under 30 seconds</p>
              </div>
              
              <div className="glass-light p-6 rounded-xl text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart AI</h3>
                <p className="text-gray-400 text-sm">Powered by Google Gemini's advanced language model</p>
              </div>
              
              <div className="glass-light p-6 rounded-xl text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
                <p className="text-gray-400 text-sm">Multiple tones and lengths to fit your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </div>
  );
}

export default App;