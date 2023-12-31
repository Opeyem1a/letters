"use client"

import React, { useCallback, useMemo } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import Select from "@/components/Select"
import { useAvailableCountries } from "@/hooks/useAvailableCountries"
import { useUserCountry } from "@/hooks/useUserCountry"
import { usePost } from "@/hooks/usePost"
import { useAvailableTags } from "@/hooks/useAvailableTags"

type NewLetterFormData = {
    title: string
    content: string
    countryId: string
    authorAge: number
    mediaConsent: boolean
    tagId: number
}

type NewLetterFormInitialData = Omit<
    NewLetterFormData,
    "authorAge" | "tagId"
> & {
    authorAge: number | ""
    tagId: number | ""
}

const NewLetterForm = () => {
    const availableCountries = useAvailableCountries()
    const availableTags = useAvailableTags()
    const { code: userCountryCode } = useUserCountry()
    const { asyncFunc: createNewLetter } = usePost({
        endpoint: "api/letters/",
    })

    const initialCountry = useMemo(() => {
        const _country = (availableCountries ?? []).find(
            country => country.code === userCountryCode
        )
        return _country?.id ? String(_country?.id) : ""
    }, [availableCountries, userCountryCode])

    const initialValues = useMemo<NewLetterFormInitialData>(
        () => ({
            title: "New Letter",
            content: "Type here",
            countryId: initialCountry,
            authorAge: "",
            mediaConsent: false,
            tagId: "",
        }),
        [initialCountry]
    )

    const newLetterFormValidationSchema = useMemo(() => {
        return Yup.object().shape({
            title: Yup.string().required("Required"),
            content: Yup.string().required("Required"),
            countryId: Yup.number().integer().required("Required"),
            authorAge: Yup.number().integer().required("Required"),
            mediaConsent: Yup.boolean().required("Required"),
            tagId: Yup.number().integer().required("Required"),
        })
    }, [])

    const submitNewLetterForm = useCallback(
        // @ts-expect-error
        async (values, { setSubmitting }) => {
            setSubmitting(true)
            createNewLetter(
                JSON.stringify({
                    ...values,
                    countryId: Number(values.countryId),
                    tagId: Number(values.tagId),
                })
            ).then(() => setSubmitting(false))
        },
        [createNewLetter]
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={newLetterFormValidationSchema}
            onSubmit={submitNewLetterForm}
        >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Field type="text" name="title" />
                    <ErrorMessage name="title" component="div" />

                    <Field type="text" name="content" as="textarea" />
                    <ErrorMessage name="content" component="div" />

                    <Select
                        name="countryId"
                        displayName="Country"
                        value={values.countryId}
                        // @ts-expect-error
                        onChange={handleChange}
                        // @ts-expect-error
                        onBlur={handleBlur}
                        defaultLabel={"No country? 👀"}
                        options={(availableCountries ?? []).map(country => ({
                            label: country.name,
                            value: String(country.id),
                        }))}
                    />
                    <ErrorMessage name="countryId" component="div" />

                    <Field type="number" name="authorAge" />
                    <ErrorMessage name="authorAge" component="div" />

                    <label>
                        <Field
                            name="mediaConsent"
                            type="checkbox"
                            value="Media Consent"
                            checked={values.mediaConsent}
                        />
                        Media Consent
                    </label>
                    <ErrorMessage name="mediaConsent" component="div" />

                    <Select
                        name="tagId"
                        displayName="Tags"
                        value={String(values.tagId)}
                        // @ts-expect-error
                        onChange={handleChange}
                        // @ts-expect-error
                        onBlur={handleBlur}
                        defaultLabel={"No tag :'("}
                        options={(availableTags ?? []).map(tag => ({
                            label: tag.name,
                            value: String(tag.id),
                        }))}
                    />
                    <ErrorMessage name="tagId" component="div" />

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default NewLetterForm
