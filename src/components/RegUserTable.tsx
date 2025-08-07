import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Checkbox,
    IconButton,
    Paper,
    Tooltip,
    Box,
    Grid,
} from '@mui/material';
import { Sms, ArrowForward } from '@mui/icons-material';

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
    isConsent: boolean;
}

const RegUserTable: React.FC = () => {

    const userInfoUrl = 'http://ncta-transponder-listener-service-ncta-demo.apps.demo.krisconnected.com/api/admin/getuserdetails';

    const [data, setData] = useState<UserInfo[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const response = await fetch(userInfoUrl);
        const result: UserInfo[] = await response.json();
        setData(result);
    };

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

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'NA';
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleSms = async () => {
        const selectedIds = selected.map((id) => id);
        // sending sms
        try {
            const response = await fetch('https://apis-demo.apps.demo.krisconnected.com:443/ncta/transponderlistner/sms/sendBatch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedIds }),
            });
            if (response.ok) {
                console.log('SMS sent successfully');
                fetchUserData(); // Refresh data after SMS is sent
            }
        } catch (error) {
            console.error('Failed to send SMS:', error);
        }
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                padding: { xs: 2, sm: 3, md: 4 },
                marginTop: 2,
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{
                        marginRight: 2,
                        color: 'blue',
                        textTransform: 'initial'
                    }}
                        onClick={() => handleSms()}
                        disabled={selected.length <= 1}>
                        Send SMS
                    </Button>
                    <Tooltip title="Next">
                        <IconButton onClick={() => fetchUserData()} aria-label="next" color="primary">
                            <ArrowForward />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Grid container justifyContent="center" spacing={2} sx={{
                    backgroundColor: '#e7eff3ff',
                    borderRadius: 1,
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
                                        <Tooltip title="Select all">
                                            <Checkbox
                                                indeterminate={selected.length > 0 && selected.length < data.length}
                                                checked={data.length > 0 && selected.length === data.length}
                                                onChange={handleSelectAllClick}
                                                aria-label="select all users"
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ width: '12%', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ width: '18%', fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>Phone Number</TableCell>
                                    <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Event</TableCell>
                                    <TableCell sx={{ width: '13%', fontWeight: 'bold' }}>Organization</TableCell>
                                    <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>SMS Sent</TableCell>
                                    <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>SMS Sent At</TableCell>
                                    <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Consent</TableCell>
                                    <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((user) => {
                                    const isItemSelected = isSelected(user.id);
                                    const isDisabled = user.smsSent || !user.isConsent;
                                    return (
                                        <TableRow
                                            hover
                                            key={user.id}
                                            selected={isItemSelected}
                                            onClick={() => !isDisabled && handleClick(user.id)}
                                            sx={{ opacity: isDisabled ? 0.5 : 1, pointerEvents: isDisabled ? 'none' : 'auto' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    disabled={isDisabled}
                                                    aria-labelledby={`enhanced-table-checkbox-${user.id}`}
                                                />
                                            </TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell>{user.event}</TableCell>
                                            <TableCell>{user.organization ? user.organization : 'NA'}</TableCell>
                                            <TableCell>{user.smsSent ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{formatDate(user.smsSentAt)}</TableCell>
                                            <TableCell>{user.isConsent ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Tooltip title="Send SMS">
                                                        <IconButton onClick={() => handleSms()} aria-label="send sms" color="primary" disabled={isDisabled}>
                                                            <Sms />
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
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{
                        marginRight: 2,
                        color: 'blue',
                        textTransform: 'initial'
                    }}
                        onClick={() => handleSms()}
                        disabled={selected.length <= 1}>
                        Send SMS
                    </Button>
                    <Tooltip title="Next">
                        <IconButton onClick={() => fetchUserData()} aria-label="next" color="primary">
                            <ArrowForward />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}

export default RegUserTable;