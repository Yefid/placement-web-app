import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
	container2: {
		width: '99%',
		//height: '300px',
	},
}));

export default function Editor(props) {
	const classes = useStyles();

	return (
		<div className={classes.container2}>
			<CKEditor
				editor={ClassicEditor}
				data={props.editorData}
				config={{
					language: 'he',
				}}
				onReady={(editor) => {}}
				onChange={(event, editor) => {
					const data = editor.getData();
					{
						props.setEditorData(data);
						props.setContentAndHtml(data);
					}
				}}
				onBlur={(event, editor) => {}}
				onFocus={(event, editor) => {}}
			/>
		</div>
	);
}
