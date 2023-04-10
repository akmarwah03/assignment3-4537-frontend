import React from "react";

const Pagination = ({ numPages, curPage, setCurPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i);
  }
  const nextPage = () => {
    if (curPage !== numPages) setCurPage(curPage + 1);
  };
  const prevPage = () => {
    if (curPage !== 1) setCurPage(curPage - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      {curPage !== 1 && (
        <button className="page" onClick={prevPage}>
          Previous
        </button>
      )}

      {pageNumbers.map((number) => {
        if (number < curPage + 4 && number > curPage - 4)
          return (
            <button
              key={number}
              onClick={() => setCurPage(number)}
              style={{
                fontSize: "16px",
                padding: "8px 16px",
                margin: "0 4px",
                border: "1px solid #ccc",
                backgroundColor: number == curPage ? "#007bff" : "#fff",
                color: number == curPage ? "#fff" : "#333",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            >
              {number}
            </button>
          );
      })}

      {curPage !== numPages && (
        <button className="page" onClick={nextPage}>
          next
        </button>
      )}
    </div>
  );
};

export default Pagination;
