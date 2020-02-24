import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { createStructuredSelector, createSelector } from 'reselect';

import { api } from 'services';
import { language, app } from 'reducers';

import { tableConstants } from 'utils/table';

function Languages(props) {
  //   const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { t, languages, isLoading, history, getLanguages } = props;

  useEffect(() => {
    getLanguages({
      api: api.getLanguages,
      params: { page: 1, pageSize: 200 }
    });
  }, [getLanguages]);

  const columns = [
    {
      title: t('stt'),
      field: 'index'
    },
    {
      title: t('name'),
      field: 'name'
    },
    {
      title: t('abbreviations'),
      field: 'language'
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
        data={languages.map((i, idx) => ({ ...i, index: idx + 1 }))}
        actions={[
          // {
          //   icon: 'add',
          //   tooltip: t('add'),
          //   isFreeAction: true,
          //   onClick: () => history.push('/admin/languages/create')
          // },
          {
            icon: 'edit',
            iconProps: { color: 'primary' },
            tooltip: t('update'),
            onClick: (e, rowData) =>
              history.push(`/admin/languages/update?id=${rowData._id}`),
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
          //             props.deleteLanguage({
          //               api: api.deleteLanguage,
          //               params: { _id: rowData._id }
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
  languages: language.selectors.items,

  isLoading: createSelector(
    language.selectors.isLoadingItems,
    language.selectors.isUpdating,
    language.selectors.isDeleting,

    (isLoading, isUpdating, isDeleting) => {
      return Boolean(isLoading || isUpdating || isDeleting);
    }
  )
});

const mapDispatchToProps = {
  getLanguages: language.actions.languageGetAllAjax,

  updateLanguage: language.actions.languageUpdateAjax,

  deleteLanguage: language.actions.languageDeleteAjax,

  setAlert: app.actions.setAlert
};

const enhancers = [
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
];

export default compose(...enhancers)(Languages);
