export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataGemstone = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "WEIGHT",
    accessor: "weight",
  },
  {
    Header: "SIZE",
    accessor: "size",
  },
  {
    Header: "DATE",
    accessor: "createdAt",
  },
];

export const columnsDataOrder =  [
  {
    Header: "CODE ORDER",
    accessor: "orders._id",
  },
  {
    Header: "PRICE",
    accessor: "totalPrice",
  },
  {
    Header: "CUSTOMER",
    accessor: "customerID.name",
  },
  {
    Header: "PAYMENT",
    accessor: "payment",
  },
  {
    Header: "STORE",
    accessor: "STOREID",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
];

export const columnsDataStore =  [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "LOCATION",
    accessor: "location",
  },
  {
    Header: "INVOICE",
    accessor: "invoice",
  },
];

export const columnsDataCustomer =  [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "ADDRESS",
    accessor: "address",
  },
  {
    Header: "INVOICE",
    accessor: "invoice",
  },
];

export const columnsDataColumns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "CATEGORY",
    accessor: "categoryID.name",
  },

  {
    Header: "ACTION",
    accessor: "DELETE",
  },
];


export const columnsDataCategory = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "ACTION",
    accessor: "action", // Custom accessor for actions like delete
  },
];
