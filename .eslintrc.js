module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: true }],
        "@typescript-eslint/naming-convention": [
            "error",
            { selector: "default", format: ["snake_case", "UPPER_CASE"], leadingUnderscore: "allow" },
            { selector: "memberLike", modifiers: ["private"], format: ["snake_case", "UPPER_CASE"], leadingUnderscore: "require" },
            { selector: "typeLike", format: ["PascalCase"] },
        ],
    },
};
