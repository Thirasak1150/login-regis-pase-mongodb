import { List, Avatar } from 'antd';

const data = [
  {
    title: '$2,400 - Redesign store',
    description: '09 JUN 7:20 PM',
  },
  {
    title: 'New order #3654323',
    description: '08 JUN 12:28 PM',
  },
  {
    title: 'Company server payments',
    description: '04 JUN 2:10 PM',
  },
  {
    title: 'New card added for order #4826321',
    description: '02 JUN 2:45 PM',
  },
];

const OrdersHistory = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMsoGaKbPnc.png" />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

export default OrdersHistory;