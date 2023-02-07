import React, { useEffect } from "react";
import { DialogTitle, Dialog, Button, TextField, Select } from "@mui/material";
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
    authorName: Yup.string("Author"),
});

const FormUpdatePostItem = ({ open, onClose, post, onUpdate }) => {
    const handleClose = () => {
        onClose(open);
    };
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
    const handleUpdateItem = (val) => {
        const date = format(Date.parse(val.date), "MM/dd/yyyy");
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
    };

    const handleUpload = (event) => {
        formik.setFieldValue("thumbnail.file", event.target.files[0]);
    };

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
                    id="author"
                    name="author.name"
                    label="Author name"
                    value={formik.values.author.name}
                    onChange={formik.handleChange}
                />
                <TextField
                    id="post-content"
                    className="post-content"
                    name="content"
                    label="Content"
                    multiline
                    maxRows={100}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                {/* {console.log("file", typeof formik.values.file)} */}
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
                    {formik.values.thumbnail.file && (
                        <PreviewImage file={formik.values.thumbnail.file} />
                    )}
                </div>
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </Dialog>
    );
};

export default FormUpdatePostItem;
