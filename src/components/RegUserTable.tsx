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
    Box,
    Grid,
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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                padding: { xs: 2, sm: 3, md: 4 }, 
                marginTop: 2,
                }}>
                <Grid container justifyContent="center" spacing={2} sx={{backgroundColor: '#e7eff3ff', borderRadius: 1}}>
                    <Box sx={{ backgroundColor: '#0073e6', padding: 1, borderRadius: 1, width: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', fontSize:'20px', p:1}}>
                            User Details
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: '96%',
                        borderRight: "3px solid #cccccc3b",
                        borderBottom: "3px solid #cccccc3b",
                        borderLeft: "3px solid #cccccc3b",
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0px",
                    }}>
                        <TableContainer component={Paper}>
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
                                        <TableCell sx={{ width: '12%' }}>Name</TableCell>
                                        <TableCell sx={{ width: '18%' }}>Email</TableCell>
                                        <TableCell sx={{ width: '15%' }}>Phone Number</TableCell>
                                        <TableCell sx={{ width: '10%' }}>Event</TableCell>
                                        <TableCell sx={{ width: '13%' }}>Organization</TableCell>
                                        <TableCell sx={{ width: '15%' }}>Address</TableCell>
                                        <TableCell sx={{ width: '10%' }}>Areas of Interest</TableCell>
                                        <TableCell sx={{ width: '15%' }}>Actions</TableCell>
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
                                                <TableCell>{user.organization ? user.organization : 'NA'}</TableCell>
                                                <TableCell>{user.address ? user.address : 'NA'}</TableCell>
                                                <TableCell>{user.areasOfInterest ? user.areasOfInterest : 'NA'}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                        <Tooltip title="Edit">
                                                            <IconButton onClick={() => handleEdit(user.id)} aria-label="edit" color="primary">
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleDelete(user.id)} aria-label="delete" color="secondary">
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default RegUserTable;