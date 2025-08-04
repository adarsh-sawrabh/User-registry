import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Checkbox,
    IconButton,
    Paper,
    Tooltip,
    Grid,
    Box,
    Card,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

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

const RegUserTable: React.FC = () => {

    const userInfoUrl = 'http://ncta-transponder-listener-service-ncta-demo.apps.demo.krisconnected.com/api/admin/getuserdetails';

    const [data, setData] = useState<UserInfo[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(userInfoUrl);
            const result: UserInfo[] = await response.json();
            setData(result);
        };
        fetchUserData();
    }, []);

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
        <Box sx={{ padding: 3 }}>
            <Typography variant="h3" sx={{ 
                mb: 3, 
                backgroundColor:'rgba(9, 89, 242, 0.78)', 
                fontSize: '30px',
                color: '#FFFFFF',
                padding: 1
                }}>
                User Details
            </Typography>
            <TableContainer component={Card} sx={{ padding: 5 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                    checked={data.length > 0 && selected.length === data.length}
                                    onChange={handleSelectAllClick}
                                    aria-label="select all users"
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Organization</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Areas of Interest</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((user) => {
                            const isItemSelected = isSelected(user.id);
                            return (
                                <TableRow
                                    hover
                                    key={user.id}
                                    selected={isItemSelected}
                                    onClick={() => handleClick(user.id)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            aria-labelledby={`enhanced-table-checkbox-${user.id}`}
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.event}</TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.areasOfInterest}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleEdit(user.id)} aria-label="edit">
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(user.id)} aria-label="delete">
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default RegUserTable;