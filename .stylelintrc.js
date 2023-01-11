module.exports = {
    'extends': 'stylelint-config-recommended-scss',
    'rules': {
        'linebreaks': 'unix',
        'max-empty-lines': 1,
        'no-missing-end-of-source-newline': true,
        'no-empty-first-line': true,
        'no-empty-source': true,
        'indentation': 4,
        'at-rule-name-case': 'lower',
        'at-rule-semicolon-newline-after': 'always',
        'at-rule-semicolon-space-before': 'never',
        'color-hex-case': 'lower',
        'selector-type-case': 'lower',
        'declaration-colon-space-before': 'never',
        'declaration-colon-space-after': 'always',
        'declaration-block-trailing-semicolon': 'always',
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-semicolon-space-before': 'never',
        'declaration-empty-line-before': 'never',
        'function-url-quotes': 'always',
        'string-quotes': 'double',
        'block-opening-brace-space-before': 'always',
        'block-opening-brace-newline-after': 'always',
        'block-closing-brace-empty-line-before': 'never',
        'block-closing-brace-newline-after': 'always',
        'block-closing-brace-newline-before': 'always',
        'value-list-max-empty-lines': 0,
        'unit-case': 'lower',
        'unit-no-unknown': true,
        'rule-empty-line-before': 'always-multi-line',
        'at-rule-no-unknown': [
            true,
            {
                'ignoreAtRules': [
                    'include',
                    'extend',
                    'mixin'
                ]
            }
        ]
    }
}
