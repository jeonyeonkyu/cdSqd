//https://leetcode.com/problems/linked-list-cycle/submissions/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {
  if (!head || !head.next) return false;
  let currentNode = head;
  while (currentNode) {
    if (currentNode.path) {
      return true;
    }
    currentNode.path = true;
    currentNode = currentNode.next;
  }
  return false;
};