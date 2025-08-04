import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRegForm from './components/UserRegForm';
import Admin from './Admin';
import RegUserTable from './components/RegUserTable';

interface RouterProps {
    currentUser: Admin | null
}

const Router: React.FC<RouterProps> = ({ currentUser }) => {
    return (
        <Routes>
            {currentUser ? (
                <>
                    <Route path="/" element={<RegUserTable currentUser={currentUser} />} />
                </>
            ) : (
                <Route path="*" element={<UserRegForm />} />
            )}
        </Routes>
    );
}

export default Router;