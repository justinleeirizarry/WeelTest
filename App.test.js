import React from "react";
import App from "./App";
import { render, within, screen, fireEvent } from "@testing-library/react";
import categoriesData from "./data/categories.json";
import merchantsData from "./data/merchants.json";
import transactionsData from "./data/transactions.json";

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData,
} = {}) =>
  render(
    <App
      categories={categories}
      merchants={merchants}
      transactions={transactions}
    />
  );

const getRows = (screen) =>
  within(screen.getByRole("table")).getAllByRole("row").slice(1);
const getStatusCell = (row) => within(row).getAllByRole("cell")[0];
const getStatusCellInRow = (screen, rowNumber) =>
  getStatusCell(getRows(screen)[rowNumber]);

it("should show title", () => {
  renderApp();

  screen.getByRole("heading", { name: "Transactions" });
});

describe("status", () => {
  it("should show transaction status when it is complete", () => {
    const completeTransaction = transactionsData.find(
      ({ status }) => status === "complete"
    );
    renderApp({ transactions: [completeTransaction] });

    const statusCell = getStatusCellInRow(screen, 0);
    within(statusCell).getByText("complete");
  });

  it("should show transaction status when it is incomplete", () => {
    const incompleteTransaction = transactionsData.find(
      ({ status }) => status === "incomplete"
    );
    renderApp({ transactions: [incompleteTransaction] });

    const statusCell = getStatusCellInRow(screen, 0);
    within(statusCell).getByText("incomplete");
  });
});

it("should display all columns in the transaction table", () => {
  renderApp();

  const tableHeaders = screen
    .getAllByRole("columnheader")
    .map((header) => header.textContent);

  expect(tableHeaders).toEqual([
    "Status",
    "Date",
    "Merchant Name",
    "Team Member",
    "Category",
    "Amount",
    "GST",
    "Budget",
    "Receipt",
    "Billable",
  ]);
});

it('should display all transactions that match the search term "Sales Team"', () => {
  renderApp();

  const searchTerm = "Sales Team";
  const searchInput = screen.getByRole("textbox");
  fireEvent.change(searchInput, { target: { value: searchTerm } });

  const rows = getRows(screen);
  rows.forEach((row) => {
    const cells = within(row).getAllByRole("cell");
    const budgetCell = cells[7];
    if (budgetCell.textContent.includes(searchTerm)) {
      expect(budgetCell.textContent).toContain(searchTerm);
    }
  });
});
it("should display correct category names in dropdown", () => {
  renderApp();

  const dropdowns = screen.getAllByRole("combobox");
  dropdowns.forEach((dropdown, dropdownIndex) => {
    const options = within(dropdown).getAllByRole("option");

    const expectedCategories = [
      "Software",
      "Entertainment",
      "Supermarket",
      "Business Services",
      "General Expenses",
    ];

    options.forEach((option, index) => {
      expect(option.textContent).toBe(expectedCategories[index]);
    });
  });
});
it("should make receipt checkbox read-only", () => {
  renderApp();

  const receiptCheckboxes = screen.getAllByTestId("receipt-checkbox");
  receiptCheckboxes.forEach((receiptCheckbox) => {
    expect(receiptCheckbox.disabled).toBe(true);
  });
});
it("should change billable checkbox value on click", () => {
  renderApp();

  const billableCheckboxes = screen.getAllByTestId("billable-checkbox");
  billableCheckboxes.forEach((billableCheckbox) => {
    fireEvent.change(billableCheckbox, { target: { checked: true } });
    expect(billableCheckbox.checked).toBe(true);
  });
});
