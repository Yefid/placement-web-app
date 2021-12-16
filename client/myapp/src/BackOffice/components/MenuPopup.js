import { useState, useRef } from 'react';
import React from 'react';
import Tippy from '@tippyjs/react';
import { ReactComponent as ThreeDots } from '../../img/threedots2.svg';
import { useTheme } from '@material-ui/core/styles';
import './style.css';

const PopupCellRenderer = (props) => {
	const tippyRef = useRef();
	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	const theme = useTheme();

	const ApplyCandidate = (params) => {
		console.log(params);
		console.log(params.insight);
		console.log(params.name);
		console.log(params.email);

		sessionStorage['action'] = 'apply candidate';
		sessionStorage['candidateName'] = params.name;
		sessionStorage['candidateEmail'] = params.email;
		sessionStorage['candidateInsight'] = params.insight;
		sessionStorage['candidatedriveId'] = params.driveId;

		props.setIsMailerVisible(true);
		hide();
	};

	const offerCandidateAnotherJob = (params) => {
		console.log(params);
		console.log(params.insight);
		console.log(params.name);
		console.log(params.email);

		sessionStorage['action'] = 'offer candidate another job';
		sessionStorage['candidateName'] = params.name;
		sessionStorage['candidateEmail'] = params.email;
		props.setIsMailerVisible(true);
		hide();
	};

	const dropDownContent = (
		<div className="menu-container">
			<div className="menu-item-title">עדכון סטטוס</div>
			<div onClick={() => props.addStatus('לדבר')} className="menu-item">
				לדבר
			</div>
			<div onClick={() => props.addStatus('דיברנו')} className="menu-item">
				דיברנו
			</div>
			<div onClick={() => props.addStatus('הוגש')} className="menu-item">
				הוגש
			</div>
			<div
				onClick={() => props.addStatus('להציע משרה אחרת')}
				className="menu-item"
			>
				להציע משרה אחרת
			</div>
			<div className="menu-item-title">פעולה</div>
			<div onClick={() => ApplyCandidate(props.params)} className="menu-item">
				הגשה
			</div>
			<div
				onClick={() => offerCandidateAnotherJob(props.params)}
				className="menu-item"
			>
				הצע משרה
			</div>
			<div
				onClick={() => props.handleDelete()}
				className="menu-item menu-item-delete"
			>
				מחק מועמד
			</div>
		</div>
	);

	return (
		<Tippy
			ref={tippyRef}
			content={dropDownContent}
			visible={visible}
			onClickOutside={hide}
			allowHTML={true}
			arrow={false}
			appendTo={document.body}
			interactive={true}
			placement="left"
		>
			<ThreeDots
				fill={theme.palette.primary.main}
				stroke={theme.palette.primary.main}
				onClick={visible ? hide : show}
			/>
		</Tippy>
	);
};

export default PopupCellRenderer;
