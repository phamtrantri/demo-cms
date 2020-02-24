import React from 'react';
import { NavLink } from 'react-router-dom';

// material components
import Icon from '@material-ui/core/Icon';

// core components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// icons
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import FileIcon from '@material-ui/icons/AttachFileOutlined';

function Settings() {
  const data = [
    {
      path: '/admin/settings/hospital',
      title: 'Cấu hình chung',
      subtitle: 'Xem và chỉnh sửa thông tin bệnh viện của bạn',
      icon: SettingsIcon
    },
    {
      path: '/admin/settings/account',
      title: 'Tài khoản',
      subtitle: 'Quản lý tài khoản và phân quyền',
      icon: AccountIcon
    },
    {
      path: '/admin/settings/notifications',
      title: 'Thông báo',
      subtitle: 'Quản lý thông báo gửi tới bạn và khách hàng',
      icon: NotificationsIcon
    },
    {
      path: '/admin/settings/files',
      title: 'Quản lý file',
      subtitle: 'Upload và quản lý ảnh',
      icon: FileIcon
    }
  ];

  return (
    <Card>
      <CardBody>
        <GridContainer>
          {data.map((i, idx) => {
            return (
              <GridItem md={4} sm={6} xs={12} key={idx}>
                <NavLink
                  to={i.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 0'
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      marginRight: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f4f6f8'
                    }}
                  >
                    {typeof i.icon === 'string' ? (
                      <Icon style={{ width: 30, height: 30, fill: '#919eab' }}>
                        {i.icon}
                      </Icon>
                    ) : (
                      <i.icon
                        style={{
                          width: 30,
                          height: 30,
                          fill: '#919eab'
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p style={{ fontWeight: 500, margin: 0, color: '#08f' }}>
                      {i.title}
                    </p>
                    <p style={{ color: '#637381', margin: 0, fontSize: 14 }}>
                      {i.subtitle}
                    </p>
                  </div>
                </NavLink>
              </GridItem>
            );
          })}
        </GridContainer>
      </CardBody>
    </Card>
  );
}

export default Settings;
