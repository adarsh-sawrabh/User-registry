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

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleEdit = (id: number) => {
    console.log(`Edit user with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log(`Delete user with id: ${id}`);
    // Implement delete functionality
    setData(data.filter((user) => user.id !== id));
  };

    return (
        <>
            <h3>Registered UserInfo Table</h3>
        </>
    )
}

export default RegUserTable;