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

    // remove all the stored data
    const removeRecords = () => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.log(error.message);
        }
    };

    //delete existing record with id
    const deleteRecord = (id) => {        
        try {
            let recordData = JSON.parse(sessionStorage.getItem(key));
            if (recordData) {
                recordData = recordData.filter(r => r._id !== id);
                sessionStorage.setItem(key, JSON.stringify(recordData));
                console.log('Deleting record with id: ', id);
            } else {
                console.log('No record to delete');
                return;
            }
            return { recordData };
        } catch (error) {
            console.log(error.message);
        }
    };

    //modify existing record with id
    const modifyRecord = (data) => {
        try {
            let recordData = JSON.parse(sessionStorage.getItem(key));
            if (recordData) {
                const index = recordData.findIndex(r => r._id === data._id);
                if (index !== -1) {
                    // update the record using spread operator with the new data
                    recordData[index] = {...recordData[index], ...data};
                    sessionStorage.setItem(key, JSON.stringify(recordData));
                    console.log('Modifying record with id: ', data._id);
                }
                return { recordData };
            } else {
                console.log('No record to modify');
                return;
            }
        }  catch (error) {
            console.log(error.message);
        }
    };

    // add a new record
    const addRecord = (data) => {
        try {
            let recordData = JSON.parse(sessionStorage.getItem(key));
            if (recordData) {
                recordData.push(data);
                sessionStorage.setItem(key, JSON.stringify(recordData));
                console.log('Adding record with id: ', data._id);
            } else {
                console.log('No record to add to');
            }
            return { recordData };
        } catch (error) {
            console.log(error.message);
        }
    };

    return { setRecords, getRecords, removeRecords, deleteRecord, modifyRecord, addRecord }
}

export default useSessionStorage;