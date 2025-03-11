import { Github, Activity, Bell, Shield, ArrowRight } from "lucide-react";

export function Landing() {
  function Auth() {
    window.location.href = "https://pr-reviewer-bu54.onrender.com/auth/github";
    return;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="relative inline-block">
            <Github className="h-20 w-20 text-white mx-auto mb-6 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            GitHub Webhook Monitor
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and visualization of your GitHub repository
            events with instant notifications and detailed analytics
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="relative z-10 flex bg-blue-600 p-3 rounded-lg items-center" onClick={Auth}>
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
            <div className="absolute -top-5 left-5">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              Real-time Monitoring
            </h3>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Stay updated with instant notifications and real-time event
              tracking for all your repository activities
            </p>
          </div>

          <div className="group relative bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
            <div className="absolute -top-5 left-5">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              Smart Notifications
            </h3>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Customizable alerts and detailed event information to keep you
              informed about important repository changes
            </p>
          </div>

          <div className="group relative bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
            <div className="absolute -top-5 left-5">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              Secure Integration
            </h3>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Enterprise-grade security with encrypted webhook handling and
              robust authentication mechanisms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
