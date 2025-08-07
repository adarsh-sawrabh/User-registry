import React, { useState } from "react";

import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Grid,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

interface FormValues {
    name: string;
    email: string;
    phoneNumber: string;
    event: string;
    organization?: string;
    address?: string;
    areasOfInterest?: string;
    isConsent: boolean;
}

const UserRegForm: React.FC = () => {

    const regUrl = 'http://ncta-transponder-service-ncta-demo.apps.demo.krisconnected.com/api/register/v2';

    const initialFormValues = {
        name: '',
        email: '',
        phoneNumber: '',
        event: 'MESC',
        organization: '',
        address: '',
        areasOfInterest: '',
        isConsent: false,
    };

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const validateFields = () => {
        const errors: Partial<FormValues> = {};
        if (!formValues.name) errors.name = 'Name is required';
        if (!formValues.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Email format is invalid';
        }
        if (!formValues.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formValues.phoneNumber)) {
            errors.phoneNumber = 'Phone Number must be 10 digits';
        }
        return errors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            isConsent: e.target.checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateFields();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await fetch(regUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Cache-Control': 'no-cache', // Prevent caching
                        //'Pragma': 'no-cache',
                    },
                    body: JSON.stringify(formValues),
                });
                if (response.ok) {
                    setIsSuccessful(true);
                    setFormValues(initialFormValues);
                    localStorage.removeItem('formValues');
                    setTimeout(() => {
                        setIsSuccessful(false);
                    }, 2000);
                }
            } catch (error) {
                console.error('Failed to submit form:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Grid container justifyContent="center">
            <Box
                sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    borderTop: "10px solid rgb(0, 51, 141)",
                    borderRight: "3px solid #cccccc3b",
                    borderBottom: "3px solid #cccccc3b",
                    borderLeft: "3px solid #cccccc3b",
                    backgroundColor: "rgb(246, 246, 246)",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0px",
                    mb: 10,
                    mt: 10,
                    p: 2,
                    transition: "0.3 0.3s ease-in-out",
                    maxWidth: { xs: '95%', sm: '80%', md: '60%', lg: '50%' }
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ color: "#0087ff", fontSize: '30px', }}>
                    User Registration Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.name)}
                        helperText={formErrors.name}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        value={formValues.phoneNumber}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.phoneNumber)}
                        helperText={formErrors.phoneNumber}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        name="event"
                        label="Event"
                        value={formValues.event}
                        margin="normal"
                        disabled
                    />
                    <TextField
                        fullWidth
                        name="organization"
                        label="Organization"
                        value={formValues.organization}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={formValues.address}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        name="areasOfInterest"
                        label="Areas of Interest"
                        value={formValues.areasOfInterest}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formValues.isConsent}
                                onChange={handleConsentChange}
                                name="isConsent"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant='h5' sx={{ fontSize: '0.875rem' }}>
                                I agree to our Terms Of Service & Privacy Policy
                            </Typography>
                        }
                    />
                    <Box sx={{ textAlign: 'center', mt: 2, p: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            sx={{ minWidth: 120, height: 40 }}
                        >
                            {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                    </Box>
                </form>
                {isSuccessful && (
                    <Box sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#323232c4',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: "8px",
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        zIndex: '1000'
                    }}>
                        User Registration successful
                    </Box>
                )
                }
            </Box >
        </Grid>
    )
}

export default UserRegForm;