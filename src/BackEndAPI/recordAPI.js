import { useState, useEffect } from "react";
import fetchClient from '../API/axiosClient/axiosClient'
import axios from "axios";
const BASE_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

/**
* Back-End API: create a Record for the client
* @param {json} recordInfo - the information of record being created
* @return {express.Response} res - response from the back-end server.
*/
function createRecord(recordInfo) {
  const endpoint =  "/record/createRecord";
  return fetchClient.post(endpoint, recordInfo).then((res) => res.data);
}

/**
* Back-End API: Show all the Record for the client
* @return {express.Response} res - response from the back-end server.
*/
function showAllRecords() {
    const endpoint =  "/record/showRecord";
    return fetchClient.get(endpoint).then((res) => res.data
    );
}

/**
* React_Use_Function: Show all the Record for the client
* @return {json} json file contains the record information
*/
export function useShowAllRecords() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      showAllRecords()
        .then((records) => {
            setRecords(records);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    }, []);
    return {
      loading,
      records,
      error,
    };
}

/**
* React_Use_Function: Create the Record for the client
*/
export function useCreateRecord() {
    const [contact_id, setContactId] = useState("");
    const [clientUsername, setClientUsername] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
  
    function onSubmit() {
      createRecord({
        contact_id: contact_id,
        clientUsername: clientUsername,
        dateTime: dateTime,
        location: location
      });
    }
    return;
}