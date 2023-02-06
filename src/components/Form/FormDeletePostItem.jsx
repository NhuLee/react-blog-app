import React, { useState } from "react";
import { DialogTitle, Dialog, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import callApi from "../../utilities/CallApi";

const FormDeletePostItem = ({ post, open, onClose, onDelete }) => {
    const validateSChema = Yup.object().shape({
        title: Yup.string().oneOf([post?.title]).required("Required"),
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const id = post?.id;
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: validateSChema,
        onSubmit: async () => {
            await handleDeletePostItem();
            setIsDisabled(true);
            onClose(open);
        },
    });
    const handleDeletePostItem = () => {
        callApi(`${id}`, "DELETE", null, null)
            .then((res) => {
                if (!onDelete) return;
                onDelete(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = () => {
        onClose(open);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle style={{ padding: "40px 40px 0 40px" }}>
                Fill out the title of post to confirm delete
            </DialogTitle>
            <form onSubmit={formik.handleSubmit} style={{ padding: "40px" }}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label=""
                    placeholder={post?.title}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isDisabled}
                    style={{
                        backgroundColor: "rgb(211, 35, 47)",
                        marginTop: "20px",
                    }}
                >
                    DELETE
                </Button>
            </form>
        </Dialog>
    );
};

export default FormDeletePostItem;
