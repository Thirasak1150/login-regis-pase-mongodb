import { Col, Row, Statistic } from 'antd';
import { motion } from 'framer-motion';

const SalesCard = ({ title, value, percentage, icon }) => (
  <div style={{ height: '100%' }}>
    <Row align="middle" style={{ height: '100%' }}>
      <Col span={16}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Statistic 
            title={title} 
            value={value} 
            titleStyle={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '14px',
              fontWeight: '500'
            }}
            valueStyle={{ 
              color: 'white', 
              fontSize: '28px',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          />
        </motion.div>
      </Col>
      <Col span={8} style={{ textAlign: 'right' }}>
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{
            fontSize: '36px',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {icon}
        </motion.div>
      </Col>
    </Row>
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{ marginTop: 12 }}
    >
      <motion.span 
        style={{ 
          color: percentage > 0 ? '#4ade80' : '#f87171',
          fontWeight: 'bold',
          fontSize: '16px',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
        whileHover={{ scale: 1.05 }}
      >
        {percentage > 0 ? '↗' : '↘'} {Math.abs(percentage)}%
      </motion.span>
      <span style={{ 
        color: 'rgba(255, 255, 255, 0.8)', 
        marginLeft: '8px',
        fontSize: '14px'
      }}>
        Since last month
      </span>
    </motion.div>
  </div>
);

export default SalesCard;