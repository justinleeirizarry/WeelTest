import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import Checkbox from './Checkbox';

import styled from "styled-components";

const ScrollableTableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;



const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
 box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);  
  background-color: #fff; 
  color: #333; 
  border-radius: 5px;

  overflow: hidden;

  th, td {
    padding: 1em 1.2em; 
    text-align: left;
    border-bottom: 1px solid #e2e8f0; 
  }

  th {
    background-color:#36454F;
    color: white;
    height: 8vh;
  }

  tr:last-child td {
    border-bottom: 0;
  }

   

  tr:nth-child(odd) {
    background-color: #f7fafc; 
  }

  tr:hover {
    background-color: #d3d3d3 ;
  }

  @media (min-width: 480px) {
    th, td {
      display: table-cell;
    }
  }
`;


const TransactionTable = ({ transactions, onCategoryChange, getMerchantName, categories, handleBillableChange }) => {
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
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.date}</td>
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
                                        <Checkbox checked={transaction.receipt} readOnly data-testid="receipt-checkbox" />
                                    </td>
                                    <td>

                                        <Checkbox checked={transaction.billable} onChange={handleBillableChange(transaction.id)} data-testid="billable-checkbox" />

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