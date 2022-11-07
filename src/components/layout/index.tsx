import React, { FC, useState } from 'react'
import './styles.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Header, Sider, Content } = Layout

interface ILayoutComponent {
  children: any
}

const LayoutComponent: FC<ILayoutComponent> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Employee'
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <Content className="site-layout-background">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent
