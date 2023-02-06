import React, { useEffect } from "react";
import { DialogTitle, Dialog, Button, TextField, Select } from "@mui/material";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DayJsInstance from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import * as Yup from "yup";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../utilities/Constants";
import callApi from "../../utilities/CallApi";
// import { format } from "date-fns";

DayJsInstance.extend(advancedFormat);

const validationSchema = Yup.object({
    title: Yup.string("Title").min(2, "Too Short!").max(100, "Too Long!"),
    date: Yup.date(),
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
        callApi(`${id}`, "PUT", JSON.stringify(val), {
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

    return (
        <Dialog onClose={handleClose} open={open}>
            <form
                onSubmit={formik.handleSubmit}
                style={{ padding: "40px" }}
                className="form-update-item"
            >
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
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    dateLibInstance={DayJsInstance}
                >
                    <DatePicker
                        label="Date"
                        onChange={(value) =>
                            formik.setFieldValue("date", value)
                        }
                        value={
                            typeof formik.values.date === "string"
                                ? null
                                : formik.values.date
                        }
                        inputFormat="MMM Do, YYYY"
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

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </form>
        </Dialog>
    );
};

export default FormUpdatePostItem;
