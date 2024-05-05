import * as React from "react";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  Comparator,
} from "react-bootstrap-table2-filter";

const dataTable = (props) => {
  const products = [
    { id: 1, name: "test", price: 123 },
    { id: 2, name: "sad", price: 222 },
  ];
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter({
        comparator: Comparator.EQ,
      }),
    },
    {
      dataField: "price",
      text: "Product Price",
      filter: textFilter(),
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        filter={filterFactory()}
      />
    </>
  );
};

export default dataTable;
