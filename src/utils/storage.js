const STORAGE_KEY = 'MYNOTES_APP';

const isStorageExist = () => {
    if (typeof Storage === "undefined") {
        alert('Browser not supported!');
        return false;
    }
    return true;
}

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(serializedData);
}

export {isStorageExist, loadDataFromStorage}