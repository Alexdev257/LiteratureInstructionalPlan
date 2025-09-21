/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Tính năng mới
        'fix',      // Sửa lỗi
        'docs',     // Cập nhật tài liệu
        'style',    // Thay đổi không ảnh hưởng đến ý nghĩa code (white-space, formatting, etc)
        'refactor', // Refactor code
        'perf',     // Cải thiện performance
        'test',     // Thêm hoặc sửa tests
        'chore',    // Thay đổi build process hoặc auxiliary tools
        'ci',       // Thay đổi CI configuration files và scripts
        'build',    // Thay đổi build system hoặc external dependencies
        'revert'    // Revert commit trước đó
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
};