import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { contact, app } from 'reducers';
import { api } from 'services';

import { tableConstants } from 'utils/table';
import { formatDateTime } from 'utils/format';

function Contacts(props) {
  // eslint-disable-next-line react/prop-types
  const { t, contacts, isLoading } = props;

  useEffect(() => {
    props.getContacts({
      countApi: api.countContacts,
      api: api.getContacts,
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
    {
      title: t('email'),
      field: 'contact'
    },
    {
      title: t('createdAt'),
      field: 'created_at'
    },
    {
      title: t('status'),
      field: 'status',
      lookup: { 1: t('active'), 2: t('inactive') }
    },
  ];

  return (
    <Suspense>
      <MaterialTable
        columns={columns}
        data={contacts.map((i, idx) => ({
          ...i,
          index: idx + 1,
          created_at: formatDateTime(i.created_at)
        }))}
        actions={[
          // {
          //   icon: 'add',
          //   tooltip: t('add'),
          //   isFreeAction: true,
          //   onClick: () => history.push('/admin/categories/create')
          // },
          // {
          //   icon: 'edit',
          //   iconProps: { color: 'primary' },
          //   tooltip: t('update'),
          //   onClick: (e, rowData) =>
          //     history.push(`/admin/categories/update?id=${rowData._id}`),
          //   position: 'row'
          // },
          {
            icon: 'delete',
            iconProps: { color: 'secondary' },
            tooltip: t('delete'),
            onClick: (e, rowData) => {
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
                      props.deleteContact({
                        api: api.deleteContact,
                        params: { _id: rowData._id }
                      })
                  }
                ]
              });
            },
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
  contacts: contact.selectors.items,

  isLoading: createSelector(
    contact.selectors.isLoadingItems,
    contact.selectors.isUpdating,
    (isLoading, isUpdating) => {
      return Boolean(isLoading || isUpdating);
    }
  )
});

const mapDispatchToProps = {
  getContacts: contact.actions.contactGetAllAjax,

  updateContact: contact.actions.contactUpdateAjax,

  deleteContact: contact.actions.contactDeleteAjax,

  cancel: contact.actions.contactGetAllCancelled,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Contacts);
