import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ReactTable = (props) => {
  
  const columns = [
    {
      name: "Month",
      style: { backgroundColor: "rgb(16, 200, 53)" },
      selector: (row) => row.month,
    },
    {
      name: "Principal Payment",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.principalPayment,
    },
    {
      name: "Payment Interest",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.interestPayment,
    },
    {
      name: "Total Payment",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.totalPayment,
    },
    {
      name: "Balance",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.balance,
    },
    {
      name: "Loan Paid Till Date",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.loanPaidTillDate,
    },
    {
      name: "Loan Paid Percentage",
      style: { backgroundColor: "rgb(177, 21, 216)" },
      selector: (row) => row.loanPaidPercentage,
    },
  ];
  return (
    <div style={{ marginTop: "60px",width:'80%' }}>
      <DataTable
        columns={columns}
        data={props.data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        selectableRowsHighlight
        highlightOnHover
        subHeaderAlign="left"
      />
    </div>
  );
};
export default ReactTable;