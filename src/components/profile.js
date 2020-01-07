import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

export default function Profile() {
    <div>
  <form>
    <TextField
                name="oldPassword"
                label="Old Password"
                value={input.oldPassword}
                onChange={handleChange}
                fullWidth
                type="password"
            />
    <TextField
                name="password"
                label="Password"
                type="password"
                value={input.password}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="confirmPassword"
                label="Confirm password"
                type="password"
                value={input.confirmPassword}
                onChange={handleChange}
                fullWidth
                error={errors.confirmPassword}
                helperText={
                    errors.confirmPassword ? "Passwords do not match" : ""
                }
            />
  </form>
  <TextField
                name="password"
                label="Password"
                type="password"
                value={input.password}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="confirmPassword"
                label="Confirm password"
                type="password"
                value={input.confirmPassword}
                onChange={handleChange}
                fullWidth
                error={errors.confirmPassword}
                helperText={
                    errors.confirmPassword ? "Passwords do not match" : ""
                }
            />;
}
