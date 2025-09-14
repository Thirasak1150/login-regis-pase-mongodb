import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Parse from '../lib/parse';
import { Row, Col, Card, Statistic, Spin, Button as AntButton } from 'antd';
import 'antd/dist/antd.css';
import { DollarCircleOutlined, UserOutlined, HeartOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';

const SalesCard = dynamic(() => import('../components/dashboard/SalesCard'), { ssr: false });
const ProjectsTable = dynamic(() => import('../components/dashboard/ProjectsTable'), { ssr: false });
const OrdersHistory = dynamic(() => import('../components/dashboard/OrdersHistory'), { ssr: false });
const ActiveUsersChart = dynamic(() => import('../components/dashboard/ActiveUsersChart'), { ssr: false });
const SalesOverviewChart = dynamic(() => import('../components/dashboard/SalesOverviewChart'), { ssr: false });

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndFetchStats() {
      try {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser) {
          setUser(currentUser);

        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Auth check or data fetch error:', err);
        if (err.message.includes('Invalid session token')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndFetchStats();
  }, [router]);

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="กำลังโหลดข้อมูล..." />
      </div>
    );
  }

  if (!user) {
    return <div>กำลัง redirect...</div>;
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Toggle Button */}
       <motion.button
         onClick={toggleSidebar}
         whileHover={{ scale: 1.1, rotate: sidebarOpen ? 180 : 0 }}
         whileTap={{ scale: 0.9 }}
         animate={{ rotate: sidebarOpen ? 90 : 0 }}
         transition={{ duration: 0.3 }}
         style={{
           position: 'fixed',
           top: '15px',
           left: sidebarOpen ? (typeof window !== 'undefined' && window.innerWidth <= 768 ? '250px' : '300px') : '15px',
           zIndex: 60,
           width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '45px' : '50px',
           height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '45px' : '50px',
           borderRadius: '50%',
           border: 'none',
           background: sidebarOpen 
             ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)'
             : 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
           color: 'white',
           fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '18px' : '20px',
           cursor: 'pointer',
           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
           backdropFilter: 'blur(10px)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           transition: 'left 0.3s ease, background 0.3s ease'
         }}
       >
         {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
       </motion.button>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        minHeight: '100vh',
        padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '15px' : '30px' 
      }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Row gutter={[16, 16]} justify="space-between" align="middle" style={{ 
          marginBottom: 20,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: typeof window !== 'undefined' && window.innerWidth <= 768 ? '15px' : '20px',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <Col>
            <h1 style={{ 
              margin: 0, 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '1.8rem' : '2.5rem',
              fontWeight: 'bold'
            }}>Dashboard</h1>
            <p style={{ margin: 0, color: '#666', fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '0.9rem' : '1.1rem' }}>Welcome: {user.get('name')} {user.get('surname')}</p>
          </Col>
          <Col>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AntButton 
                type="primary" 
                danger 
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  borderRadius: '12px',
                  height: '45px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                }}
              >
                Logout
              </AntButton>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <Row gutter={[16, 16]}>
        {[
          { title: "Today's Sales", value: "$53,000", percentage: 30, icon: <DollarCircleOutlined />, color: '#4D3AF2', delay: 0.2 },
          { title: "Today's Users", value: "3,200", percentage: 20, icon: <UserOutlined />, color: '#764ba2', delay: 0.3 },
          { title: "New Clients", value: "+1,200", percentage: -20, icon: <HeartOutlined />, color: '#8b5cf6', delay: 0.4 },
          { title: "New Orders", value: "$13,200", percentage: 10, icon: <ShoppingCartOutlined />, color: '#06b6d4', delay: 0.5 }
        ].map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                borderRadius: '20px',
                padding: '24px',
                boxShadow: `0 8px 32px ${item.color}33`,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <SalesCard 
                title={item.title} 
                value={item.value} 
                percentage={item.percentage} 
                icon={item.icon} 
              />
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              title="Active Users"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              headStyle={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <ActiveUsersChart />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={12}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              title="Sales Overview"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              headStyle={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <SalesOverviewChart />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card 
              title="Projects"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              headStyle={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <ProjectsTable />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={8}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              title="Orders History"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              headStyle={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              <OrdersHistory />
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
    </>
  );
}