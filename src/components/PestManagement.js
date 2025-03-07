import React from 'react';

const PestManagement = ({ strain }) => {
    return (
        <div>
            <h1>Pest Management</h1>
            <p>{strain.pestManagement}</p>
        </div>
    );
};

export default PestManagement;