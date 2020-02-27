import React from "react";
import Users from "./Users";
import { useSnackbar } from "notistack";

const UsersView = () => {
    const { enqueueSnackbar } = useSnackbar();
    return <Users enqueSnackbar={enqueueSnackbar} />;
};
export default UsersView;
