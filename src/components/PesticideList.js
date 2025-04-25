
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import styled from "styled-components";
import "./PesticideList.css";

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
  height: 800px;
`;

const Button = styled.button`
  background: linear-gradient(145deg, #9FE7F5, #75B9E7);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 20px 0;

  &:hover {
    transform: scale(1.05);
  }
`;

const PesticideList = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfUrl = "/pesticide.pdf";

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
    }
  };

  return (
    <SecureContainer>
      <h1>Pesticide List</h1>
      <PDFContainer>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </PDFContainer>
      <Button onClick={handleDownload}>
        Download PDF
      </Button>
    </SecureContainer>
  );
};

export default PesticideList;
