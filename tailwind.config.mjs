/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
	],
	theme: {
		extend: {},
	},
	plugins: [
	],
}

module.exports = {
	content: [
		// add the folders and files from your templates
		'./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html", "./src/**/*.js',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],

	// enable dark mode via class strategy
	darkMode: 'media',
	//darkMode: 'media',

	// make sure to safelist these classes when using purge
	safelist: [
		'w-64',
		'w-1/2',
		'rounded-l-lg',
		'rounded-r-lg',
		'bg-gray-200',
		'grid-cols-4',
		'grid-cols-7',
		'h-6',
		'leading-6',
		'h-9',
		'leading-9',
		'shadow-lg'
	],

	theme: {
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				'128': '32rem',
				'144': '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			}
		}
	},
	plugins: [
		// include Flowbite as a plugin in your Tailwind CSS project
		require('flowbite/plugin')
	]
}