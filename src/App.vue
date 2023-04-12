<template>
	<div class="test">
		Start
		<div>
			Hello
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.test {
	
	background-color: red;

	& > div {
		background-color: blue;
	}
}
</style>
