import { writable, readable } from 'svelte/store';

/* 쓰기 전용 */
export const mx = writable(0, () => {
  
    return () => {
    }
});
  
export const my = writable(0, () => {
  
    return () => {
    }
});

export const dx = writable(0, () => {
  
    return () => {
    }
});
export const dy = writable(0, () => {
  
    return () => {
    }
});
export const clicked= writable(false, () => {
  
    return () => {
    }
});

/* 읽기 전용 */
export let mouse = readable({
    mx : 0,
    my : 0,
    dx : 0,
    dy : 0,
    clicked : false
}, (set) => {

    return () => {
    }
});