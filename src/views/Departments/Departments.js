import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { department, app } from 'reducers';

import { formatStr } from 'utils/format';
import { tableConstants } from 'utils/table';
import Handle from 'components/Handle/index';

function Departments(props) {
  // eslint-disable-next-line react/prop-types
  const { t, departments, isLoading, history } = props;

  useEffect(() => {
    props.getDepartments({
      countApi: api.countDepartments,
      api: api.getDepartments,
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
    { title: t('code'), field: 'code' },
    {
      title: t('logo'),
      field: 'logo',
      render: rowData => {
        if (!rowData.logo) return '';
        return <img src={rowData.logo} style={{ width: 80 }} alt={t('logo')} />;
      }
    },
    {
      title: t('title'),
      field: 'title',
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: 200
      }
    },
    {
      title: t('handle'),
      field: 'handle',
      render: rowData => {
        return <Handle handle={rowData.handle}></Handle>;
      }
    },
    {
      title: t('description'),
      field: 'description',
      render: rowData => {
        const str = rowData.description;
        return formatStr(str, 120);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('introduction'),
      field: 'introduction',
      render: rowData => {
        const str = rowData.introduction;
        return formatStr(str, 120);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('function'),
      field: 'function',
      render: rowData => {
        const str = rowData.function;
        return formatStr(str, 120);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('mission'),
      field: 'mission',
      render: rowData => {
        const str = rowData.mission;
        return formatStr(str, 120);
      },
      cellStyle: {
        whiteSpace: 'unset',
        minWidth: '200px'
      }
    },
    {
      title: t('displayPosition'),
      field: 'display_position',
      cellStyle: {
        minWidth: 70
      }
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    }
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={departments.map((i, index) => ({
          ...i,
          index: index + 1,
          title: i.contents.length > 0 ? i.contents[0].title : '',
          handle: i.contents.length > 0 ? i.contents[0].handle : '',
          introduction: i.contents.length > 0 ? i.contents[0].introduction : '',
          function: i.contents.length > 0 ? i.contents[0].function : '',
          mission: i.contents.length > 0 ? i.contents[0].mission : ''
        }))}
        actions={[
          {
            icon: 'add',
            tooltip: t('add'),
            isFreeAction: true,
            onClick: () => history.push('/admin/departments/create')
          },
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
              history.push(`/admin/departments/update?id=${rowData._id}`),
            position: 'row'
          },
          {
            icon: 'delete',
            iconProps: { color: 'secondary' },
            tooltip: t('delete'),
            onClick: (e, rowData) =>
              props.setAlert({
                content: 'Bạn chắc chắn muốn xoá?',
                buttons: [
                  {
                    text: t('cancel'),
                    toggleAfterPressed: true,
                    color: 'default'
                  },
                  {
                    text: t('submit'),
                    toggleAfterPressed: true,
                    color: 'secondary',
                    onPress: () =>
                      props.deleteDepartment({
                        api: api.deleteDepartment,
                        params: { _id: rowData._id }
                      })
                  }
                ]
              }),
            position: 'row'
          }
        ]}
        isLoading={isLoading}
        {...tableConstants}
      />
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  departments: department.selectors.items,

  isLoading: createSelector(
    department.selectors.isLoadingItems,
    department.selectors.isUpdating,
    department.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getDepartments: department.actions.departmentGetAllAjax,

  updateDepartment: department.actions.departmentUpdateAjax,

  deleteDepartment: department.actions.departmentDeleteAjax,

  cancel: department.actions.departmentGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Departments);
