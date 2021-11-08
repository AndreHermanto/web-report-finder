export const fetchSamples = (query) =>  {
  return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_REPORT_FINDER_SERVICE_URL}/samples`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('idToken')}`
        },
        body: JSON.stringify({
          first_name: query.first_name,
          last_name: query.last_name,
          dob: query.dob,
          report: query.report
        })
      })
    .then(response => {
      if (!response.ok){
        reject(response);
      } 
      return response.json()
    })
    .then(data => resolve(data))
    .catch(e => {
      reject(e);
    });
  });
};

export const fetchSamplesByIds = (query) =>  {
  return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_REPORT_FINDER_SERVICE_URL}/samples/by-ids`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('idToken')}`
        },
        body: JSON.stringify({
          id: query.id,
          report: query.report
        })
      })
    .then(response => {
      if (!response.ok){
        reject(response);
      } 
      return response.json()
    })
    .then(data => resolve(data))
    .catch(e => {
      reject(e);
    });
  });
};

export const fetchFamilies = (query) =>  {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_REPORT_FINDER_SERVICE_URL}/samples/families`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`
      },
      body: JSON.stringify({
        familyId: query.familyId,
        report: query.report
      })
    })
  .then(response => {
    if (!response.ok){
      reject(response);
    } 
    return response.json()
  })
  .then(data => resolve(data))    
  .catch(e => {
    reject(e);
  });;
  });
};



