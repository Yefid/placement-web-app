import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Ag-grid-custom.css';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

export default function JobsComp() {
	// set to default data
	const [rowData, setRowData] = useState();

	const [colDefs, setColDefs] = useState([
		{ field: 'make', headerName: 'Id' },
		{ field: 'model', headerName: 'חברה', editable: true },
		{ field: 'price', headerName: 'תפקיד', editable: true },
		{ field: 'price', headerName: 'תיאור משרה', editable: true },
		{ field: 'price', headerName: 'נרשמים', editable: true },
	]);

	// load the data after the grid has been setup
	//[] means on first render so no need to memo the results at this point
	React.useEffect(() => {
		fetch('https://www.ag-grid.com/example-assets/row-data.json')
			.then((result) => result.json())
			.then((rowData) => setRowData(rowData));
	}, []);

	return (
		<div>
			<Typography variant="h3" gutterBottom>
				<Box fontWeight="fontWeightMedium" m={1}>
					טבלת משרות
				</Box>
			</Typography>
			<div className="ag-theme-balham" style={{ height: 400 }}>
				<AgGridReact
					defaultColDef={{
						sortable: true,
						filter: true,
						resizable: true,
					}}
					pagination={true}
					rowData={rowData}
					columnDefs={colDefs}
					enableRtl={true}
				></AgGridReact>
			</div>
		</div>
	);
}
