import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function ConfirmDialog(props) {
    const { isOpen, setOpen, children, title } = props;

    const onConfirm = () => {
        props.onConfirm && props.onConfirm();
        setOpen(false);
    };

    const onDisagree = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onDisagree} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    isOpen: PropTypes.bool,
    setOpen: PropTypes.func,
    children: PropTypes.element,
    title: PropTypes.string,
    onConfirm: PropTypes.func
};

ConfirmDialog.defaultProps = {
    title: "",
    isOpen: false,
    setOpen: () => console.warn("setOpen is not given")
};
