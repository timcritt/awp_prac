<script setup>
const props = defineProps({
	modelValue: String,
	placeholder: {
		type: String,
		default: "",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	profileImg: {
		type: String,
		default: "",
	},
});
const emit = defineEmits(["update:modelValue", "submit"]);

const handleInput = (e) => {
	emit("update:modelValue", e.target.value);
};
const handleSubmit = (e) => {
	e.preventDefault();
	emit("submit");
};
</script>

<template>
	<div class="form-post">
		<img class="form-post__image" :src="profileImg" alt="User profile image" />
		<form class="form-post__form" @submit="handleSubmit">
			<textarea
				:placeholder="placeholder"
				:value="modelValue"
				:disabled="disabled"
				rows="3"
				@input="handleInput"
			></textarea>
			<button class="btn btn--share" type="submit" :disabled="disabled">
				<slot />
			</button>
		</form>
	</div>
</template>

<style scoped>
/* Post form main container */
.form-post {
	display: flex;
	flex-direction: row;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #fff;
	position: relative;
}

/* Image of the user */
.form-post__image {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}

/* Form */
.form-post__form {
	flex: 1;
}

.form-post__form .btn--share {
	justify-self: flex-end;
}

.form-post__form textarea {
	display: block;
	width: 100%;
	padding: 10px;
	border: 0;
	resize: none;
}
</style>
