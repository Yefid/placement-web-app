import { createContext, useState } from 'react';

export const CandidateTableContext = createContext();

export const CandidateTableContextProvider = (props) => {
	const [candidateTable, setCandidateTable] = useState({});

	return (
		<CandidateTableContext.Provider value={[candidateTable, setCandidateTable]}>
			{props.children}
		</CandidateTableContext.Provider>
	);
};
