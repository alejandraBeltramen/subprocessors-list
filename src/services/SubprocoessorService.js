const SUBPROCESSORS_KEY_LS = 'subprocessors';
const MOCKED_DATA_SAMPLE = [
    { id: 12345, name: 'Fastly', purpose: 'CDN', location: 'USA' },
    { id: 12346, name: 'Heroku', purpose: 'Hosting', location: 'USA' },
    { id: 12347, name: 'SendGrid', purpose: 'Email Deliverability', location: 'USA' },
];

export const getSubprocessors = () => {
    const subprocessorsJSON = localStorage.getItem(SUBPROCESSORS_KEY_LS);
    const subprocessorsLS = subprocessorsJSON ? JSON.parse(subprocessorsJSON) : null;
    
    if (!subprocessorsLS || subprocessorsLS.length === 0) {
        setSubprocessors(MOCKED_DATA_SAMPLE);
        return MOCKED_DATA_SAMPLE;
    }

    return subprocessorsLS;
};
export const setSubprocessors = (subprocessorsList) => localStorage.setItem(SUBPROCESSORS_KEY_LS, JSON.stringify(subprocessorsList));
export const removeSubprocessor = (subprocessor) => {
    const newSubprocessorsList = getSubprocessors().filter((subprocessorItem) => subprocessorItem.id !== subprocessor.id);
    setSubprocessors(newSubprocessorsList);
    return newSubprocessorsList;
};
export const editSubprocessor = (subprocessor) => {
    const subprocessorsList = getSubprocessors();
    const updatedItemIndex = subprocessorsList.findIndex((item) => item.id === subprocessor.id);
    subprocessorsList[updatedItemIndex] = { ...subprocessor };
    setSubprocessors(subprocessorsList);
    return subprocessorsList;
};
export const addSubprocessor = (subprocessor) => {
    const subprocessorsList = getSubprocessors();
    subprocessorsList.push(subprocessor);
    setSubprocessors(subprocessorsList);
    return subprocessorsList;
};
