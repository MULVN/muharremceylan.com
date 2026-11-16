/* Yeniden olusturulmus (tahmini) Tailwind yapilandirmasi — onizleme icin */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#00152e',
        surface: '#00152e',
        'surface-container-lowest': '#000f22',
        'surface-container-low': '#041b38',
        'surface-container': '#0a2242',
        'surface-container-high': '#14305a',
        'on-surface': '#d9e3f7',
        'on-surface-variant': '#c9c4d6',
        'on-primary-container': '#efdbff',
        primary: '#dbb8ff',
        'primary-container': '#69379e',
        'inverse-primary': '#8a4fc7',
        secondary: '#c0c1ff',
        'secondary-container': '#3d2984',
        tertiary: '#7bd0ff',
        'tertiary-container': '#00577a',
        'tertiary-fixed': '#c4e7ff',
        outline: '#938ea0',
        'outline-variant': '#484555'
      },
      spacing: {
        'space-xs': '0.5rem',
        'space-sm': '0.75rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '3rem',
        'space-2xl': '6rem',
        'margin-sm': '1rem',
        'margin-md': '2rem',
        'margin-xl': '4rem',
        gutter: '1.25rem',
        'gutter-lg': '2.5rem'
      },
      fontFamily: {
        'display-hero': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'headline-xl': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'headline-lg': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'headline-md': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'headline-sm': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'body-xl': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'label-lg': ['Inter', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif']
      },
      fontSize: {
        'display-hero': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'headline-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline-xl-mobile': ['2.25rem', { lineHeight: '1.12' }],
        'headline-lg': ['2rem', { lineHeight: '1.2' }],
        'headline-md': ['1.25rem', { lineHeight: '1.3' }],
        'headline-sm': ['1.05rem', { lineHeight: '1.3' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['0.95rem', { lineHeight: '1.55' }],
        'label-lg': ['0.95rem', { lineHeight: '1.2', fontWeight: '600' }],
        'label-md': ['0.85rem', { lineHeight: '1.2', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.2', fontWeight: '500' }]
      }
    }
  }
};
