import { Layout, Input, Avatar, Badge } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <span style={{color: '#ccc'}}>Pages / Dashboard</span>
            <h2 style={{margin:0}}>Dashboard</h2>
        </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input.Search placeholder="Type here..." style={{ width: 200, marginRight: 16 }} />
        <Badge count={5} style={{ marginRight: 24 }}>
            <BellOutlined style={{ fontSize: 20}}/>
        </Badge>
        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;