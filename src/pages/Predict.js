import React, { useState } from 'react';

const Predict = () => {
    const [formData, setFormData] = useState({
        age: '',
        familyHistory: false,
        mammogramResults: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with backend API
        console.log(formData);
    };

    return ( <
        div >
        <
        h2 > Predict Your Breast Cancer Risk < /h2> <
        form onSubmit = { handleSubmit } >
        <
        label >
        Age:
        <
        input type = "number"
        name = "age"
        value = { formData.age }
        onChange = { handleChange }
        /> < /
        label > <
        label >
        Family History:
        <
        input type = "checkbox"
        name = "familyHistory"
        checked = { formData.familyHistory }
        onChange = { handleChange }
        /> < /
        label > <
        label >
        Mammogram Results:
        <
        input type = "file"
        name = "mammogramResults"
        onChange = { handleChange }
        /> < /
        label > <
        button type = "submit" > Submit < /button> < /
        form > <
        /div>
    );
};

export default Predict;