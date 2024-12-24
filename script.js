document.addEventListener('DOMContentLoaded', function() {
   const sortButton = document.getElementById('sortButton');
   const targetTable = document.getElementById('targetTable');

   function getSortedRows(maxCount = Infinity) {
       const rows = Array.from(targetTable.querySelectorAll('tbody tr'));
       
       // order_no의 value 값을 기준으로 정렬하되, 0이거나 비어있는 경우 제외
       const validRows = rows.filter(row => {
           const value = row.querySelector('.order_no').value;
           return value !== '' && parseInt(value) !== 0;
       });

       validRows.sort((a, b) => {
           const seqA = parseInt(a.querySelector('.order_no').value);
           const seqB = parseInt(b.querySelector('.order_no').value);
           return seqA - seqB; // 작은 숫자부터 큰 숫자 순으로 정렬
       });

       // maxCount 개수만큼만 반환
       return validRows.slice(0, maxCount);
   }

   sortButton.addEventListener('click', function() {
       // 예시로 최대 10개의 행을 반환하도록 설정
       const maxCount = 5;
       const sortedRows = getSortedRows(maxCount);
       
       console.log(`정렬된 tr 엘리먼트들 (최대 ${maxCount}개):`);
       sortedRows.forEach((row, index) => {
           const seqValue = row.querySelector('.order_no').value;
           console.log(`${index + 1}번째 행 (seq: ${seqValue}):`, row.outerHTML);
       });

       // 실제 반환된 행의 수를 출력
       console.log(`총 반환된 행의 수: ${sortedRows.length}`);
   });
});