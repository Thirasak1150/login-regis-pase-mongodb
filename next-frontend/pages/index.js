import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page immediately
    router.push('/login');
  }, [router]);

  return (
    <div style={{
      padding: '0px',
      margin: '0px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
    }}>
      <div style={{ color: 'white', fontSize: '18px' }}>
        🔄 กำลังเปลี่ยนเส้นทาง...
      </div>
    </div>
  );
}