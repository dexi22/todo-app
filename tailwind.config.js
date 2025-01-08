/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.jsx'],
	theme: {
		extend: {
			colors: {
				background: '#0f0925',
				primary: '#1e124a',
				'text-primary': '#eee',
			},
			animation: {
				appear: 'appear 1s ease',
			},
			keyframes: {
				appear: {
					'0%': { opacity: 0, transform: 'translateY(-100%)' },
					'100%': { opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
