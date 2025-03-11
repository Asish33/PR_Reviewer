import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const WS_URL = "wss://pr-reviewer-bu54.onrender.com";

interface User {
  githubId: string;
  username: string;
}

interface Webhook {
  id: string;
  content: string;
  repoName: string;
  owner: string;
  createdAt: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const githubId = searchParams.get("githubId");
    if (githubId) {
      localStorage.setItem("githubId", githubId);
      setUser((prev) => ({ ...prev, githubId } as User));
    }
  }, [searchParams]);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      const githubId = localStorage.getItem("githubId");
      if (githubId) {
        socket.send(JSON.stringify({ githubId }));
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.user) {
          setUser(data.user);
        }

        if (Array.isArray(data)) {
          setWebhooks(data);
        } else if (data.id) {
          setWebhooks((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!user)
    return <p className="text-center text-gray-500">Loading user...</p>;

  return (
    <div className="w-full min-h-screen p-4 overflow-hidden">
      <h1 className="text-2xl font-semibold">Webhook Dashboard</h1>
      <p className="text-gray-600 mt-2">GitHub ID: {user.githubId}</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        {webhooks.length > 0 ? (
          [...webhooks].reverse().map((webhook) => (
            <div
              key={webhook.id}
              className="border p-4 rounded-lg shadow bg-white"
            >
              <p className="text-sm text-gray-500">{webhook.repoName}</p>
              <p className="mt-1">{webhook.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(webhook.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No webhooks received yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
