// ui.js - UI 관련 유틸리티
export function setupButton() {
  console.log('버튼이 설정되었습니다');
}

export function showMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.body.appendChild(div);
}
