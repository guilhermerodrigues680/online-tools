const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./index.html", "./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active", "hover-pointer-fine"],
    },
  },
  plugins: [
    // plugin(function ({ addVariant, e }) {
    //   addVariant("first-child", ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`first-child${separator}${className}`)}:first-child`;
    //     });
    //   });
    // }),

    // Isso gera isso:
    // @media (hover: hover) and (pointer: fine) {
    //   .hover-pointer-fine\:bg-transparent:hover {
    //     background-color: transparent;
    //   }
    // ...
    // }
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("hover-pointer-fine", ({ container, separator }) => {
        const supportsRule = postcss.atRule({
          name: "media",
          params: "(hover: hover) and (pointer: fine)",
        });
        supportsRule.append(container.nodes);
        container.append(supportsRule);
        supportsRule.walkRules((rule) => {
          rule.selector = `.${e(`hover-pointer-fine${separator}`)}${rule.selector.slice(1)}:hover`;
        });
      });
    }),
  ],
};
//   .hover-pointer-fine\:bg-blue-700 {
