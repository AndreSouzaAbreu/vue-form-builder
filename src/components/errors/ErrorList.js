export default {
    name: "AlertErrorList",
    computed: {
        errors() {
            return this.form.getRequestErrorsAsArray() || []
        },

        errorMessage() {
            return this.form._errorMessage || this.defaultErrorMessage
        },

        hasError() {
            return this.form.requestHasError() || this.form._errorMessage
        },

        shouldDisplayErrorMessage() {
            return this.form._errorMessage !== "" || ! this.hasError
        },
    },

    methods: {
        dismiss() {
            if (this.dismissible)
                this.form.clearRequestErrors()
        }
    },

    props: {
        defaultErrorMessage: {
            type: String,
            default: "There were some problems with your input."
        },
        dismissible: {
            type: Boolean,
            default: true
        },
        form: {
            type: Object,
            required: true
        },
    }
};
