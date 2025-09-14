import { Table, Progress, Avatar } from 'antd';
import { ShopOutlined, RocketOutlined, BugOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'COMPANIES',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <>
        <Avatar 
          style={{ 
            background: record.logoColor,
            color: 'white',
            fontSize: '16px'
          }}
          icon={record.logoIcon}
        />
        <span style={{ marginLeft: 8 }}>{text}</span>
      </>
    ),
  },
  {
    title: 'MEMBERS',
    dataIndex: 'members',
    key: 'members',
    render: (members) => (
      <Avatar.Group>
        {members.map((member, index) => (
          <Avatar 
            key={index} 
            style={{ 
              background: member.color,
              color: 'white'
            }}
            icon={<UserOutlined />}
          />
        ))}
      </Avatar.Group>
    ),
  },
  {
    title: 'BUDGET',
    dataIndex: 'budget',
    key: 'budget',
  },
  {
    title: 'COMPLETION',
    dataIndex: 'completion',
    key: 'completion',
    render: (completion) => <Progress percent={completion} />,
  },
];

const data = [
  {
    key: '1',
    logoIcon: <ShopOutlined />,
    logoColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    name: 'Soft UI Shopify Version',
    members: [
      { color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' },
      { color: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' },
    ],
    budget: '$14,000',
    completion: 60,
  },
  {
    key: '2',
    logoIcon: <RocketOutlined />,
    logoColor: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    name: 'Progress Track',
    members: [{ color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }],
    budget: '$3,000',
    completion: 10,
  },
  {
    key: '3',
    logoIcon: <BugOutlined />,
    logoColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    name: 'Fix Platform Errors',
    members: [
      { color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
      { color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    ],
    budget: 'Not set',
    completion: 100,
  },
  {
    key: '4',
    logoIcon: <MobileOutlined />,
    logoColor: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    name: 'Launch our Mobile App',
    members: [{ color: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)' }],
    budget: '$20,500',
    completion: 100,
  },
];

const ProjectsTable = () => <Table columns={columns} dataSource={data} pagination={false} />;

export default ProjectsTable;