<template>
	<input v-bind="attributes" @input="$emit('input')" />
</template>
<script>
import FormField from "./FormField";
export default {
	name: "FormFieldInput",
	mixins: [FormField],
};
</script>
<style lang="scss" scoped>
input[type="color"] {
	height: calc(2.25rem + 2px);
	border: 1px solid rgb(169, 169, 169);
	padding: 1px 2px;
}
input[type="file"] {
	height: auto;
	max-height: auto;
}
</style>
