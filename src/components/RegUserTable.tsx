import React from 'react';
import Admin from '../Admin';

interface RegUserTableProps {
    currentUser: Admin | null;
}

const RegUserTable: React.FC<RegUserTableProps> = ({ currentUser }) =>{
    return(
        <>
        <h3>RegUserTable</h3>
        </>
    )
}

export default RegUserTable;