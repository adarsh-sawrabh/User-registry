import React, { useState, useEffect } from 'react';
import Admin from '../Admin';

interface RegUserTableProps {
    currentUser: Admin | null;
}

interface UserInfo {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    event: string;
    organization: string;
    address: string;
    areasOfInterest: string;
    smsSent: boolean;
    emailSent: boolean;
    createdAt: string;
    smsSentAt: string | null;
    emailSentAt: string | null;
}

const RegUserTable: React.FC<RegUserTableProps> = ({ currentUser }) => {

    const userInfoUrl = 'http://ncta-transponder-listener-service-ncta-demo.apps.demo.krisconnected.com/api/admin/getuserdetails';

    const [data, setData] = useState<UserInfo[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(()=>{
        const fetchUserData = async () => {
            const response = await fetch(userInfoUrl);
            const result: UserInfo[] = await response.json();
            setData(result);
        };
        fetchUserData();
    },[]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

    return (
        <>
            <h3>RegUserTable</h3>
        </>
    )
}

export default RegUserTable;