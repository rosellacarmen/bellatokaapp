
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";
import "./PesticideList.css";

// Set worker source securely from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SecureContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PDFContainer = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const Button = styled.button`
  background: linear-gradient(145deg, #9FE7F5, #75B9E7);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: bold;
  color: #666;
`;

const PesticideList = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const pdfUrl = "/src/db/pesticide.pdf";

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load the pesticide list. Please try again later.");
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "pesticide-list.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download the document. Please try again later.");
    }
  };

  return (
    <SecureContainer>
      <h1>Pesticide List</h1>
      <PDFContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<LoadingSpinner>Loading PDF...</LoadingSpinner>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={1.2}
          />
        </Document>
        
        <ControlsContainer>
          <Button 
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <span>Page {pageNumber} of {numPages}</span>
          <Button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
          <Button onClick={handleDownload}>
            Download PDF
          </Button>
        </ControlsContainer>
      </PDFContainer>
    </SecureContainer>
  );
};

export default PesticideList;
