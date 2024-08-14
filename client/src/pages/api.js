const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GetAllEmployees = async () => {
    console.log(BASE_URL)
    const url = `${BASE_URL}/api/employees`; // Simple URL without search, page, or limit parameters
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Add this line to include credentials in the request
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('Fetched employees:', data); // Log the fetched data
        return data;
    } catch (err) {
        console.error('Error fetching employees:', err);
        return err;
    }
};


export const GetEmployeeDetailsById = async (id) => {
    const url =
        `/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log('data in api.js', data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
       },
        credentials: 'include'
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}


export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    console.log('url ', url);

    console.log('empobj', empObj);
    // FormData handles the headers and content type
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empObj),
        credentials: 'include'
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
};

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(empObj),
        credentials: 'include', // Ensure cookies are sent
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error:', err);
        return err;
    }
};
