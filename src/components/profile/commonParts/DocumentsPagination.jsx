const DocumentsPagination = (
  {
    pages,
    currentPage,
    setCurrentPage
  }
) => {
  return (
    <>
      {pages > 1 &&
        <>
          <div className={"fs-6 mx-auto border rounded-3 px-3 py-1 mb-4"}>
            Page {currentPage + 1}
          </div>
          <nav className={"mx-auto"}>
            <ul className={"pagination"}>
              {currentPage !== 0 &&
                <li className="page-item">
                  <button className="btn btn-outline-primary me-3"
                          aria-label="Previous"
                          onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                </li>
              }
              {Array.from(
                new Array(pages),
                (el, index) =>
                  (<li key={'doc_' + index} className={"page-item"}>
                    <button type={"button"}
                            onClick={() => setCurrentPage(index)}
                            className={`btn ${(currentPage === index) ? 'btn-primary' : 'btn-outline-primary'} rounded-3 me-2`}
                            disabled={currentPage === index}
                    >
                      {index + 1}
                    </button>
                  </li>)
              )}
              {currentPage !== (pages - 1) &&
                <li className="page-item">
                  <button className="btn btn-outline-primary ms-2"
                          aria-label="Previous"
                          onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </li>
              }
            </ul>
          </nav>
        </>
      }
    </>
  )
}

export default DocumentsPagination