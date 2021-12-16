import React from 'react';
import utils from '../../utils/downloadUtils/utils';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';

export default function CvView() {
	useEffect(async () => {
		const resp = await utils.displayFileFromGoogleDrive('myId');
		console.log(resp.data);
	}, []);

	return (
		<div>
			<Button
				onClick={() =>
					window.open(
						'https://drive.google.com/file/d/1UVQXPCKd7R12nTz0-M57-nsu-Jq8QWIY/view?usp=drivesdk',
						'_blank',
						'location=yes,height=570,width=520,scrollbars=yes,status=yes'
					)
				}
			>
				cv
			</Button>
			CvView
		</div>
	);
}
