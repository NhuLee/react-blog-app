import React, { useState } from "react";
import { Dialog, Button, TextField, Select } from "@mui/material";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { FILE_SIZE } from "../../utilities/Constants";
import callApi from "../../utilities/CallApi";
import { format } from "date-fns";
import PreviewImage from "../Images/PreviewImage";

const validationSchema = Yup.object({
    title: Yup.string("Title").min(2, "Too Short!").max(100, "Too Long!"),
    date: Yup.date().nullable(true),
    author: Yup.object({
        name: Yup.string("Author name")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
    }),
});

const FormUpdatePostItem = ({ open, onClose, post, onUpdate }) => {
    const [imgBase64, setImgBase64] = useState(null);
    const [isDisableRevert, setDisableRevert] = useState(true);
    const [isDisableSubmit, setIsDisableSubmit] = useState(false);
    const [isError, setIsError] = useState(false);
    const id = post?.id;

    const formik = useFormik({
        initialValues: {
            title: post?.title,
            date: post?.date,
            thumbnail: {
                url: post?.thumbnail.url,
                alt: post?.thumbnail.alt,
                file: null,
            },
            author: {
                name: post?.author.name,
                image: post?.author.image,
            },
            content: post?.content,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleUpdateItem(values);
            onClose(open);
        },
    });

    const handleClose = () => {
        onClose(open);
    };

    const handleUpdateItem = (val) => {
        const date = format(Date.parse(val.date), "MM/dd/yyyy");
        val.thumbnail.file = imgBase64;
        callApi(`${id}`, "PUT", JSON.stringify({ ...val, date }), {
            Accept: "application/json",
            "Content-Type": "application/json",
        })
            .then((res) => {
                if (!onUpdate) return;
                onUpdate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setDisableRevert(true);
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("thumbnail.file", file);
        if (file?.size > FILE_SIZE) {
            setIsError(true);
            setDisableRevert(true);
            setIsDisableSubmit(true);
        } else {
            setIsError(false);
            setIsDisableSubmit(false);
            setDisableRevert(false);
            handleConvertFile(file);
        }
    };

    const handleRevertUpload = () => {
        setImgBase64(null);
        setDisableRevert(true);
    };

    const handleConvertFile = async (file) => {
        const reader = new FileReader();
        if (!file) return;
        await reader.readAsDataURL(file);
        reader.onload = () => {
            setImgBase64(reader.result);
        };
    };

    const renderErrorMessage = (message) => (
        <div className="error">{message}</div>
    );

    const renderPreviewImage = () => (
        <PreviewImage
            urlImage={imgBase64}
            currentImg={
                post?.thumbnail?.file
                    ? post?.thumbnail?.file
                    : post?.thumbnail?.url
            }
        />
    );

    return (
        <Dialog onClose={handleClose} open={open}>
            <form onSubmit={formik.handleSubmit} className="form-update-item">
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disableFuture
                        label="Date"
                        onChange={(value) =>
                            formik.setFieldValue("date", value)
                        }
                        value={formik.values.date}
                        placeHolder
                        renderInput={(params) => (
                            <TextField
                                label="Date"
                                margin="normal"
                                name="Date"
                                variant="standard"
                                fullWidth
                                {...params}
                            />
                        )}
                    />
                </LocalizationProvider>
                <TextField
                    fullWidth
                    id="authorName"
                    name="author.name"
                    label="Author name"
                    value={formik.values.author.name}
                    onChange={formik.handleChange}
                    error={
                        formik.touched?.author?.name &&
                        Boolean(formik.errors?.author?.name)
                    }
                    helperText={
                        formik.touched?.author?.name &&
                        formik.errors?.author?.name
                    }
                />
                <TextField
                    id="post-content"
                    className="post-content"
                    name="content"
                    label="Content"
                    multiline
                    rows={10}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                <div className="form-group form-group-thumb">
                    <label>Thumbnail upload</label>
                    <Button variant="contained" component="label">
                        Upload
                        <input
                            id="thumbnailFile"
                            name="thumbnail.file"
                            type="file"
                            onChange={handleUpload}
                            accept="image/*"
                            hidden
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRevertUpload}
                        disabled={isDisableRevert}
                    >
                        Revert
                    </Button>
                    {isError
                        ? renderErrorMessage("File size too large")
                        : renderPreviewImage()}
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isDisableSubmit}
                >
                    Submit
                </Button>
            </form>
        </Dialog>
    );
};

export default FormUpdatePostItem;
