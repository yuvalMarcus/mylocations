// tailwind.config.js

const plugin = require('tailwindcss/plugin')
const tailwindcssPseudoElements = require('tailwindcss-pseudo-elements')

const pseudoElements = plugin(({addUtilities}) => {
    const newUtilities = {
        ".empty-content": {
            content: "''",
        },
    }
    addUtilities(newUtilities, {
        variants: ["before", "after"],
    });
})

// Rotate X utilities
const rotateX = plugin(({ addUtilities }) => {
    addUtilities({
        '.rotate-x-20': {
            transform: 'rotateX(20deg)',
        },
        '.rotate-x-40': {
            transform: 'rotateX(40deg)',
        },
        '.rotate-x-55': {
            transform: 'rotateX(55deg)',
        },
        '.rotate-x-60': {
            transform: 'rotateX(60deg)',
        },
        '.rotate-x-80': {
            transform: 'rotateX(80deg)',
        },
    })
})

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                marker: '0 0 1px 2px #e90000'
            },
            keyframes: {
                bounceOne: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-2000px) rotate(-45deg)'
                    },
                    '60%': {
                        opacity: 1,
                        transform: 'translateY(30px) rotate(-45deg)'
                    },
                    '80%': {
                        transform: 'translateY(-10px) rotate(-45deg)'
                    },
                    '100%': {
                        transform: 'translateY(0) rotate(-45deg)'
                    }
                },
                pulsateOut: {
                    '0%': {
                        opacity: 0,
                        transform: 'scale(0.1, 0.1)'
                    },
                    '50%': {
                        opacity: 1
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'scale(1.2, 1.2)'
                    }
                }
            },
            animation: {
                'bounce-one': 'bounceOne 1s both',
                'pulsate-out': 'pulsateOut 1s ease-out 1.1s infinite'
            }
        },
    },
    variants: {
        extend: {
            borderRadius: ['after'],
            height: ['after'],
            width: ['after'],
            position: ['after'],
            margin: ['after'],
            opacity: ['after'],
            boxShadow: ['after'],
            animation: ['after'],
            backgroundColor: ['after']
        },
    },
    plugins: [tailwindcssPseudoElements, pseudoElements, rotateX],
}