/*
action - a json with :
-type (mandatory) - type of the action
-payload (optional) - the data send with the action

*/

const landingPageReducer = (
	state = {
		jobData: {},
		candidateData: {
			fname: '',
			lname: '',
			phone: '',
			email: '',
			offers: false,
			certificates: [],
			experienceYears: '',
			pastRoles: [],
			pastFieldOfActivity: [],
			wantedJobs: [],
			salaryExpectations: '',
			requiredJobAreas: [],
			requiredJobScale: [],
			freeText: '',
			cv: '',
			fromWhere: '',
			age: '1900-01-01',
			driveId: '',
			cvContent: '',
		},
	},
	action
) => {
	switch (action.type) {
		case 'SET':
			return { ...state, jobData: { ...action.payload.jobData } };
		case 'SETCANDIDATE':
			return {
				...state,
				candidateData: { ...state.candidateData, ...action.payload },
			};
		default:
			return state;
	}
};

export default landingPageReducer;
