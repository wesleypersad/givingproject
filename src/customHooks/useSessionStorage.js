const useSessionStorage = (key) => {
    // set the data at that key
    const setRecords = (data) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
         } catch (error) {
            console.log(error.message);
        }
    };

    // get the data stored at that key
    const getRecords = () => { 
        try {
            const data = sessionStorage.getItem(key);
            return data ? JSON.parse(data) : undefined;
        } catch (error) {
            console.log(error.message);
        }
    };

    // remove the stored data
    const removeRecords = () => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.log(error.message);
        }
    };

    //delete record with id
    const deleteRecord = (id) => {        
        try {
            let recordData = JSON.parse(sessionStorage.getItem(key));
            recordData = recordData.filter(r => r._id !== id);
            sessionStorage.setItem(key, JSON.stringify(recordData));
            console.log('Deleting record with id: ', id);
        } catch (error) {
            console.log(error.message);
        }
    };

    return { setRecords, getRecords, removeRecords, deleteRecord }
}

export default useSessionStorage;