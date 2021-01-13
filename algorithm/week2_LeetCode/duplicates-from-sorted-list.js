//https://leetcode.com/problems/remove-duplicates-from-sorted-list/submissions/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function(head) {
  if(head === null) return null;
  let storageNumber = head.val;
  let input = head.next;
  let output = new ListNode(storageNumber);
  const header = output;
  while(input){
      if(input.val !== storageNumber){
          output.next = new ListNode(input.val);
          output = output.next;
      }
      storageNumber = input.val;
      input = input.next;
  }
  return header;
};