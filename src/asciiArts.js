import { writable, readable } from 'svelte/store';

/* 쓰기 전용 */
export const bench = writable("", () => {
  
    return () => {
    }
});
export const fish_01 = writable("", () => {
  
    return () => {
    }
});
  
export const fish_02 = writable("", () => {
  
    return () => {
    }
});

export const fish_03 = writable("", () => {
  
    return () => {
    }
});
export const fish_04 = writable("", () => {
  
    return () => {
    }
});
export const fish_05 = writable("", () => {
  
    return () => {
    }
});
  
export const fish_06 = writable("", () => {
  
    return () => {
    }
});

export const fish_07 = writable("", () => {
  
    return () => {
    }
});
export const fish_08 = writable("", () => {
  
    return () => {
    }
});
export const fish_09 = writable("", () => {
  
    return () => {
    }
});
  
export const fish_10 = writable("", () => {
  
    return () => {
    }
});

export const fish_11 = writable("", () => {
  
    return () => {
    }
});
export const fish_12 = writable("", () => {
  
    return () => {
    }
});



/* 읽기 전용 */
export let fish = readable({
    fish_01 : "",
    fish_02 : "",
    fish_03 : "",
    fish_04 : "",
    fish_05 : "",
    fish_06 : "",
    fish_07 : "",
    fish_08 : "",
    fish_09 : "",
    fish_10 : "",
    fish_11 : "",
    fish_12 : "",
}, (set) => {

    return () => {
    }
});