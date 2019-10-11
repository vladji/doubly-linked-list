const Node = require('./node');

class LinkedList {
	constructor() {
		this.length = 0;
		this._tail = null;
		this._head = null;
		this.dataArr = []; // special Data array :)
	}

	append(data) {
		const node = new Node(data);

		if (!this.length) this._head = node;
		if (this.length) {
			const currentNode = this._tail;
			node.prev = this._tail;
			currentNode.next = node;
		}
		this._tail = node;
		this.length += 1;

		this.dataArr.push(node.data);
		return this;
	}

	head() {
		const head = (this._head) ? this._head.data : null;
		return head;
	}

	tail() {
		const tail = (this._tail) ? this._tail.data : null;
		return tail;
	}

	at(index) {
		let count = 0;
		let currentNode = this._head;
		let currentData = null;
		while (count <= index) {
			currentData = currentNode.data;

			// next iteration
			(currentNode.next) ? currentNode = currentNode.next : null;
			count += 1;
		}
		return currentData;
	}

	insertAt(index, data) {
		const newNode = new Node(data);
		let count = 0;
		let currentNode = this._head;
		let nodePrev = null;
		let nodeNext = null;

		if (this._head) {
			while (count <= index) {
				if (currentNode.prev) {
					nodePrev = currentNode.prev;
					newNode.prev = nodePrev;
					nodePrev.next = newNode;
				}
				nodeNext = currentNode;
				newNode.next = nodeNext;
				nodeNext.prev = newNode;
				// next iteration
				(currentNode.next) ? currentNode = currentNode.next : null;
				count += 1;
			}
		} else {
			this.append(data);
		}
		return this;
	}

	isEmpty() {
		const res = (this.length === 0) ? true : false;
		return res;
	}

	clear() {
		this._tail = null;
		this._head = null;
		this.length = 0;

		return this;
	}

	deleteAt(index) {
		let count = 0;
		let currentNode = this._head;
		let nodePrev = null;
		let nodeNext = null;

		while (count <= index) {
			if (count === index) {
				if (!currentNode.prev) {  		// for _head index
					if (currentNode.next) {
						this._head = currentNode.next;
						this._head.prev = null;
					} else { 									// if only 1 item in list
						this._head = null;
						this._tail = null;
						this.length = 0;
					}
				} else if (!currentNode.next) {			// for _tail index
					this._tail = currentNode.prev;
					this._tail.next = null;
				} else {														// if index in middle
					nodePrev = currentNode.prev;
					nodeNext = currentNode.next;
					nodePrev.next = nodeNext;
					nodeNext.prev = nodePrev;
				}
			}
			// next iteration
			currentNode = currentNode.next;
			count += 1;
		}

		return this;
	}

	reverse() {
		const valueList = [];
		let counter = 0;

		while (counter <= this.length - 1) {
			valueList.push(this._head.data);
			this.deleteAt(0);
			counter += 1;
		}

		valueList.reverse();
		for (let val of valueList) {
			this.append(val);
		}

		return this;
	}

	indexOf(data) {
		const index = this.dataArr.indexOf(data);
		return index;
	}
}

module.exports = LinkedList;
