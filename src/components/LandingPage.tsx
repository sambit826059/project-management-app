import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Layout, 
  Users, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ProjectFlow Pro</span>
            </div>
            <button
              onClick={() => navigate('/app')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Try Now
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Manage projects with
              <span className="text-blue-600"> ease and efficiency</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your workflow, collaborate with your team, and deliver projects on time with our intuitive project management solution.
            </p>
            <div className="mt-10">
              <button
                onClick={() => navigate('/app')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Try it out
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-32 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Task Management</h3>
              <p className="mt-2 text-gray-500">
                Create, organize, and track tasks with our intuitive Kanban board interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Team Collaboration</h3>
              <p className="mt-2 text-gray-500">
                Work together seamlessly with your team members in real-time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
              <p className="mt-2 text-gray-500">
                Monitor project progress and keep everyone aligned with project goals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}