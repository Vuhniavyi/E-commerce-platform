const paginationGlobalRules = {
  defaultCurrent: 1,
  pageSizeOptions: ['10', '20', '50', '250', '500'],
  showSizeChanger: true,
};

export const CONFIG = (type, total) => (
  total ?
    {
      pagination: {
        ...paginationGlobalRules,
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} ${type}`,
        total,
      },
    } :
    {
      pagination: {
        ...paginationGlobalRules,
      },
    }
);