import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import Checkbox from "./Checkbox";

import styled from "styled-components";

const ScrollableTableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  padding: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  box-shadow: none;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background-color: #3182ce;
    color: #fff;
    font-weight: 600;
    height: 3rem;
  }

  tr {
    background-color: #fff;
    transition: background-color 0.3s;
  }

  tr:nth-child(odd) {
    background-color: #f7fafc;
  }

  tr:hover {
    background-color: #bee3f8;
  }

  @media (min-width: 640px) {
    th,
    td {
      padding: 1.25rem;
    }
  }
`;

const TransactionTable = ({
  transactions,
  onCategoryChange,
  getMerchantName,
  categories,
  handleBillableChange,
}) => {
  return (
    <ScrollableTableContainer>
      <StyledTable>
        {transactions && transactions.length > 0 ? (
          <>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date</th>
                <th>Merchant Name</th>
                <th>Team Member</th>
                <th>Category</th>
                <th>Amount</th>
                <th>GST</th>
                <th>Budget</th>
                <th>Receipt</th>
                <th>Billable</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.status}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{getMerchantName(transaction.merchant)}</td>
                  <td>{transaction.team_member}</td>
                  <td>
                    <CategoryDropdown
                      categories={categories}
                      selectedCategory={transaction.category}
                      onCategoryChange={onCategoryChange(transaction.id)}
                    />
                  </td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>${transaction.gst.toFixed(2)}</td>
                  <td>{transaction.budget}</td>
                  <td>
                    <Checkbox
                      checked={transaction.receipt}
                      readOnly
                      data-testid="receipt-checkbox"
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={transaction.billable}
                      onChange={handleBillableChange(transaction.id)}
                      data-testid="billable-checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan="10">No transactions found</td>
            </tr>
          </tbody>
        )}
      </StyledTable>
    </ScrollableTableContainer>
  );
};

export default TransactionTable;
