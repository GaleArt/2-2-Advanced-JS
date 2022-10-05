<template>
	<body>
		<div class="wrapper">
			<MainPage />
			<GitFooter />
		</div>
	</body>
</template>

<script>
import MainPage from './components/main.vue';
import GitFooter from './components/footer.vue';

export default {
	name: 'App',
	components: {
		MainPage,
		GitFooter,
	},
};
</script>

<style>
#app {
}
</style>
