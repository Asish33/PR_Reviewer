import React, { useEffect, useState } from "react";

import { AlertCircle, ExternalLink, RefreshCcw } from "lucide-react";

export function Dashboard() {
  const [webhooks, setWebhooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWebhooks = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        "http://https://pr-mqz2.onrender.com/webhook"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch webhook data");
      }
      const data = await response.json();
      setWebhooks(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
    const interval = setInterval(fetchWebhooks, 30000);
    return () => clearInterval(interval);
  }, []);

  const getEventColor = (event) => {
    const colors = {
      push: { bg: "bg-green-100", text: "text-green-800" },
      pull_request: { bg: "bg-purple-100", text: "text-purple-800" },
      issue: { bg: "bg-blue-100", text: "text-blue-800" },
      release: { bg: "bg-yellow-100", text: "text-yellow-800" },
      default: { bg: "bg-gray-100", text: "text-gray-800" },
    };
    return colors[event.toLowerCase()] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Webhook Events Dashboard
          </h1>
          <button
            onClick={fetchWebhooks}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <RefreshCcw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg animate-fadeIn">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Repository
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {webhooks.map((webhook) => {
                    const eventColors = getEventColor(webhook.event);
                    return (
                      <tr
                        key={webhook.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                  
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${eventColors.bg} ${eventColors.text}`}
                          >
                            {webhook.event}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              {webhook.repository}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {webhook.sender}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => console.log(webhook.payload)}
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            View Details
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {webhooks.length === 0 && !error && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-lg">
                            No webhook events received yet
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Events will appear here once received
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
