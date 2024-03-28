export function Stack(items: string[]) {

    function push(element: string) {
      return items = [...items, element]
    }
  
    function pop() {
      return items.length = [...items].length - 1;
    }
  
    function elements() {
      return items;
    }
  
  
    function size() {
      return items.length;
    }
  
    function clear() {
      items = [];
    }
  
    return {
      clear,
      push,
      pop,
      size,
      elements
    };
  }
   
export {}