import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { exchangeCodeForSessionToken } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      try {
        await exchangeCodeForSessionToken();
        navigate('/');
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/');
      }
    }

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
        <p className="text-purple-200">Completing sign in...</p>
      </div>
    </div>
  );
}
