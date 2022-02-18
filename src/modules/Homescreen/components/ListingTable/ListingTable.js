import React from "react";
import "./ListingTable.css";
const ListingTable = (props) => {
  const { expensesData } = props;
  return (
    <table className="tableWrapper">
      <thead>
        <tr>
          <th className=" rowBottomBorder">Description</th>
          <th className=" rowBottomBorder">Amount owed by</th>
        </tr>
      </thead>
      <tbody>
        {expensesData.map((item, intialIndex) => (
          <React.Fragment key={`rows_${intialIndex}`}>
            <tr>
              <td className=" rowBottomBorder">{item.description}</td>
              <td className="rowBottomBorder">
                {item.friendsAdded.map((expenseValues, index) => (
                  <table
                    className="innerTable"
                    key={`expenses_friends${index}`}
                  >
                    <tbody>
                      <tr>
                        <td className="tableColumnsName">
                          <strong>{expenseValues.name}:</strong>
                        </td>
                        <td className="tableColumnsValue">
                          <span>$</span>
                          {expenseValues.owedAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ListingTable;
