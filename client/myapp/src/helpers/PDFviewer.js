import '../App.css';
import React, { useEffect, useState } from 'react';
import { PDFObject } from 'react-pdfobject';
import samplePDF from './sample.pdf';

function AllPagesPDFViewer(props) {
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	useEffect(() => {}, []);
	const { pdf } = props;

	return (
		<Document
			file={pdf}
			options={{ workerSrc: '/pdf.worker.js' }}
			onLoadSuccess={onDocumentLoadSuccess}
		>
			{Array.from(new Array(numPages), (el, index) => (
				<Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1} />
			))}
		</Document>
	);
}

export default function PDFviewer(props) {
	return (
		<div className="App">
			<div className="all-page-container">
				<AllPagesPDFViewer pdf={props.pdfBlob} />
			</div>
		</div>
	);
}
