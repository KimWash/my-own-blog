import '../lib/date/global.date.extensions'

test('date formatting - Case 1', () => {
  const date = new Date(2024, 1, 2, 12, 34, 56)
  const formatted = () => date.format('yyyy-MM-dd HH:mm:ss')
  expect(formatted).toHaveReturnedWith('2024-02-02 12:34:56')
})

/** 
 * ChatGPT를 이용해 작성한 테스트 코드를 이용해 오전/오후 기능 추가.
 * */
test('date formatting - Case 2', () => {
  const date = new Date(2024, 3, 15, 8, 45, 0)
  const formatted = () =>  date.format('MM/dd/yyyy hh:mm a')
  expect(formatted).toHaveReturnedWith('04/15/2024 08:45 AM')
})

/**
 * 마찬가지로 H를 24시간제, h를 12시간제로 변경
 * MMMM 포맷은 제거하는걸로.
 */ 
test('date formatting - Case 3', () => {
  const date = new Date(2024, 7, 10, 18, 0, 0)
  const formatted = () => date.format('MM dd, yyyy HH:mm:ss')
  expect(formatted).toHaveReturnedWith('08 10, 2024 18:00:00')
})

// 잘못된 포맷 사용
test('date formatting - Case 7 (Invalid Format)', () => {
  const date = new Date(2024, 9, 5, 10, 20, 30)
  // 잘못된 포맷 'yy-mm-dd'를 사용
  const formatted = () => date.format('yy-mm-dd')
  expect(formatted).toHaveReturnedWith('24-20-05')
})

// 잘못된 날짜 객체
test('date formatting - Case 8 (Invalid Date)', () => {
  const invalidDate = new Date('invalid-date')
  // 잘못된 날짜 객체로 포맷을 시도
  const formatted = () => invalidDate.format('yyyy-MM-dd HH:mm:ss')
  expect(formatted).toHaveReturnedWith('Invalid date')
})

// 비어있는 포맷 문자열
test('date formatting - Case 9 (Empty Format)', () => {
  const date = new Date(2024, 4, 1, 9, 0, 0)
  // 빈 포맷 문자열로 포맷을 시도
  const formatted = () => date.format('')
  expect(formatted).toHaveReturnedWith('')
})

// 부정확한 포맷
test('date formatting - Case 10 (Invalid Format Characters)', () => {
  const date = new Date(2024, 6, 15, 14, 30, 0)
  // 부정확한 포맷 문자 'zz' 사용
  const formatted = () => date.format('yyyy-MM-dd zz:MM:ss')
  expect(formatted).toHaveReturnedWith('2024-07-15 zz:07:00')
})
