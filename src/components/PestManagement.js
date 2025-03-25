import React from "react";

const PestManagement = ({ strain }) => {
    return (
        <div>
            <h1>Pest Management</h1>
            {Array.isArray(strain.pestManagement) ? (
                <table>
                    <tbody>
                        {strain.pestManagement.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pest management data available.</p>
            )}
        </div>
    );
};

export default PestManagement;
