const BASE_URL = 'http://localhost:3000';

export const GetAllEmployees = async () => {
    const url = `/api/employees`; // Simple URL without search, page, or limit parameters
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
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteEmployeeById = async (id) => {
    const url =
        `/api/employees/${id}`;
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
    const url = `/api/employees`;
    console.log('url ', url);
    // Create a FormData object
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }

    console.log(formData);
    // FormData handles the headers and content type
    const options = {
        method: 'POST',
        body: formData,
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
    const url = `/api/employees/${id}`;
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
