import { useState } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Parse from '../lib/parse';
import Head from 'next/head';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Register Data:', formData);  // Debug
      console.log('Parse Config:', { appId: Parse.applicationId, serverURL: Parse.serverURL });  // Debug

      const user = new Parse.User();
      user.set('username', formData.username);
      user.set('password', formData.password);
      user.set('name', formData.name);
      user.set('surname', formData.surname);

      const newUser = await user.signUp();
      console.log('Success User:', newUser);
      message.success('สมัครสมาชิกสำเร็จ!', 3);
      router.push('/login');
    } catch (err) {
      console.error('Full Register Error:', err, 'Code:', err.code);
      if (err.code === 125) {
        setError('Username นี้มีอยู่แล้ว');
      } else if (err.code === 401 || err.message.includes('unauthorized')) {
        setError('ไม่ได้รับอนุญาต: เช็ค App ID/Server URL ใน .env.local');
      } else {
        setError(err.message || 'เกิดข้อผิดพลาด');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>สมัครสมาชิก</title>
        <meta name="description" content="สมัครสมาชิก Kuyton" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '15px' : '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '20px',
          padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '24px' : '40px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? '20px' : '30px' }}>
            <h1 style={{
              color: '#333',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '24px' : '28px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>สมัครสมาชิก</h1>
            <p style={{ color: '#666', margin: 0 }}>เริ่มต้นการเดินทางกับเรา!</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '20px' }}>
              <input
                name="username"
                placeholder="ชื่อผู้ใช้"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px 16px' : '15px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: typeof window !== 'undefined' && window.innerWidth <= 768 ? '10px' : '12px',
                  fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '14px' : '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                name="password"
                type="password"
                placeholder="รหัสผ่าน"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <input
                name="name"
                placeholder="ชื่อ"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
              <input
                name="surname"
                placeholder="นามสกุล"
                value={formData.surname}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              style={{
                width: '100%',
                padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '15px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                color: 'white',
                border: 'none',
                borderRadius: typeof window !== 'undefined' && window.innerWidth <= 768 ? '10px' : '12px',
                fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '14px' : '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: loading ? 'none' : 'translateY(0)',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(118, 75, 162, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(118, 75, 162, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.4)';
                }
              }}
            >
              {loading ? '🔄 กำลังสมัครสมาชิก...' : '✨ สมัครสมาชิก'}
            </button>
          </form>
          
          {error && (
            <div style={{
              marginTop: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '20px',
              padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '15px',
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: typeof window !== 'undefined' && window.innerWidth <= 768 ? '6px' : '8px',
              color: '#c33',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}
          
          <div style={{
            textAlign: 'center',
            marginTop: typeof window !== 'undefined' && window.innerWidth <= 768 ? '20px' : '25px',
            paddingTop: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '20px',
            borderTop: '1px solid #eee'
          }}>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>มีบัญชีแล้ว?</p>
            <a 
              href="/login" 
              style={{
                color: '#764ba2',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#764ba2'}
            >
              🔑 เข้าสู่ระบบที่นี่
            </a>
          </div>
        </div>
      </div>
    </>
  );
}