import { writable, readable } from 'svelte/store';

/* 쓰기 전용 */
export const norm1 = writable("", () => {
  
    return () => {
    }
});
  
export const norm2 = writable("", () => {
  
    return () => {
    }
});

export const norm3 = writable("", () => {
  
    return () => {
    }
});
export const norm4 = writable("", () => {
  
    return () => {
    }
});
export const norm5 = writable("", () => {
  
    return () => {
    }
});
  
export const norm6 = writable("", () => {
  
    return () => {
    }
});

export const norm7 = writable("", () => {
  
    return () => {
    }
});
export const norm8 = writable("", () => {
  
    return () => {
    }
});
export const norm9 = writable("", () => {
  
    return () => {
    }
});
  
export const norm10 = writable("", () => {
  
    return () => {
    }
});

export const norm11 = writable("", () => {
  
    return () => {
    }
});
export const norm12 = writable("", () => {
  
    return () => {
    }
});

/* 읽기 전용 */
export let norm = readable({
    norm1 : "",
    norm2 : "",
    norm3 : "",
    norm4 : "",
    norm5 : "",
    norm6 : "",
    norm7 : "",
    norm8 : "",
    norm9 : "",
    norm10 : "",
    norm11 : "",
    norm12 : "",
}, (set) => {

    return () => {
    }
});