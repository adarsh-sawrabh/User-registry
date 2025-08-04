import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: (username: string, password: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        const success = onLogin(username, password);
        if (!success) {
            setError("Invalid username or password");
        } else {
            setUsername("");
            setPassword("");
            onClose();
        }
    };

    const handleClose = () => {
        setUsername("");
        setPassword("");
        setError("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: "center" }}>Admin Login</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Button color="inherit" sx={{ color: "red", textTransform: "none", marginBottom: "8px", width: "100%" }}>
                            {error}
                        </Button>
                    )}
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "flex-end", margin: "8px 16px" }}>
                    <Button type="submit" sx={{ color: "#0061ff", textTransform: "uppercase" }}>
                        Login
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default LoginModal;