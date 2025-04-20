import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PesticideList.css";

// Set up PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PesticideList = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pesticide-list-container">
      <h1>Pesticide List</h1>
      <div className="pdf-container">
        <Document
          file="/pesticide.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF...</div>}
          error={<div>Error loading PDF. Please try again.</div>}
        >
          <Page 
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={1.2}
          />
        </Document>
        {numPages && (
          <div className="pdf-controls">
            <button 
              onClick={() => setPageNumber(pageNumber - 1)} 
              disabled={pageNumber <= 1}
              className="pdf-button"
            >
              Previous
            </button>
            <p>Page {pageNumber} of {numPages}</p>
            <button 
              onClick={() => setPageNumber(pageNumber + 1)} 
              disabled={pageNumber >= numPages}
              className="pdf-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PesticideList;