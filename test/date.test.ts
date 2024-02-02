import '../lib/date.extensions'

test('date formatting - Case 1', () => {
  const date = new Date(2024, 1, 2, 12, 34, 56)
  const formatted = date.format('yyyy-MM-dd HH:mm:ss')
  expect(formatted).toBe('2024-02-02 12:34:56')
})

// ChatGPT를 이용해 작성한 테스트 코드를 이용해 오전/오후 기능 추가.
test('date formatting - Case 2', () => {
  const date = new Date(2024, 3, 15, 8, 45, 0)
  const formatted = date.format('MM/dd/yyyy hh:mm a')
  expect(formatted).toBe('04/15/2024 08:45 AM')
})

// 마찬가지로 H를 24시간제, h를 12시간제로 변경
test('date formatting - Case 3', () => {
  const date = new Date(2024, 7, 10, 18, 0, 0)
  const formatted = date.format('MMMM dd, yyyy HH:mm:ss')
  expect(formatted).toBe('August 10, 2024 18:00:00')
})

// Add more test cases as needed
