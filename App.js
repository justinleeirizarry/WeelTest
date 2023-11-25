import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TransactionTable from "./components/TransactionTable";
import useDebounce from "./hooks/useDebounce";
import useDataLookup from "./hooks/useDataLookup";
import SearchBar from "./components/SearchBar";

const PageContainer = styled.div`
    max-width: 1200px;
    padding: 24px;
    margin: 0 auto;
    display: grid;
    place-items: center;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 7vw;
  font-weight: 800;
  text-align: center;
  color: #333;
  text-transform: uppercase;
  margin: 1rem;
`;

const App = ({ categories, transactions }) => {
    const { getMerchantName, getCategoryName } = useDataLookup();

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [transactionData, setTransactionData] = useState(transactions);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        const filteredTransactions = transactionData.filter((transaction) => {
            const fields = [
                getMerchantName(transaction.merchant),
                transaction.team_member,
                getCategoryName(transaction.category),
                transaction.budget,
                transaction.amount.toString(),
                transaction.gst.toString(),
            ];
            const searchWords = debouncedSearchTerm.toLowerCase().split(" ");
            return searchWords.every((word) =>
                fields.some((field) => field.toLowerCase().includes(word))
            );
        });
        setFilteredTransactions(filteredTransactions);
    }, [debouncedSearchTerm, transactionData, getCategoryName, getMerchantName]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBillableChange = (id) => (event) => {
        const updatedTransactions = transactionData.map((transaction) => {
            if (transaction.id === id) {
                return { ...transaction, billable: !transaction.billable };
            }
            return transaction;
        });
        setTransactionData(updatedTransactions);
    };

    const handleCategoryChange = (id) => (event) => {
        const updatedTransactions = transactionData.map((transaction) => {
            if (transaction.id === id) {
                return { ...transaction, category: event.target.value };
            }
            return transaction;
        });
        setTransactionData(updatedTransactions);
    };

    return (
        <PageContainer>
            <Title>Transactions</Title>
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            <TransactionTable
                transactions={filteredTransactions}
                onCategoryChange={handleCategoryChange}
                getMerchantName={getMerchantName}
                categories={categories}
                handleBillableChange={handleBillableChange}
            />
        </PageContainer>
    );
};

export default App;
