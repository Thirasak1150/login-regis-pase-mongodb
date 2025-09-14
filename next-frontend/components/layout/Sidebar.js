import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Parse from '../../lib/parse';

const Sidebar = ({ isOpen, onToggle }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await Parse.User.logOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      icon: '📊',
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
      active: router.pathname === '/dashboard'
    },
    {
      icon: '🚪',
      label: 'Logout',
      onClick: handleLogout,
      loading: isLoggingOut
    }
  ];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 40
            }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: typeof window !== 'undefined' && window.innerWidth <= 768 ? -250 : -280 }}
        animate={{ x: isOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth <= 768 ? -250 : -280) }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '250px' : '280px',
          zIndex: 50,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '20px' : '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}
          >
            Kuyton Menu
          </motion.h2>
        </div>

        {/* Menu Items */}
        <div style={{ padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '16px' }}>
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              disabled={item.loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '16px',
                marginBottom: '8px',
                borderRadius: '12px',
                border: 'none',
                color: 'white',
                fontWeight: '500',
                fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '14px' : '16px',
                cursor: item.loading ? 'not-allowed' : 'pointer',
                backgroundColor: item.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                boxShadow: item.active ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                opacity: item.loading ? 0.5 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '20px' : '24px', marginRight: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '16px' }}>
                {item.loading ? '⏳' : item.icon}
              </span>
              <span>
                {item.loading ? 'Logging out...' : item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16px' : '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '12px' : '14px',
              textAlign: 'center',
              margin: 0
            }}
          >
            Kuyton Dashboard v1.0
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;