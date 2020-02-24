import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { user, app } from 'reducers';
import { api } from 'services';

import { tableConstants } from 'utils/table';
import { formatDateTime } from 'utils/format';
import { withAdmin } from 'utils/auth';

function Users(props) {
  // eslint-disable-next-line react/prop-types
  const { t, users, isLoading, history } = props;

  useEffect(() => {
    props.getUsers({
      api: api.getUsers,
      params: { page: 1, pageSize: 200 }
    });
    return () => {
      props.cancel();
    };
  }, []);

  const columns = [
    {
      title: t('stt'),
      field: 'index'
    },
    // {
    //   title: t('role'),
    //   field: 'role',
    //   lookup: { cms_admin: 'Admin', cms_user: 'Người dùng' }
    // },
    { title: t('fullname'), field: 'fullname' },
    {
      title: t('email'),
      field: 'email',
      emptyValue: '-'
    },
    {
      title: t('phone'),
      field: 'phone_number',
      emptyValue: '-'
    }
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={users.map((i, idx) => ({
          ...i,
          index: idx + 1,
          created_at: formatDateTime(i.created_at)
        }))}
        actions={[
          // {
          //   icon: 'add',
          //   tooltip: t('add'),
          //   isFreeAction: true,
          //   onClick: () => history.push('/admin/users/create')
          // }
          // {
          //   icon: 'filter_list',
          //   tooltip: 'Add User',
          //   isFreeAction: true,
          //   onClick: () => alert('You want to add a new row')
          // },
          {
            icon: 'edit',
            iconProps: { color: 'primary' },
            tooltip: t('update'),
            onClick: (e, rowData) =>
              history.push(`/admin/users/update?id=${rowData.id}`),
            position: 'row'
          }
          // {
          //   icon: 'delete',
          //   iconProps: { color: 'secondary' },
          //   tooltip: t('delete'),
          //   onClick: (e, rowData) =>
          //     props.setAlert({
          //       content: 'Bạn chắc chắn muốn xoá?',
          //       buttons: [
          //         {
          //           text: t('cancel'),
          //           toggleAfterPressed: true,
          //           color: 'default'
          //         },
          //         {
          //           text: t('submit'),
          //           toggleAfterPressed: true,
          //           color: 'secondary',
          //           onPress: () =>
          //             props.deleteUser({
          //               api: api.deleteUser,
          //               params: { id: rowData.id }
          //             })
          //         }
          //       ]
          //     }),
          //   position: 'row'
          // }
        ]}
        isLoading={isLoading}
        {...tableConstants}
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  users: user.selectors.items,

  isLoading: createSelector(
    user.selectors.isLoadingItems,
    user.selectors.isDeleting,
    (isLoading, isDeleting) => {
      return Boolean(isLoading || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getUsers: user.actions.userGetAllAjax,

  deleteUser: user.actions.userDeleteAjax,

  cancel: user.actions.userGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(withAdmin(Users));
